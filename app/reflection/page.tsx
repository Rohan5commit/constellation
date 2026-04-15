import Link from 'next/link';
import { PageChrome } from '@/components/page-chrome';
import { weeklyReflection } from '@/lib/demo-data';

export default function ReflectionPage() {
  return (
    <PageChrome
      eyebrow="Weekly Reflection"
      title={weeklyReflection.title}
      subtitle="A calm recap of what the system helped the user find again — not as productivity residue, but as signals worth keeping in view."
      actions={
        <Link href="/demo" className="rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/82">
          Back to prototype
        </Link>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel rounded-[34px] p-6 md:p-8">
          <p className="section-kicker">This week’s pattern</p>
          <p className="mt-4 text-2xl leading-[1.4] text-white/84">{weeklyReflection.summary}</p>
          <div className="mt-6 rounded-[28px] border border-white/10 bg-black/20 p-5 text-sm leading-7 text-white/72">
            {weeklyReflection.carryForward}
          </div>
        </div>
        <div className="space-y-4">
          {weeklyReflection.highlights.map((item) => (
            <div key={item} className="glass-panel rounded-[30px] p-5 text-sm leading-7 text-white/72">
              {item}
            </div>
          ))}
        </div>
      </div>
    </PageChrome>
  );
}
