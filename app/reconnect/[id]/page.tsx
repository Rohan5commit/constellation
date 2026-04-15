import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageChrome } from '@/components/page-chrome';
import { getFragment, personThreads } from '@/lib/demo-data';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--warm)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08111f]';

export default async function ReconnectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fragment = getFragment(id);
  const personId = fragment?.people?.[0];
  const person = personId ? personThreads[personId] : null;

  if (!fragment || !person) {
    notFound();
  }

  return (
    <PageChrome
      eyebrow="Reconnect Flow"
      title={`Return to ${person.name} without making it heavy.`}
      subtitle="The product suggests small, emotionally safe next steps for people-related fragments. Nothing is framed as mandatory."
      actions={
        <Link
          href={`/fragments/${fragment.id}`}
          className={`rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/82 ${focusRing}`}
        >
          Back to fragment
        </Link>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-[34px] p-6">
          <p className="section-kicker">Relationship context</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">{person.name}</h2>
          <p className="mt-2 text-sm leading-6 text-white/60">{person.relationship}</p>
          <p className="mt-5 text-sm leading-7 text-white/72">{person.context}</p>
          <div className="mt-5 rounded-[26px] border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-white/72">
            {person.lowPressurePrompt}
          </div>
        </div>

        <div className="space-y-4">
          {person.draftMessages.map((message) => (
            <div key={message} className="glass-panel rounded-[30px] p-5">
              <p className="section-kicker">Suggested message</p>
              <p className="mt-4 text-base leading-7 text-white/76">{message}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 glass-panel rounded-[34px] p-6">
        <p className="section-kicker">Decision framing</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Link
            href={`/fragments/${fragment.id}`}
            className={`rounded-[24px] bg-[var(--warm)] px-5 py-4 text-sm font-semibold text-slate-950 ${focusRing}`}
          >
            Keep this message in view
          </Link>
          <Link
            href="/reflection"
            className={`rounded-[24px] border border-white/12 bg-white/5 px-5 py-4 text-sm font-semibold text-white/78 ${focusRing}`}
          >
            Save for a gentler moment
          </Link>
          <Link
            href="/demo"
            className={`rounded-[24px] border border-white/12 bg-white/5 px-5 py-4 text-sm font-semibold text-white/56 ${focusRing}`}
          >
            Return to rediscovery feed
          </Link>
        </div>
      </div>
    </PageChrome>
  );
}