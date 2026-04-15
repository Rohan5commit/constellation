import Link from 'next/link';
import { constellations } from '@/lib/demo-data';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-6 md:px-10">
        <nav className="glass-panel flex items-center justify-between rounded-full px-4 py-3 text-sm text-white/78">
          <div className="flex items-center gap-3 font-semibold tracking-[0.16em] text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/6">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--warm)] shadow-[0_0_18px_rgba(255,212,172,0.8)]" />
            </span>
            CONSTELLATION
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <Link href="/onboarding" className="hover:text-white">Onboarding</Link>
            <Link href="/demo" className="hover:text-white">Prototype</Link>
            <Link href="/privacy" className="hover:text-white">Trust</Link>
            <a href="https://github.com/Rohan5commit/constellation" className="hover:text-white">GitHub</a>
          </div>
        </nav>

        <section className="relative mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="section-kicker">UCI Design-a-thon 2026 · Lost & Found</p>
              <h1 className="text-glow max-w-4xl font-[var(--font-serif)] text-6xl leading-[0.9] text-white md:text-[6.4rem]">
                The things we lose online are rarely files. <span className="gradient-text">They are meanings.</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
                Constellation helps people recover forgotten ideas, moments, and relationships from scattered digital fragments before they disappear into the background noise of daily life.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/demo" className="rounded-full bg-[var(--warm)] px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:brightness-105">
                Enter the prototype
              </Link>
              <Link href="/onboarding" className="rounded-full border border-white/14 bg-white/6 px-6 py-3.5 text-sm font-semibold text-white/84 transition hover:border-white/22">
                See the journey
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['Capture fragments', 'Screenshots, voice thoughts, links, reminders, and half-finished notes.'],
                ['Restore context', 'Cluster scattered saves into themes that feel emotionally legible.'],
                ['Find what matters', 'Resurface the right fragment at a moment when it can still matter.']
              ].map(([title, copy]) => (
                <div key={title} className="glass-panel rounded-[26px] p-5">
                  <p className="text-base font-semibold text-white">{title}</p>
                  <p className="mt-3 text-sm leading-6 text-white/66">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-glow glass-panel relative overflow-hidden rounded-[38px] p-6 md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,214,168,0.14),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(191,224,255,0.14),_transparent_32%),radial-gradient(circle_at_50%_75%,_rgba(214,195,255,0.12),_transparent_36%)]" />
            <div className="relative">
              <div className="flex items-center justify-between text-sm text-white/56">
                <span>Fragments drifting tonight</span>
                <span>Lost & Found, reimagined</span>
              </div>

              <div className="relative mt-8 h-[420px] rounded-[28px] border border-white/8 bg-black/20 p-6">
                <svg className="absolute inset-0 h-full w-full opacity-60">
                  <line x1="22%" y1="28%" x2="50%" y2="45%" stroke="rgba(255,255,255,0.16)" strokeDasharray="5 7" />
                  <line x1="50%" y1="45%" x2="76%" y2="26%" stroke="rgba(255,255,255,0.16)" strokeDasharray="5 7" />
                  <line x1="50%" y1="45%" x2="70%" y2="72%" stroke="rgba(255,255,255,0.16)" strokeDasharray="5 7" />
                  <line x1="50%" y1="45%" x2="26%" y2="72%" stroke="rgba(255,255,255,0.16)" strokeDasharray="5 7" />
                </svg>

                <div className="absolute left-[18%] top-[18%] w-40 rounded-[22px] border border-white/10 bg-[#112038]/85 p-4 text-sm text-white/72 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                  <p className="font-semibold text-white">Reminder to text Maya back</p>
                  <p className="mt-2">Saved after a conversation that felt important.</p>
                </div>

                <div className="absolute left-[58%] top-[14%] w-40 rounded-[22px] border border-white/10 bg-[#101b31]/85 p-4 text-sm text-white/72 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                  <p className="font-semibold text-white">Voice note: startup idea</p>
                  <p className="mt-2">A thought recorded before it could disappear.</p>
                </div>

                <div className="absolute left-[57%] top-[60%] w-40 rounded-[22px] border border-white/10 bg-[#12162b]/85 p-4 text-sm text-white/72 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                  <p className="font-semibold text-white">Civic internship link</p>
                  <p className="mt-2">A saved direction that still feels like meaning.</p>
                </div>

                <div className="absolute left-[20%] top-[62%] w-40 rounded-[22px] border border-white/10 bg-[#16122f]/85 p-4 text-sm text-white/72 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                  <p className="font-semibold text-white">Quote from a hard week</p>
                  <p className="mt-2">A signal you left for yourself when things felt loud.</p>
                </div>

                <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/14 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_rgba(255,255,255,0.04)_70%)] text-center">
                  <p className="section-kicker text-[0.62rem]">Found again</p>
                  <p className="mt-2 font-[var(--font-serif)] text-3xl leading-none text-white">Constellation</p>
                  <p className="mt-2 max-w-[9rem] text-xs leading-5 text-white/60">Scattered fragments become a pattern you can act on.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-panel rounded-[34px] p-8">
            <p className="section-kicker">What gets lost</p>
            <h2 className="mt-4 font-[var(--font-serif)] text-4xl text-white">Not the file. The context.</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-white/72">
              <p>
                A saved fragment becomes effectively lost when the reason for saving it vanishes. That is why storage tools alone are not enough. The human problem is contextual amnesia.
              </p>
              <p>
                Constellation treats screenshots, notes, links, voice snippets, and unfinished plans as drifting fragments of a larger personal story. The goal is to rebuild that story before the fragment becomes meaningless.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {constellations.map((constellation) => (
              <div key={constellation.slug} className="glass-panel rounded-[28px] p-6">
                <p className="text-xl font-semibold text-white">{constellation.name}</p>
                <p className="mt-3 text-sm leading-6 text-white/68">{constellation.subtitle}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-white/44">{constellation.fragments.length} linked fragments</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: '1. Gather fragments',
              copy: 'Capture a note, screenshot, link, voice thought, memory prompt, or person-based reminder with almost no friction.'
            },
            {
              title: '2. Let patterns emerge',
              copy: 'AI grouping turns isolated saves into emotionally readable constellations like Unfinished Futures or People To Return To.'
            },
            {
              title: '3. Recover what matters',
              copy: 'The rediscovery feed explains why something resurfaced and helps the user act, reconnect, archive, or let it go.'
            }
          ].map((step) => (
            <div key={step.title} className="glass-panel rounded-[28px] p-6">
              <p className="section-kicker">How it works</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{step.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/68">{step.copy}</p>
            </div>
          ))}
        </section>

        <section className="mt-20 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-panel rounded-[34px] p-8">
            <p className="section-kicker">AI with restraint</p>
            <h2 className="mt-4 font-[var(--font-serif)] text-4xl text-white">Assistive, not invasive.</h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-white/72">
              <li>Clusters fragments when grouping creates real rediscovery value.</li>
              <li>Uses language like “might relate to” and “seems connected to”.</li>
              <li>Never invents memories or pretends to know more than the saved data suggests.</li>
              <li>Supports reflection and reconnection without pushing the user into performative productivity.</li>
            </ul>
          </div>

          <div className="glass-panel rounded-[34px] p-8">
            <p className="section-kicker">For judges</p>
            <h2 className="mt-4 font-[var(--font-serif)] text-4xl text-white">Designed to land in 30 seconds.</h2>
            <p className="mt-6 text-base leading-8 text-white/72">
              The product story is visible from the first screen, the interaction model is distinctive, and the repository contains the research, process, prototype, and talk track needed for a strong designathon submission.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/demo" className="rounded-full bg-[var(--warm)] px-5 py-3 text-sm font-semibold text-slate-950">
                Open the live prototype
              </Link>
              <a href="https://github.com/Rohan5commit/constellation" className="rounded-full border border-white/14 bg-white/5 px-5 py-3 text-sm font-semibold text-white/84">
                Review the repo
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
