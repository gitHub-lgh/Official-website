import React from 'react';
import ThemedBackgroundImage from './ThemedBackgroundImage';
import AndroidDownloadLink from './AndroidDownloadLink';
import SmartStoreLink from './SmartStoreLink';
import { StoreLink } from '@/types/store';
import { useLocale } from '@/contexts/LocaleContext';

export type { StoreLink };

interface ThemedImagePair {
  light: string;
  dark: string;
}

interface AppCardProps {
  /** Anchor id, so the hero icon row can scroll to this card. */
  id?: string;
  appIcon: ThemedImagePair;
  appName: string;
  appDescription: string;
  appDetail: string | React.ReactNode;
  appImage: ThemedImagePair;
  /** Download links, rendered as store badges. */
  stores: StoreLink[];
}

export default function AppCard({
  id,
  appIcon,
  appName,
  appDescription,
  appDetail,
  appImage,
  stores
}: AppCardProps) {
  const { locale, translations } = useLocale();

  const renderBadge = (store: StoreLink) => {
    if (store.kind === 'appstore') {
      return (
        <a key={store.kind} href={store.url} target="_blank" rel="noopener noreferrer" className="block hover:opacity-90 transition-opacity duration-200">
          <img
            src={`https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/${locale === 'zh' ? 'zh-cn' : 'en-us'}?releaseDate=1755820800`}
            alt={locale === 'zh' ? '立即下载，就在 App Store' : 'Download on the App Store'}
            style={{ width: '120px', height: '40px', objectFit: 'contain' }}
          />
        </a>
      );
    }

    const badge = (
      <img
        src={`/homeimage/badges/android-badge-${locale}.svg`}
        alt={translations.androidBadge}
        style={{ width: '120px', height: '40px', objectFit: 'contain' }}
      />
    );

    if (store.pkg) {
      return (
        <AndroidDownloadLink
          key={store.kind}
          store={store}
          className="block hover:opacity-90 transition-opacity duration-200"
        >
          {badge}
        </AndroidDownloadLink>
      );
    }

    return (
      <a key={store.kind} href={store.url} target="_blank" rel="noopener noreferrer" className="block hover:opacity-90 transition-opacity duration-200">
        {badge}
      </a>
    );
  };

  return (
    <div id={id} className="flex flex-col md:flex-row gap-0 md:gap-[60px] items-center md:items-start justify-start overflow-hidden relative rounded-[24px] md:rounded-[36px] w-full p-0 scroll-mt-6 md:scroll-mt-8" style={{ backgroundColor: 'var(--background-secondary)' }}>
      {/* Content Section */}
      <div className="flex flex-col gap-6 md:gap-10 grow items-center md:items-start justify-start p-6 md:p-[36px] relative self-stretch min-w-0 text-center md:text-left">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-4.5 items-center md:items-center justify-start w-full">
          {/* App Icon - Clickable */}
          <SmartStoreLink stores={stores} className="relative rounded-[16px] shrink-0 w-[70px] h-[70px] hover:scale-102 transition-transform duration-200">
            <ThemedBackgroundImage
              lightSrc={appIcon.light}
              darkSrc={appIcon.dark}
              className="rounded-[16px] w-full h-full"
            />
            <div 
              aria-hidden="true" 
              className="absolute border border-solid inset-0 pointer-events-none rounded-[16px]" 
              style={{ borderColor: 'var(--fill-primary)' }}
            />
          </SmartStoreLink>
          
          {/* Label */}
          <div className="flex flex-col gap-0.25 grow items-center md:items-start justify-center min-w-0">
            <SmartStoreLink stores={stores} className="hover:opacity-80 transition-opacity duration-200">
              <div className="title2 w-full" style={{ color: 'var(--label-primary)' }}>
                {appName}
              </div>
            </SmartStoreLink>
            <SmartStoreLink stores={stores} className="hover:opacity-80 transition-opacity duration-200">
              <div className="body-text w-full" style={{ color: 'var(--label-secondary)' }}>
                {appDescription}
              </div>
            </SmartStoreLink>
          </div>
        </div>
        
        {/* App Detail - Hidden on mobile, visible on desktop */}
        <div className="hidden md:block body-text w-full flex-1" style={{ color: 'var(--label-primary)', lineHeight: '1.39' }}>
          {appDetail}
        </div>
        
        {/* Store Badges - Visible on all devices */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 shrink-0">
          {stores.map(renderBadge)}
        </div>
      </div>
      
      {/* Image Section - Visible on all devices, Clickable */}
      <div className="flex items-center md:items-end justify-center pt-6 md:pt-9 px-6 md:px-9 pb-0 relative shrink-0 self-center md:self-end">
        <SmartStoreLink stores={stores} className="hover:scale-[1.025] transition-transform duration-350" style={{ transformOrigin: 'center bottom' }}>
          <ThemedBackgroundImage
            lightSrc={appImage.light}
            darkSrc={appImage.dark}
            className="w-[275px] h-[399px] md:w-[300px] md:h-[435px]"
            backgroundSize="contain"
          />
        </SmartStoreLink>
      </div>
    </div>
  );
}
