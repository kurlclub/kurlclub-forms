import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Footer from '@/components/shared/layout/footer';
import { AppProviders } from '@/providers';

import './globals.css';

const figtree = localFont({
  src: [
    { path: '/fonts/Figtree-VariableFont_wght.ttf', weight: '100 900' },
    { path: '/fonts/static/Figtree-Light.ttf', weight: '300' },
    { path: '/fonts/static/Figtree-Regular.ttf', weight: '400' },
    { path: '/fonts/static/Figtree-Medium.ttf', weight: '500' },
    { path: '/fonts/static/Figtree-SemiBold.ttf', weight: '600' },
    { path: '/fonts/static/Figtree-Bold.ttf', weight: '700' },
    { path: '/fonts/static/Figtree-Black.ttf', weight: '800' },
  ],
  variable: '--font-figtree',
});

export const metadata: Metadata = {
  title: {
    template: '%s | KurlClub Forms',
    default: 'KurlClub Forms',
  },
  description:
    'Registration and form management platform for KurlClub fitness centers.',
  icons: {
    icon: ['/favicon.ico', '/icon.svg'],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${figtree.className} bg-secondary-blue-500 antialiased h-dvh overflow-y-auto`}
      >
        <AppProviders>{children}</AppProviders>
        <Footer />
      </body>
    </html>
  );
}
