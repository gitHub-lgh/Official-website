import type { Viewport } from "next";
import "./globals.css";
import { LocaleProvider } from '@/contexts/LocaleContext';
import HtmlLangUpdater from '@/components/HtmlLangUpdater';
import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('zh'); // Static export carries the zh share card

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1C1C1E" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased">
        <LocaleProvider>
          <HtmlLangUpdater />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
