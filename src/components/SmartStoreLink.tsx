'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { StoreLink } from '@/types/store';
import { isAndroidDevice, pickStoreForDevice, openAndroidMarket } from '@/lib/store';

interface SmartStoreLinkProps {
  stores: StoreLink[];
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Card level link that adapts to the current device:
 * Android opens the native app market on the detail page, iOS prefers the App Store,
 * desktop keeps the first store's web page.
 */
export default function SmartStoreLink({ stores, className, style, children }: SmartStoreLinkProps) {
  const fallbackUrl = stores[0]?.url ?? '#';
  const [href, setHref] = useState(fallbackUrl);

  useEffect(() => {
    const store = pickStoreForDevice(stores);
    if (store) setHref(store.url);
  }, [stores]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const store = pickStoreForDevice(stores);
      if (!store) return;

      if (isAndroidDevice() && store.kind === 'android' && store.pkg) {
        event.preventDefault();
        openAndroidMarket(store);
      }
      // iOS / desktop: let the anchor open `href` normally.
    },
    [stores]
  );

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
