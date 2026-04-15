import { NextResponse } from 'next/server';
import { demoFallbackOutputs } from '@/lib/demo-data';

type Mode = keyof typeof demoFallbackOutputs;
type RateEntry = { count: number; resetAt: number };

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

const MAX_PAYLOAD_CHARACTERS = 4_000;
const MAX_REQUESTS_PER_WINDOW = 18;
const RATE_LIMIT_WINDOW_MS = 60_000;
const KNOWN_HOSTS = new Set([
  'constellation-bice.vercel.app',
  'constellation-rohan-santhoshs-projects.vercel.app',
  'constellation-rohansanthoshkumar-9804-rohan-santhoshs-projects.vercel.app',
  'localhost:3000'
]);

const globalForConstellation = globalThis as typeof globalThis & {
  __constellationRateLimit?: Map<string, RateEntry>;
};

const rateLimitStore =
  globalForConstellation.__constellationRateLimit ??=
    new Map<string, RateEntry>();

export const dynamic = 'force-dynamic';

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}

function extractHost(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).host;
  } catch {
    return value.replace(/^https?:\/\//, '').split('/')[0] || null;
  }
}

function isTrustedRequest(request: Request) {
  const currentHost = extractHost(
    request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  );

  if (!currentHost) {
    return false;
  }

  const trustedHosts = new Set([...KNOWN_HOSTS, currentHost]);
  const originHost = extractHost(request.headers.get('origin'));
  const refererHost = extractHost(request.headers.get('referer'));

  return [originHost, refererHost].some((candidate) =>
    candidate ? trustedHosts.has(candidate) : false
  );
}

function isRateLimited(request: Request) {
  const key =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('host') ||
    'anonymous';
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  rateLimitStore.set(key, entry);
  return false;
}

export async function POST(request: Request) {
  if (!isTrustedRequest(request)) {
    return json(
      {
        error: 'This endpoint only accepts requests from the Constellation app.'
      },
      403
    );
  }

  if (isRateLimited(request)) {
    return json(
      {
        error: 'Too many rediscovery requests right now. Please try again shortly.'
      },
      429
    );
  }

  const body = await request.json().catch(() => null);
  const mode = body?.mode as Mode | undefined;

  if (!mode || !(mode in demoFallbackOutputs)) {
    return json({ error: 'Unsupported mode.' }, 400);
  }

  const userPayload = JSON.stringify(body?.payload ?? {}, null, 2);

  if (userPayload.length > MAX_PAYLOAD_CHARACTERS) {
    return json(
      {
        error: 'Payload too large for a judging-demo rediscovery request.'
      },
      413
    );
  }

  const apiKey = process.env.NVIDIA_NIM_API_KEY;
  const baseUrl = process.env.NVIDIA_NIM_BASE_URL;
  const model = process.env.NVIDIA_NIM_MODEL;

  if (!apiKey || !baseUrl || !model) {
    return json(
      {
        provider: 'demo-fallback',
        mode,
        degraded: true,
        reason: 'nim_not_configured',
        output: demoFallbackOutputs[mode]
      },
      503
    );
  }

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
            content: `Use only the data provided below. If something is uncertain, say so explicitly.\n\n${userPayload}`
          }
        ]
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      return json(
        {
          provider: 'demo-fallback',
          mode,
          degraded: true,
          reason: 'nim_request_failed',
          output: demoFallbackOutputs[mode]
        },
        502
      );
    }

    const data = await response.json();
    const content =
      typeof data?.choices?.[0]?.message?.content === 'string'
        ? data.choices[0].message.content.trim()
        : '';

    return json({
      provider: 'nvidia-nim',
      mode,
      output: {
        headline: 'NVIDIA NIM response',
        body: content || demoFallbackOutputs[mode].body
      }
    });
  } catch {
    return json(
      {
        provider: 'demo-fallback',
        mode,
        degraded: true,
        reason: 'nim_request_failed',
        output: demoFallbackOutputs[mode]
      },
      502
    );
  }
}