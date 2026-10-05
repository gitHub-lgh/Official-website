'use client';

import { useMemo } from 'react';
import AppCard from '@/components/AppCard';
import ThemedBackgroundImage from '@/components/ThemedBackgroundImage';
import { StoreLink } from '@/types/store';
import ExternalLinkIcon from '@/components/ExternalLinkIcon';
import Portrait from '@/components/Portrait';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import XiaohongshuLink from '@/components/XiaohongshuLink';
import { useLocale } from '@/contexts/LocaleContext';

// 图片资源常量
const imgPortrait = "/homeimage/portrait/portrait.png";
const videoPortraitLight = "/homeimage/portrait/dynamic-portrait-light.mp4";
const videoPortraitDark = "/homeimage/portrait/dynamic-portrait-dark.mp4";

// 返回同一张图片的浅色/深色资源对
const singleTheme = (src: string) => ({ light: src, dark: src });

// 根据主题选择图片的函数
const getThemedImage = (baseName: string) => {
  return {
    light: `/homeimage/${baseName}.png`,
    dark: `/homeimage/${baseName}.png`
  };
};

// 根据主题和语言选择应用截图的函数
const getThemedAppImage = (baseName: string, locale: string) => {
  const appName = baseName.split('-')[0]; // 提取图片所在的目录名
  const langSuffix = locale === 'zh' ? '-zh' : '-en';
  return {
    light: `/homeimage/${appName}/${baseName}${langSuffix}-light.png`,
    dark: `/homeimage/${appName}/${baseName}${langSuffix}-dark.png`
  };
};

// 下载链接
const bianbianAppStoreUrl = "https://apps.apple.com/cn/app/id6755945412";
const bianbianAndroidUrl = "https://sj.qq.com/appdetail/com.lgh.bianbianhelp";
const pixelboardUrl = "https://sj.qq.com/appdetail/com.lgh.pixelboard";
const easychartUrl = "https://sj.qq.com/appdetail/com.lgh.easychart";
const bookfilmUrl = "https://sj.qq.com/appdetail/com.lgh.bookfilm";
const dailyrecordUrl = "https://appgallery.huawei.com/app/C113130111";

// 社交链接
const xiaohongshuUserId = "607a702e00000000010088ed";
const xiaohongshuUrl = "https://www.xiaohongshu.com/user/profile/607a702e00000000010088ed";

export default function Home() {
  const { translations, locale } = useLocale();

  // 便便助手图片资源 - 根据当前语言动态生成
  const picTuneImages = useMemo(
    () => ({
      icon: getThemedImage('bianbian'),
      app: getThemedAppImage('pictune-app', locale)
    }),
    [locale]
  );

  const appCards = useMemo(() => [
    {
      key: 'bianbian',
      icon: picTuneImages.icon,
      image: picTuneImages.app,
      name: translations.bianbianName,
      description: translations.pictuneDescription,
      detail: (
        <>
          <p style={{ marginBottom: '1rem' }}>{translations.pictuneDetail1}</p>
          <p>{translations.pictuneDetail2}</p>
        </>
      ),
      stores: [
        { kind: 'appstore', url: bianbianAppStoreUrl },
        { kind: 'android', url: bianbianAndroidUrl, pkg: 'com.lgh.bianbianhelp' }
      ] as StoreLink[]
    },
    {
      key: 'pixelboard',
      icon: singleTheme('/homeimage/pixelboard/pixelboard-icon.png'),
      image: singleTheme('/homeimage/pixelboard/pixelboard-app.png'),
      name: translations.pixelboardName,
      description: translations.pixelboardDescription,
      detail: translations.pixelboardDetail,
      stores: [
        { kind: 'android', url: pixelboardUrl, pkg: 'com.lgh.pixelboard' }
      ] as StoreLink[]
    },
    {
      key: 'easychart',
      icon: singleTheme('/homeimage/easychart/easychart-icon.png'),
      image: singleTheme('/homeimage/easychart/easychart-app.png'),
      name: translations.easychartName,
      description: translations.easychartDescription,
      detail: translations.easychartDetail,
      stores: [
        { kind: 'android', url: easychartUrl, pkg: 'com.lgh.easychart', skipVendors: ['xiaomi'] }
      ] as StoreLink[]
    },
    {
      key: 'bookfilm',
      icon: singleTheme('/homeimage/bookfilm/bookfilm-icon.png'),
      image: singleTheme('/homeimage/bookfilm/bookfilm-app.png'),
      name: translations.bookfilmName,
      description: translations.bookfilmDescription,
      detail: translations.bookfilmDetail,
      stores: [
        { kind: 'android', url: bookfilmUrl, pkg: 'com.lgh.bookfilm' }
      ] as StoreLink[]
    },
    {
      key: 'dailyrecord',
      icon: singleTheme('/homeimage/dailyrecord/dailyrecord-icon.png'),
      image: singleTheme('/homeimage/dailyrecord/dailyrecord-app.png'),
      name: translations.dailyrecordName,
      description: translations.dailyrecordDescription,
      detail: translations.dailyrecordDetail,
      stores: [
        { kind: 'android', url: dailyrecordUrl, pkg: 'com.lgh.dailyrecord' }
      ] as StoreLink[]
    }
  ], [translations, picTuneImages]);

  const scrollToApp = (key: string) => {
    const target = document.getElementById(`app-${key}`);
    if (!target) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full" style={{ backgroundColor: 'var(--background-primary)' }}>
      <div className="flex flex-col gap-16 md:gap-[100px] items-center md:items-start justify-start max-w-[1000px] w-full px-4 md:px-5 pt-16 md:pt-[100px] pb-0">
        
        {/* Self Introduction Section */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center md:items-start justify-start w-full text-center md:text-left">
          {/* Portrait */}
          <Portrait 
            imageSrc={imgPortrait} 
            videoSrcLight={videoPortraitLight} 
            videoSrcDark={videoPortraitDark} 
          />
          
          {/* Introduction */}
          <div className="flex flex-col items-center md:items-start justify-start w-full min-w-0">
            {/* Name */}
            <div className="large-title w-full" style={{ color: 'var(--label-primary)' }}>
              {translations.name}
            </div>
            
            {/* Information */}
            <div className="flex flex-col gap-1.5 items-center md:items-start justify-center pt-2.5 px-0 w-full">
              <div className="body-text w-full preserve-whitespace" style={{ color: 'var(--label-primary)' }}>
                {translations.developer}
              </div>
              <div className="body-text w-full preserve-whitespace" style={{ color: 'var(--label-primary)' }}>
                {translations.formerPM}
              </div>
              {/* <div className="body-text w-full preserve-whitespace" style={{ color: 'var(--label-primary)' }}>
                {translations.education}
              </div> */}
            </div>
            
            {/* Bio */}
            <p className="body-text w-full max-w-[42rem] pt-5 md:pt-6" style={{ color: 'var(--label-secondary)' }}>
              {translations.bio}
            </p>
            
            {/* Links */}
            <div className="flex flex-col gap-1.5 items-center md:items-start justify-start w-full pt-5 md:pt-6">
              <div className="body-text w-full" style={{ color: 'var(--label-secondary)' }}>
                <a 
                  href="https://www.google.com/maps?q=23.433876, 116.218361" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: 'var(--label-secondary)' }}
                >
                  22°32′ N, 114°05′ E
                </a>
                <ExternalLinkIcon />
              </div>
              <div className="body-text w-full" style={{ color: 'var(--label-secondary)' }}>
                <a href="mailto:lihong@hongruankeji.com" className="hover:underline">lihong@hongruankeji.com</a>
                <ExternalLinkIcon />
              </div>
              <div className="body-text w-full" style={{ color: 'var(--label-secondary)' }}>
                <XiaohongshuLink
                  userId={xiaohongshuUserId}
                  webUrl={xiaohongshuUrl}
                  className="inline-flex items-center gap-1.5 align-middle hover:underline"
                  style={{ color: 'var(--label-secondary)' }}
                >
                  <img
                    src="/homeimage/social/xiaohongshu.png"
                    alt=""
                    width={16}
                    height={16}
                    className="rounded-[4px] shrink-0"
                  />
                  {translations.xiaohongshu}
                </XiaohongshuLink>
                <ExternalLinkIcon />
              </div>
            </div>
            
            {/* App quick view - jump to the matching work card */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 w-full pt-6 md:pt-7">
              {appCards.map((app) => (
                <button
                  key={app.key}
                  type="button"
                  onClick={() => scrollToApp(app.key)}
                  title={app.name}
                  aria-label={app.name}
                  className="group relative w-11 h-11 shrink-0 rounded-[12px] overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ outlineColor: 'var(--label-secondary)' }}
                >
                  <ThemedBackgroundImage
                    lightSrc={app.icon.light}
                    darkSrc={app.icon.dark}
                    className="rounded-[12px] w-full h-full"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[12px] border border-solid pointer-events-none"
                    style={{ borderColor: 'var(--fill-primary)' }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Works List Section */}
        <div className="flex flex-col gap-5 items-center md:items-start justify-start w-full">
          {/* Title */}
          <div className="title1 w-full text-center md:text-left" style={{ color: 'var(--label-primary)' }}>
            {translations.works}
          </div>
          
          {/* List */}
          <div className="flex flex-col gap-6 md:gap-10 items-start justify-start w-full">
            {appCards.map((app) => (
              <AppCard
                key={app.key}
                id={`app-${app.key}`}
                appIcon={app.icon}
                appName={app.name}
                appDescription={app.description}
                appDetail={app.detail}
                appImage={app.image}
                stores={app.stores}
              />
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex flex-col items-center md:items-start pb-8 md:pb-10 pt-0 px-0 w-full gap-2.5">
          {/* Mobile Language Switcher - Visible on mobile, hidden on desktop */}
          <div className="flex md:hidden items-center justify-center w-full">
            <LanguageSwitcher />
          </div>
          
          {/* Desktop Footer with Language Switcher */}
          <div className="flex items-center md:items-start justify-center md:justify-between w-full">
            <div className="footnote text-center md:text-left" style={{ color: 'var(--label-secondary)' }}>
              {translations.copyright} <a 
                href="https://beian.miit.gov.cn/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: 'var(--label-secondary)' }}
              >
                粤ICP备2024176646号
              </a>
            </div>
            
            {/* Language Switcher - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
