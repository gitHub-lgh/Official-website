import { Metadata } from 'next';
import { Locale } from '@/types/locale';

interface MetadataTranslations {
  title: string;
  description: string;
  keywords: string[];
}

/** Production site origin, also used to build absolute URLs for share cards. */
const SITE_URL = 'https://lgh.hongruankeji.com';
/** Square cover used by WeChat / iMessage / Twitter link previews. */
const SHARE_IMAGE = `${SITE_URL}/homeimage/share/cover.png`;

const metadataTranslations: Record<Locale, MetadataTranslations> = {
  en: {
    title: 'Hong · Independent Developer',
    description: 'Independent developer focused on mobile products — Poop Recorder, Pixel Board, EasyChart and more.',
    keywords: ['Independent Development', 'Mobile Apps', 'App Development', 'Kotlin', 'Swift', 'ArkTs', 'Hong'],
  },
  zh: {
    title: '阿洪 · 独立开发者',
    description: '独立开发者，专注移动端产品。已上线便便助手、Pixel像素板、易图、书影小角落、日常小记等 App。',
    keywords: ['独立开发', '移动应用', 'App 开发', 'Kotlin', 'Swift', 'ArkTs', '阿洪'],
  },
};

export function generateMetadata(locale: Locale = 'zh'): Metadata {
  const translations = metadataTranslations[locale];
  
  return {
    title: translations.title,
    description: translations.description,
    keywords: translations.keywords,
    authors: [{ name: '阿洪' }],
    creator: '阿洪',
    publisher: '阿洪',
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      title: translations.title,
      description: translations.description,
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      siteName: '阿洪',
      url: SITE_URL,
      images: [
        {
          url: SHARE_IMAGE,
          width: 1200,
          height: 1200,
          alt: '阿洪 · 独立开发者',
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
      images: [SHARE_IMAGE],
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
