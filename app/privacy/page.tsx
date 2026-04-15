import { PageChrome } from '@/components/page-chrome';

const prototypeSettings = [
  {
    label: 'Allow resurfacing based on repeated saves',
    enabled: true
  },
  {
    label: 'Allow people-related reconnect suggestions',
    enabled: true
  },
  {
    label: 'Reduce emotional inference language',
    enabled: false
  },
  {
    label: 'Prefer practical resurfacing over reflective resurfacing',
    enabled: false
  }
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--warm)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08111f]';

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
        <p className="mt-3 text-sm leading-6 text-white/60">
          These switches are rendered as read-only prototype preferences so judges can inspect the trust model without guessing whether a control is interactive.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {prototypeSettings.map((item) => (
            <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/72">
              <button
                type="button"
                aria-pressed={item.enabled}
                className={`flex w-full items-center justify-between gap-4 text-left ${focusRing}`}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`relative h-6 w-11 rounded-full ${item.enabled ? 'bg-[var(--warm)]' : 'bg-white/12'}`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full transition ${
                      item.enabled ? 'left-6 bg-slate-950' : 'left-1 bg-white/70'
                    }`}
                  />
                </span>
              </button>
              <p className="mt-3 text-xs text-white/44">Read-only prototype preference</p>
            </div>
          ))}
        </div>
      </div>
    </PageChrome>
  );
}