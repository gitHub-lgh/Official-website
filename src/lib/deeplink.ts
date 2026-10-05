/** True for phones/tablets (Android or iOS), where app deep links make sense. */
export function isMobileDevice(ua: string = typeof navigator === 'undefined' ? '' : navigator.userAgent): boolean {
  if (/android|iphone|ipad|ipod/i.test(ua)) return true;
  // iPadOS 13+ reports itself as a Mac; touch points reveal the truth.
  return /macintosh/i.test(ua) && typeof document !== 'undefined' && 'ontouchend' in document;
}

/**
 * Navigate to a custom scheme, then fall back to a web URL when nothing handled it.
 * Success is detected through blur / pagehide / visibilitychange; browsers without
 * scheme support just stay on the page and get redirected after `delay`.
 */
export function navigateWithFallback(schemeUrl: string, fallbackUrl: string, delay = 1800): void {
  if (typeof window === 'undefined') return;

  let settled = false;
  const markSettled = () => {
    settled = true;
  };

  window.addEventListener('blur', markSettled, { once: true });
  window.addEventListener('pagehide', markSettled, { once: true });
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.visibilityState === 'hidden') markSettled();
    },
    { once: true }
  );

  window.location.href = schemeUrl;

  window.setTimeout(() => {
    if (!settled && document.visibilityState === 'visible') {
      window.location.href = fallbackUrl;
    }
  }, delay);
}
