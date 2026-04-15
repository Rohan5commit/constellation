import type { Route } from 'next';
import Link from 'next/link';

const navigation: Array<{ href: Route; label: string }> = [
  { href: '/', label: 'Story' },
  { href: '/onboarding', label: 'Onboarding' },
  { href: '/demo', label: 'Prototype' },
  { href: '/reflection', label: 'Reflection' },
  { href: '/privacy', label: 'Trust' }
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--warm)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08111f]';

type PageChromeProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export function PageChrome({ eyebrow, title, subtitle, children, actions }: PageChromeProps) {
  return (
    <div className="relative min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 md:px-10">
        <nav className="glass-panel flex items-center justify-between rounded-full px-4 py-3 text-sm text-white/80">
          <Link
            href="/"
            className={`flex items-center gap-3 text-sm font-semibold tracking-[0.16em] text-white ${focusRing}`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/6">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--warm)] shadow-[0_0_18px_rgba(255,212,172,0.8)]" />
            </span>
            CONSTELLATION
          </Link>

          <div className="md:hidden">
            <details className="group relative">
              <summary
                className={`list-none rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/82 ${focusRing}`}
              >
                Menu
              </summary>
              <div className="glass-panel absolute right-0 z-20 mt-3 w-48 rounded-[24px] p-3">
                <div className="flex flex-col gap-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-[18px] px-3 py-2 text-sm text-white/74 transition hover:bg-white/6 hover:text-white ${focusRing}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          </div>

          <div className="hidden items-center gap-5 md:flex">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={`transition hover:text-white ${focusRing}`}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <header className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="section-kicker">{eyebrow}</p>
            <div className="space-y-3">
              <h1 className="font-[var(--font-serif)] text-5xl leading-[0.94] text-white md:text-7xl">
                {title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/72 md:text-lg">{subtitle}</p>
            </div>
          </div>
          {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
        </header>

        <main className="pb-16 pt-8">{children}</main>
      </div>
    </div>
  );
}