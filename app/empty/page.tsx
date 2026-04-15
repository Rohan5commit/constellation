import Link from 'next/link';
import { PageChrome } from '@/components/page-chrome';

export default function EmptyPage() {
  return (
    <PageChrome
      eyebrow="First-use State"
      title="Nothing is lost yet."
      subtitle="The empty state frames the product as a place for future rediscovery. It avoids pressure and starts with emotionally legible prompts instead."
    >
      <div className="glass-panel mx-auto max-w-3xl rounded-[38px] p-8 text-center md:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/12 bg-white/5">
          <span className="h-3 w-3 rounded-full bg-[var(--sky)] shadow-[0_0_22px_rgba(191,224,255,0.85)]" />
        </div>
        <h2 className="mt-6 font-[var(--font-serif)] text-5xl text-white">Start with one fragment.</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-white/70">
          A thought. A screenshot. A name you meant to come back to. Constellation works best when the fragment is captured close to the moment it mattered.
        </p>
        <div className="mt-8 grid gap-3 text-left md:grid-cols-2">
          {[
            'A screenshot I saved because it felt like future me.',
            'A note about something I almost forgot to say.',
            'A voice thought that came too fast to type.',
            'A person-based reminder that matters emotionally, not urgently.'
          ].map((prompt) => (
            <div key={prompt} className="rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-white/72">
              {prompt}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/demo" className="rounded-full bg-[var(--warm)] px-6 py-3 text-sm font-semibold text-slate-950">
            Enter seeded demo mode
          </Link>
          <Link href="/onboarding" className="rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white/84">
            Review onboarding
          </Link>
        </div>
      </div>
    </PageChrome>
  );
}
