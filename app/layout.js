import { Analytics } from '@vercel/analytics/next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Lexicon',
  description: 'Your personal irregular verbs dictionary',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-bg text-text font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
