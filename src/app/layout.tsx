import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontPoppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Zyron Semi Conductors | Advanced Semiconductor & Chip Design Solutions',
  description: 'Your reliable semiconductor design partner for next-generation silicon solutions and high-performance chip development. We deliver quality-driven silicon engineering.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontInter.variable, fontPoppins.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
