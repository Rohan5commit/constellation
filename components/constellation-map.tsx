'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { Constellation, Fragment } from '@/lib/demo-data';
import { FragmentBadge } from '@/components/fragment-card';

export function ConstellationMap({
  constellation,
  fragments
}: {
  constellation: Constellation;
  fragments: Fragment[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="glass-panel orbit-grid relative h-[440px] overflow-hidden rounded-[34px] p-6 md:p-8">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${constellation.accent}`} />
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-70">
        {constellation.orbit.map((point) => (
          <line
            key={point.id}
            x1="50%"
            y1="50%"
            x2={point.x}
            y2={point.y}
            stroke="rgba(255,255,255,0.14)"
            strokeDasharray="4 6"
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/14 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_rgba(255,255,255,0.04)_70%)] text-center shadow-[0_0_80px_rgba(255,255,255,0.08)]">
        <p className="section-kicker text-[0.62rem]">Constellation</p>
        <p className="mt-2 font-[var(--font-serif)] text-3xl leading-none text-white">{constellation.name}</p>
        <p className="mt-2 max-w-[9rem] text-xs leading-5 text-white/60">{constellation.prompt}</p>
      </div>

      {constellation.orbit.map((point, index) => {
        const fragment = fragments.find((item) => item.id === point.id);
        if (!fragment) return null;

        return (
          <motion.div
            key={point.id}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="absolute"
            style={{ left: point.x, top: point.y, transform: 'translate(-50%, -50%)' }}
          >
            <Link href={fragment.nextStepHref as Route} className="glass-panel block w-52 rounded-[24px] p-4 transition hover:-translate-y-1 hover:border-white/18">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <FragmentBadge type={fragment.type} />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.45)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-5 text-white">{fragment.title}</p>
                  <p className="mt-2 text-xs leading-5 text-white/62">{fragment.preview}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
