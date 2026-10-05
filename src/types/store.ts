/** Android device vendors that can have their own preinstalled app market. */
export type AndroidVendor = 'xiaomi' | 'huawei' | 'oppo' | 'vivo' | 'samsung' | 'other';

export interface StoreLink {
  kind: 'appstore' | 'android';
  /** Web store page (App Store / 应用宝 / 华为应用市场 ...). Also used as the deep-link fallback. */
  url: string;
  /** Android package name; when present the Android badge opens the native store app. */
  pkg?: string;
  /**
   * Vendors whose own app market does NOT list this app. On these devices the native
   * market deep link is skipped and the link goes to 应用宝 instead.
   */
  skipVendors?: AndroidVendor[];
}
