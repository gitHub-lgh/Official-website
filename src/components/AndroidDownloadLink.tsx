'use client';

import React, { useCallback } from 'react';
import { StoreLink } from '@/types/store';
import { openAndroidMarket, isAndroidDevice } from '@/lib/store';

interface AndroidDownloadLinkProps {
  /** Android store link, including the package name used to open the native store app. */
  store: StoreLink;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function AndroidDownloadLink({
  store,
  className,
  style,
  children
}: AndroidDownloadLinkProps) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isAndroidDevice()) return; // Desktop / iOS keep the default link to the web store page.
      event.preventDefault();
      openAndroidMarket(store);
    },
    [store]
  );

  return (
    <a
      href={store.url}
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
