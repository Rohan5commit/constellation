import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FragmentBadge, FragmentCard } from '@/components/fragment-card';
import { PageChrome } from '@/components/page-chrome';
import { getConstellation, getConstellationFragments, getFragment, personThreads } from '@/lib/demo-data';

export default async function FragmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fragment = getFragment(id);

  if (!fragment) {
    notFound();
  }

  const constellation = getConstellation(fragment.constellation);
  const related = getConstellationFragments(fragment.constellation).filter((item) => item.id !== fragment.id).slice(0, 2);
  const primaryPerson = fragment.people?.[0] ? personThreads[fragment.people[0]] : null;

  return (
    <PageChrome
      eyebrow="Fragment Detail"
      title={fragment.title}
      subtitle={fragment.preview}
      actions={
        <Link href={`/constellations/${fragment.constellation}`} className="rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/82">
          Back to constellation
        </Link>
      }
    >
      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="glass-panel rounded-[34px] p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <FragmentBadge type={fragment.type} />
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">{fragment.source}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">{fragment.savedAt}</span>
            </div>
            <div className="mt-6 rounded-[28px] border border-white/10 bg-black/20 p-5 text-base leading-8 text-white/74">
              {fragment.body}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {fragment.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/8 px-3 py-1.5 text-xs text-white/62">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[34px] p-6">
            <p className="section-kicker">Why this resurfaced</p>
            <p className="mt-4 text-base leading-7 text-white/72">{fragment.whyResurfaced}</p>
            <div className="mt-5 rounded-[26px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[0.72rem] uppercase tracking-[0.18em] text-white/44">Why this may matter</p>
              <p className="mt-3 text-sm leading-7 text-white/72">{fragment.whyItMayMatter}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-[34px] p-6">
            <p className="section-kicker">Context threads</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-white/70">
              {constellation ? <p><span className="text-white">Constellation:</span> {constellation.name}</p> : null}
              {fragment.project ? <p><span className="text-white">Project:</span> {fragment.project}</p> : null}
              {fragment.place ? <p><span className="text-white">Place:</span> {fragment.place}</p> : null}
              <p><span className="text-white">Emotional weight:</span> {fragment.emotionalWeight}</p>
              {primaryPerson ? <p><span className="text-white">Relationship thread:</span> {primaryPerson.name}, {primaryPerson.relationship}</p> : null}
            </div>
          </div>

          <div className="glass-panel rounded-[34px] p-6">
            <p className="section-kicker">What to do next</p>
            <div className="mt-4 space-y-4">
              <Link href={fragment.nextStepHref} className="block rounded-[24px] bg-[var(--warm)] px-5 py-4 text-sm font-semibold text-slate-950">
                {fragment.nextStepLabel}
              </Link>
              <button type="button" className="w-full rounded-[24px] border border-white/12 bg-white/5 px-5 py-4 text-left text-sm font-semibold text-white/78">
                Archive and keep the constellation intact
              </button>
              <button type="button" className="w-full rounded-[24px] border border-white/12 bg-white/5 px-5 py-4 text-left text-sm font-semibold text-white/56">
                Let this fragment go for now
              </button>
            </div>
          </div>

          {primaryPerson ? (
            <div className="glass-panel rounded-[34px] p-6">
              <p className="section-kicker">Reconnect gently</p>
              <p className="mt-4 text-sm leading-7 text-white/72">{primaryPerson.lowPressurePrompt}</p>
              <Link href={`/reconnect/${fragment.id}`} className="mt-5 inline-flex text-sm font-semibold text-[var(--warm)]">
                Open reconnect suggestions
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      {related.length ? (
        <section className="mt-8 space-y-4">
          <div>
            <p className="section-kicker">Related fragments</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Other fragments in this constellation</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {related.map((item) => (
              <FragmentCard key={item.id} fragment={item} />
            ))}
          </div>
        </section>
      ) : null}
    </PageChrome>
  );
}
