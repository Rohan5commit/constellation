import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope'
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Constellation',
  description:
    'An AI-assisted space for recovering forgotten ideas, moments, and connections from scattered digital fragments before they disappear.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#08111f] text-white">
      <body className={`${manrope.variable} ${cormorant.variable} relative min-h-screen bg-[#08111f] text-stone-100 antialiased`}>
        <div className="starfield pointer-events-none fixed inset-0 -z-10" />
        {children}
      </body>
    </html>
  );
}
