'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { Constellation, Fragment } from '@/lib/demo-data';
import {
  captureOptions,
  demoFallbackOutputs,
  resurfacedTonight,
  weeklyReflection
} from '@/lib/demo-data';
import { FragmentBadge, FragmentCard } from '@/components/fragment-card';

type DemoDashboardProps = {
  initialFragments: Fragment[];
  constellationList: Constellation[];
};

type AssistMode = 'cluster' | 'reflection';
type AssistResult = {
  headline: string;
  body: string;
  provider: string;
  degraded: boolean;
};

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--warm)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08111f]';

async function requestAiAssist(
  mode: AssistMode,
  payload: unknown,
  fallback: (typeof demoFallbackOutputs)[AssistMode]
): Promise<AssistResult> {
  try {
    const response = await fetch('/api/nim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mode, payload })
    });

    const data = await response.json().catch(() => null);

    if (data?.output?.body) {
      return {
        headline:
          typeof data.output.headline === 'string'
            ? data.output.headline
            : fallback.headline,
        body:
          typeof data.output.body === 'string' && data.output.body.trim().length
            ? data.output.body.trim()
            : fallback.body,
        provider:
          typeof data.provider === 'string' ? data.provider : 'demo-fallback',
        degraded: Boolean(data.degraded) || !response.ok
      };
    }
  } catch {
    // fall through to the seeded fallback response below.
  }

  return {
    headline: fallback.headline,
    body: fallback.body,
    provider: 'demo-fallback',
    degraded: true
  };
}

export function DemoDashboard({ initialFragments, constellationList }: DemoDashboardProps) {
  const reduceMotion = useReducedMotion();
  const [captureOpen, setCaptureOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<(typeof captureOptions)[number]['id']>('note');
  const [draft, setDraft] = useState(
    'Maybe the real thing I lose is not files. It is the version of me attached to them.'
  );
  const [capturePending, setCapturePending] = useState(false);
  const [reflectionPending, setReflectionPending] = useState(false);
  const [captureResult, setCaptureResult] = useState<AssistResult | null>(null);
  const [reflectionResult, setReflectionResult] = useState<AssistResult | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dialogTitleId = useId();
  const dialogDescriptionId = useId();

  const spotlight = resurfacedTonight;
  const feed = useMemo(() => initialFragments.slice(0, 6), [initialFragments]);

  const selectedPrompt =
    captureOptions.find((option) => option.id === selectedType)?.prompt ??
    'A fragment worth keeping visible.';

  useEffect(() => {
    if (!captureOpen) {
      return;
    }

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setCaptureOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((element) => !element.hasAttribute('disabled'));

      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [captureOpen]);

  async function handleCapture() {
    setCapturePending(true);

    const result = await requestAiAssist(
      'cluster',
      {
        fragment: {
          type: selectedType,
          draft
        },
        visibleConstellations: constellationList.map((constellation) => ({
          name: constellation.name,
          prompt: constellation.prompt
        }))
      },
      demoFallbackOutputs.cluster
    );

    setCaptureResult(result);
    setCaptureOpen(false);
    window.setTimeout(() => setCaptureResult(null), 4200);
    setCapturePending(false);
  }

  async function handleReflection() {
    setReflectionPending(true);

    const result = await requestAiAssist(
      'reflection',
      {
        weeklySummary: weeklyReflection.summary,
        resurfacedFragments: feed.slice(0, 3).map((fragment) => ({
          title: fragment.title,
          preview: fragment.preview,
          whyItMayMatter: fragment.whyItMayMatter
        }))
      },
      demoFallbackOutputs.reflection
    );

    setReflectionResult(result);
    setReflectionPending(false);
  }

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {captureResult ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            aria-live="polite"
            className="glass-panel flex flex-col gap-3 rounded-[24px] px-5 py-4 text-sm text-white/80 md:flex-row md:items-center md:justify-between"
          >
            <div className="space-y-1">
              <p className="section-kicker text-[0.68rem]">
                {captureResult.degraded
                  ? 'Safe demo fallback'
                  : 'Grouped with live NVIDIA NIM'}
              </p>
              <p>{captureResult.body}</p>
            </div>
            <Link
              href="/constellations/quiet-signals"
              className={`text-xs font-semibold uppercase tracking-[0.18em] text-[var(--warm)] ${focusRing}`}
            >
              View cluster
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="glass-panel rounded-[34px] p-6 md:p-8">
          <p className="section-kicker">Resurfaced tonight</p>
          <div className="mt-6 grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <FragmentBadge type={spotlight.type} />
              <div className="space-y-3">
                <h2 className="font-[var(--font-serif)] text-4xl leading-none text-white md:text-5xl">
                  {spotlight.title}
                </h2>
                <p className="max-w-xl text-base leading-7 text-white/72">{spotlight.preview}</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 text-sm leading-7 text-white/74">
                {spotlight.whyResurfaced}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={spotlight.nextStepHref as Route}
                  className={`rounded-full bg-[var(--warm)] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105 ${focusRing}`}
                >
                  Open resurfaced fragment
                </Link>
                <Link
                  href="/constellations/people-to-return-to"
                  className={`rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/82 transition hover:border-white/22 ${focusRing}`}
                >
                  See related constellation
                </Link>
              </div>
            </div>

            <div className="glass-panel rounded-[30px] p-5">
              <p className="section-kicker">Why it matters now</p>
              <div className="mt-4 space-y-4 text-sm leading-6 text-white/72">
                <p>{spotlight.whyItMayMatter}</p>
                <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.18em] text-white/44">Next step</p>
                  <p className="mt-2">A reconnect prompt is available because this fragment came from care, not administration.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-[30px] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">Capture a fragment</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Add something before it drifts.</h3>
                <p className="mt-3 text-sm leading-6 text-white/68">
                  Demo capture stays light, but the grouping response now comes from the same NIM route used in the live prototype.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCaptureOpen(true)}
              className={`mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 ${focusRing}`}
            >
              Open capture flow
            </button>
          </div>

          <div className="glass-panel rounded-[30px] p-6">
            <p className="section-kicker">Weekly reflection</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{weeklyReflection.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/72">{weeklyReflection.summary}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleReflection}
                disabled={reflectionPending}
                className={`rounded-full bg-[var(--warm)] px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-wait disabled:opacity-70 ${focusRing}`}
              >
                {reflectionPending ? 'Generating reflection…' : 'Generate live reflection'}
              </button>
              <Link href="/reflection" className={`inline-flex items-center text-sm font-semibold text-[var(--warm)] ${focusRing}`}>
                Open this week’s reflection
              </Link>
            </div>
            {reflectionResult ? (
              <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/76">
                <p className="section-kicker text-[0.68rem]">
                  {reflectionResult.degraded
                    ? 'Safe demo fallback'
                    : 'Generated with live NVIDIA NIM'}
                </p>
                <p className="mt-2 font-semibold text-white">{reflectionResult.headline}</p>
                <p className="mt-2">{reflectionResult.body}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="section-kicker">Rediscovery feed</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Fragments resurfacing now</h3>
            </div>
            <Link href="/empty" className={`text-sm font-semibold text-white/64 hover:text-white ${focusRing}`}>
              See first-use state
            </Link>
          </div>
          <div className="grid gap-4">
            {feed.map((fragment) => (
              <FragmentCard key={fragment.id} fragment={fragment} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="section-kicker">Constellations</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Patterns hiding across saved fragments</h3>
          </div>
          <div className="grid gap-4">
            {constellationList.map((constellation) => (
              <Link key={constellation.slug} href={`/constellations/${constellation.slug}`} className={`glass-panel rounded-[28px] p-5 transition hover:-translate-y-1 hover:border-white/18 ${focusRing}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xl font-semibold text-white">{constellation.name}</p>
                    <p className="mt-2 text-sm leading-6 text-white/68">{constellation.subtitle}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/62">
                    {constellation.fragments.length} fragments
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/56">{constellation.prompt}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {captureOpen ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#040812]/70 p-4 backdrop-blur-md"
            onClick={() => setCaptureOpen(false)}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogTitleId}
              aria-describedby={dialogDescriptionId}
              initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
              className="glass-panel w-full max-w-2xl rounded-[34px] p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-kicker">New fragment</p>
                  <h3 id={dialogTitleId} className="mt-3 text-3xl font-semibold text-white">
                    Capture something before it loses context.
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCaptureOpen(false)}
                  className={`rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/60 ${focusRing}`}
                >
                  Close
                </button>
              </div>

              <p id={dialogDescriptionId} className="mt-4 text-sm leading-6 text-white/68">
                Capture stays intentionally simple. The grouping copy below is generated through the live NIM route so judges can see rediscovery happen in the product.
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {captureOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedType(option.id)}
                    className={`rounded-[22px] border px-4 py-4 text-left transition ${focusRing} ${
                      selectedType === option.id
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-white/10 bg-white/[0.03] text-white/62 hover:border-white/18'
                    }`}
                  >
                    <p className="font-semibold">{option.label}</p>
                    <p className="mt-2 text-sm leading-6">{option.prompt}</p>
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-[26px] border border-white/10 bg-black/20 p-5">
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-white/44">Prompt</p>
                <p className="mt-2 text-sm leading-6 text-white/70">{selectedPrompt}</p>
                <label htmlFor="fragment-draft" className="sr-only">
                  Fragment draft
                </label>
                <textarea
                  ref={textareaRef}
                  id="fragment-draft"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  className={`mt-4 h-32 w-full rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white placeholder:text-white/30 ${focusRing}`}
                  placeholder="Write the fragment exactly as it comes."
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm leading-6 text-white/56">
                  Demo mode keeps capture simple so the focus stays on rediscovery, not form filling.
                </p>
                <button
                  type="button"
                  onClick={handleCapture}
                  disabled={capturePending}
                  className={`rounded-full bg-[var(--warm)] px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-wait disabled:opacity-70 ${focusRing}`}
                >
                  {capturePending ? 'Clustering with NIM…' : 'Cluster this fragment'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}