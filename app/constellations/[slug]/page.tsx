import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ConstellationMap } from '@/components/constellation-map';
import { FragmentCard } from '@/components/fragment-card';
import { PageChrome } from '@/components/page-chrome';
import { getConstellation, getConstellationFragments } from '@/lib/demo-data';

export default async function ConstellationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const constellation = getConstellation(slug);

  if (!constellation) {
    notFound();
  }

  const items = getConstellationFragments(slug);

  return (
    <PageChrome
      eyebrow="Constellation View"
      title={constellation.name}
      subtitle={constellation.subtitle}
      actions={
        <Link href="/demo" className="rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/82">
          Back to feed
        </Link>
      }
    >
      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <ConstellationMap constellation={constellation} fragments={items} />

        <div className="space-y-6">
          <div className="glass-panel rounded-[30px] p-6">
            <p className="section-kicker">Cluster prompt</p>
            <p className="mt-4 text-base leading-7 text-white/72">{constellation.prompt}</p>
          </div>
          <div className="glass-panel rounded-[30px] p-6">
            <p className="section-kicker">Why these belong together</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-white/72">
              {constellation.reasoning.map((reason) => (
                <li key={reason}>• {reason}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-8 space-y-4">
        <div>
          <p className="section-kicker">Fragments in orbit</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Open one and reconstruct what mattered.</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((fragment) => (
            <FragmentCard key={fragment.id} fragment={fragment} />
          ))}
        </div>
      </section>
    </PageChrome>
  );
}
