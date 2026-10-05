import { AndroidVendor, StoreLink } from '@/types/store';
import { navigateWithFallback } from '@/lib/deeplink';

/** 应用宝 (Tencent MyApp) app detail scheme. */
const TENCENT_MARKET_SCHEME = 'tmast://';

export function isAndroidDevice(ua: string = typeof navigator === 'undefined' ? '' : navigator.userAgent): boolean {
  return /android/i.test(ua);
}

export function isIOSDevice(ua: string = typeof navigator === 'undefined' ? '' : navigator.userAgent): boolean {
  if (/iphone|ipad|ipod/i.test(ua)) return true;
  // iPadOS 13+ reports itself as a Mac; touch points reveal the truth.
  return /macintosh/i.test(ua) && typeof document !== 'undefined' && 'ontouchend' in document;
}

/** Guess the device vendor so we know which preinstalled app market `market://` would hit. */
export function detectAndroidVendor(ua: string = typeof navigator === 'undefined' ? '' : navigator.userAgent): AndroidVendor {
  if (/miuibrowser|miui|xiaomi|redmi|poco/i.test(ua)) return 'xiaomi';
  if (/huawei|harmony|honor|hmscore/i.test(ua)) return 'huawei';
  if (/oppo|realme|oneplus|heytap/i.test(ua)) return 'oppo';
  if (/vivo|iqoo/i.test(ua)) return 'vivo';
  if (/samsung|sm-/i.test(ua)) return 'samsung';
  return 'other';
}

/**
 * Pick the most relevant store for the current device.
 * Android -> Android store, iOS -> App Store (when the app has one), otherwise the first store.
 */
export function pickStoreForDevice(stores: StoreLink[]): StoreLink | undefined {
  if (isAndroidDevice()) {
    return stores.find((store) => store.kind === 'android') ?? stores[0];
  }
  if (isIOSDevice()) {
    return stores.find((store) => store.kind === 'appstore') ?? stores[0];
  }
  return stores[0];
}

/**
 * Open the device's default app market straight on the app detail page, falling back to the
 * web store page. When the current device's market is known not to list the app, it goes to
 * 应用宝 (app first, web page as fallback) instead.
 */
export function openAndroidMarket(store: StoreLink): void {
  const pkg = store.pkg;
  const fallbackUrl = store.url;

  if (!pkg) {
    if (typeof window !== 'undefined') window.location.href = store.url;
    return;
  }

  const vendor = detectAndroidVendor();
  if (store.skipVendors?.includes(vendor)) {
    // e.g. 易图 is not published on Xiaomi's store, so go straight to 应用宝.
    navigateWithFallback(`${TENCENT_MARKET_SCHEME}appdetails?pname=${pkg}&oplist=1;2`, fallbackUrl);
    return;
  }

  // `browser_fallback_url` lets Chrome (and other intent-aware browsers) land on the web
  // store page automatically when no app market is installed.
  const intentUrl =
    `intent://details?id=${pkg}#Intent;scheme=market;` +
    `action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;` +
    `S.browser_fallback_url=${encodeURIComponent(store.url)};end`;

  navigateWithFallback(intentUrl, store.url);
}
