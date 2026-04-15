import Link from 'next/link';
import { PageChrome } from '@/components/page-chrome';

export default function OnboardingPage() {
  return (
    <PageChrome
      eyebrow="Onboarding"
      title="A calm system for the fragments you meant to come back to."
      subtitle="Constellation is intentionally simple to understand: gather fragments, let patterns emerge, then recover what still matters."
      actions={
        <Link href="/demo" className="rounded-full bg-[var(--warm)] px-5 py-3 text-sm font-semibold text-slate-950">
          Continue to demo mode
        </Link>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: 'Capture',
            body: 'Fragments can be messy. Notes, screenshots, links, voice thoughts, reminders, and half-finished feelings all belong here.'
          },
          {
            title: 'Cluster',
            body: 'Related fragments gather into constellations so users can see patterns they would not uncover through folders or search alone.'
          },
          {
            title: 'Rediscover',
            body: 'The feed surfaces forgotten fragments with gentle explanations and next steps that feel optional, not controlling.'
          }
        ].map((step, index) => (
          <div key={step.title} className="glass-panel rounded-[30px] p-6">
            <p className="section-kicker">Step {index + 1}</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{step.title}</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="glass-panel rounded-[32px] p-6">
          <p className="section-kicker">What users feel</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Less clutter, more coherence.</h3>
          <p className="mt-4 text-sm leading-7 text-white/72">
            The product is designed for people who save too much and revisit too little. It should feel reflective, not managerial; premium, not theatrical; magical, but still believable.
          </p>
        </div>
        <div className="glass-panel rounded-[32px] p-6">
          <p className="section-kicker">Demo route</p>
          <ol className="mt-4 space-y-3 text-sm leading-7 text-white/72">
            <li>1. View the rediscovery feed.</li>
            <li>2. Open a constellation and understand the grouping.</li>
            <li>3. Open a resurfaced fragment.</li>
            <li>4. Follow the reconnect or reflection payoff.</li>
          </ol>
        </div>
      </div>
    </PageChrome>
  );
}
