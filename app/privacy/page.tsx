import { PageChrome } from '@/components/page-chrome';

export default function PrivacyPage() {
  return (
    <PageChrome
      eyebrow="Privacy & Trust"
      title="Emotionally intelligent, never creepy."
      subtitle="Constellation uses AI to support rediscovery, not to perform certainty. The product is designed around legibility, restraint, and user control."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {[
          ['Transparent language', 'AI outputs use careful phrasing like “might relate to” and “seems connected to” so users always remain the final interpreter.'],
          ['No invented memory', 'The system never fabricates events, emotions, or relationships that are not grounded in the saved fragment set.'],
          ['Gentle resurfacing', 'Resurfacing is framed as an invitation, not a demand. The product avoids aggressive urgency and manipulative prompts.'],
          ['User choice stays central', 'Every resurfaced fragment supports multiple paths: act, reconnect, archive, or let it go.']
        ].map(([title, body]) => (
          <div key={title} className="glass-panel rounded-[30px] p-6">
            <h2 className="text-2xl font-semibold text-white">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-white/72">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 glass-panel rounded-[34px] p-6">
        <p className="section-kicker">Prototype settings mock</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {[
            'Allow resurfacing based on repeated saves',
            'Allow people-related reconnect suggestions',
            'Reduce emotional inference language',
            'Prefer practical resurfacing over reflective resurfacing'
          ].map((item, index) => (
            <div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/72">
              <div className="flex items-center justify-between gap-4">
                <span>{item}</span>
                <span className={`h-6 w-11 rounded-full ${index < 2 ? 'bg-[var(--warm)]' : 'bg-white/12'} relative`}>
                  <span className={`absolute top-1 h-4 w-4 rounded-full bg-slate-950 transition ${index < 2 ? 'left-6' : 'left-1 bg-white/70'}`} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageChrome>
  );
}
