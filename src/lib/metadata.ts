import { Metadata } from 'next';
import { Locale } from '@/types/locale';

interface MetadataTranslations {
  title: string;
  description: string;
  keywords: string[];
}

const metadataTranslations: Record<Locale, MetadataTranslations> = {
  en: {
    title: 'HongCode',
    description: 'An independent developer focused on Swift ecosystem',
    keywords: ['Swift', 'iOS', 'macOS', 'Independent Development', 'HongCode', 'Mobile Apps', 'App Development'],
  },
  zh: {
    title: 'HongCode',
    description: '专注于 Swift 生态的独立开发者',
    keywords: ['Swift', 'iOS', 'macOS', '独立开发', 'HongCode', '移动应用', '应用开发'],
  },
};

export function generateMetadata(locale: Locale = 'en'): Metadata {
  const translations = metadataTranslations[locale];
  
  return {
    title: translations.title,
    description: translations.description,
    keywords: translations.keywords,
    authors: [{ name: 'HongCode' }],
    creator: 'HongCode',
    publisher: 'HongCode',
    metadataBase: new URL('https://jerrycode.fun'),
    openGraph: {
      title: translations.title,
      description: translations.description,
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      siteName: 'JerryCode',
      url: 'https://jerrycode.fun',
      images: [
        {
          url: 'https://jerrycode.fun/homeimage/portrait/portrait.png',
          width: 400,
          height: 400,
          alt: 'JerryCode Logo',
          type: 'image/png',
        },
      ],
    },
    icons: {
      icon: [
        { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
        { url: '/favicon/favicon.ico' },
        { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      ],
      shortcut: '/favicon/favicon.ico',
      apple: [
        { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        { url: '/favicon/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
        { url: '/favicon/apple-touch-icon-167x167.png', sizes: '167x167', type: 'image/png' },
        { url: '/favicon/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { rel: 'mask-icon', url: '/favicon/safari-pinned-tab.svg', color: '#000000' },
      ],
    },
    manifest: '/favicon/site.webmanifest',
    twitter: {
      card: 'summary_large_image',
      title: translations.title,
      description: translations.description,
      images: ['https://jerrycode.fun/homeimage/portrait/portrait.png'],
      creator: '@jerrycode',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
