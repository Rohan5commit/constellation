'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { Constellation, Fragment } from '@/lib/demo-data';
import { captureOptions, resurfacedTonight, weeklyReflection } from '@/lib/demo-data';
import { FragmentBadge, FragmentCard } from '@/components/fragment-card';

type DemoDashboardProps = {
  initialFragments: Fragment[];
  constellationList: Constellation[];
};

export function DemoDashboard({ initialFragments, constellationList }: DemoDashboardProps) {
  const reduceMotion = useReducedMotion();
  const [captureOpen, setCaptureOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<(typeof captureOptions)[number]['id']>('note');
  const [draft, setDraft] = useState(
    'Maybe the real thing I lose is not files. It is the version of me attached to them.'
  );
  const [captureResult, setCaptureResult] = useState<string | null>(null);

  const spotlight = resurfacedTonight;
  const feed = useMemo(() => initialFragments.slice(0, 6), [initialFragments]);

  const selectedPrompt = captureOptions.find((option) => option.id === selectedType)?.prompt;

  function handleCapture() {
    setCaptureOpen(false);
    setCaptureResult(`Captured as a ${selectedType} fragment and gently grouped into Quiet Signals.`);
    window.setTimeout(() => setCaptureResult(null), 3200);
  }

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {captureResult ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            className="glass-panel flex items-center justify-between gap-4 rounded-[24px] px-5 py-4 text-sm text-white/80"
          >
            <p>{captureResult}</p>
            <Link href="/constellations/quiet-signals" className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--warm)]">
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
                  href={spotlight.nextStepHref}
                  className="rounded-full bg-[var(--warm)] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105"
                >
                  Open resurfaced fragment
                </Link>
                <Link
                  href="/constellations/people-to-return-to"
                  className="rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/82 transition hover:border-white/22"
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
                  Demo capture is intentionally light. The magic is not in storing more. It is in recovering why a fragment mattered.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCaptureOpen(true)}
              className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              Open capture flow
            </button>
          </div>

          <div className="glass-panel rounded-[30px] p-6">
            <p className="section-kicker">Weekly reflection</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{weeklyReflection.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/72">{weeklyReflection.summary}</p>
            <Link href="/reflection" className="mt-5 inline-flex text-sm font-semibold text-[var(--warm)]">
              Open this week’s reflection
            </Link>
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
            <Link href="/empty" className="text-sm font-semibold text-white/64 hover:text-white">
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
              <Link key={constellation.slug} href={`/constellations/${constellation.slug}`} className="glass-panel rounded-[28px] p-5 transition hover:-translate-y-1 hover:border-white/18">
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
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
              className="glass-panel w-full max-w-2xl rounded-[34px] p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-kicker">New fragment</p>
                  <h3 className="mt-3 text-3xl font-semibold text-white">Capture something before it loses context.</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCaptureOpen(false)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/60"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {captureOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedType(option.id)}
                    className={`rounded-[22px] border px-4 py-4 text-left transition ${
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
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  className="mt-4 h-32 w-full rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/30"
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
                  className="rounded-full bg-[var(--warm)] px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  Cluster this fragment
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
