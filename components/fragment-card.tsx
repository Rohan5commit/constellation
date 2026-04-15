import type { Route } from 'next';
import Link from 'next/link';
import type { Fragment } from '@/lib/demo-data';

const typeStyles: Record<Fragment['type'], { label: string; className: string }> = {
  note: { label: 'Note', className: 'bg-sky-200/12 text-sky-100' },
  screenshot: { label: 'Screenshot', className: 'bg-fuchsia-200/12 text-fuchsia-100' },
  link: { label: 'Link', className: 'bg-cyan-200/12 text-cyan-100' },
  voice: { label: 'Voice', className: 'bg-amber-200/12 text-amber-100' },
  memory: { label: 'Memory', className: 'bg-violet-200/12 text-violet-100' },
  reminder: { label: 'Reconnect', className: 'bg-rose-200/12 text-rose-100' }
};

export function FragmentBadge({ type }: { type: Fragment['type'] }) {
  const meta = typeStyles[type];
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.18em] uppercase ${meta.className}`}>
      {meta.label}
    </span>
  );
}

export function FragmentCard({ fragment, featured = false }: { fragment: Fragment; featured?: boolean }) {
  return (
    <Link
      href={fragment.nextStepHref as Route}
      className={`glass-panel group block rounded-[28px] p-5 transition hover:-translate-y-1 hover:border-white/20 ${
        featured ? 'h-full' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-4">
          <FragmentBadge type={fragment.type} />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white transition group-hover:text-[var(--warm)]">{fragment.title}</h3>
            <p className="text-sm leading-6 text-white/68">{fragment.preview}</p>
          </div>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/54">
          {fragment.savedAt}
        </span>
      </div>

      <div className="mt-5 grid gap-3 rounded-[22px] border border-white/8 bg-black/20 p-4 text-sm text-white/72 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.18em] text-white/44">Why this surfaced</p>
          <p className="mt-2 leading-6">{fragment.whyItMayMatter}</p>
        </div>
        <span className="text-xs font-medium text-[var(--warm)]">Open fragment</span>
      </div>
    </Link>
  );
}
