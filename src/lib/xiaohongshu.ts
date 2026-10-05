import { navigateWithFallback } from '@/lib/deeplink';

/** 小红书 app URL scheme (declared by the app itself). */
export const XHS_SCHEME = 'xhsdiscover://';

/**
 * Open the 小红书 app straight on a user profile, falling back to the web profile page.
 * The scheme/format matches the one 小红书's own web client uses:
 *   xhsdiscover://user/<userId>?source=<source>
 */
export function openXiaohongshuProfile(userId: string, webUrl: string): void {
  navigateWithFallback(`${XHS_SCHEME}user/${userId}?source=web`, webUrl);
}
