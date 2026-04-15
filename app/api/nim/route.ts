import { NextResponse } from 'next/server';
import { demoFallbackOutputs } from '@/lib/demo-data';

type Mode = keyof typeof demoFallbackOutputs;

const systemPrompts: Record<Mode, string> = {
  cluster:
    'You are the Clustering Agent for Constellation. Group fragments into emotionally meaningful constellations. Use careful, uncertain language and never invent missing facts.',
  context:
    'You are the Context Recovery Agent for Constellation. Explain why a fragment may matter using only the supplied evidence. Keep the output short, elegant, and uncertain where necessary.',
  reflection:
    'You are the Reflection Agent for Constellation. Write one gentle resurfacing prompt grounded only in the supplied fragments. Avoid pressure and certainty.',
  reconnect:
    'You are the Reconnection Agent for Constellation. Suggest low-pressure next steps for people-related fragments. Never manipulate, guilt, or overclaim intimacy.'
};

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const mode = body?.mode as Mode | undefined;

  if (!mode || !(mode in demoFallbackOutputs)) {
    return NextResponse.json({ error: 'Unsupported mode.' }, { status: 400 });
  }

  const apiKey = process.env.NVIDIA_NIM_API_KEY;
  const baseUrl = process.env.NVIDIA_NIM_BASE_URL;
  const model = process.env.NVIDIA_NIM_MODEL;

  if (!apiKey || !baseUrl || !model) {
    return NextResponse.json({
      provider: 'demo-fallback',
      mode,
      output: demoFallbackOutputs[mode]
    });
  }

  const userPayload = JSON.stringify(body?.payload ?? {}, null, 2);

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        temperature: 0.35,
        max_tokens: 180,
        messages: [
          { role: 'system', content: systemPrompts[mode] },
          {
            role: 'user',
            content:
              `Use only the data provided below. If something is uncertain, say so explicitly.\n\n${userPayload}`
          }
        ]
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        {
          provider: 'demo-fallback',
          mode,
          warning: `NVIDIA NIM request failed: ${text}`,
          output: demoFallbackOutputs[mode]
        },
        { status: 200 }
      );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      provider: 'nvidia-nim',
      mode,
      output: {
        headline: 'NVIDIA NIM response',
        body: content || demoFallbackOutputs[mode].body
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        provider: 'demo-fallback',
        mode,
        warning: error instanceof Error ? error.message : 'Unknown NVIDIA NIM error',
        output: demoFallbackOutputs[mode]
      },
      { status: 200 }
    );
  }
}
