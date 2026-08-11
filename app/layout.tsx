import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LAST MINUTE PLANS | "I\'m bored. What the fuck are we doing?"',
  description: 'Spontaneous, low-budget local plans and activity soundtracks for Gen-Z.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-[var(--bg-base)] text-[var(--fg-main)] min-h-screen relative selection:bg-[#E6FF00] selection:text-[#0A0A0A]">
        <ThemeProvider>
          {/* Subtle Grain Overlay */}
          <div className="fixed inset-0 bg-noise pointer-events-none z-50 opacity-40" />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
