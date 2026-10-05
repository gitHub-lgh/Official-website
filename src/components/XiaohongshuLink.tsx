'use client';

import React, { useCallback } from 'react';
import { isMobileDevice } from '@/lib/deeplink';
import { openXiaohongshuProfile } from '@/lib/xiaohongshu';

interface XiaohongshuLinkProps {
  /** 小红书 user id, taken from the profile URL. */
  userId: string;
  /** Web profile page, used on desktop and as the deep-link fallback. */
  webUrl: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/** On phones this opens the 小红书 app on the profile; everywhere else it opens the web page. */
export default function XiaohongshuLink({ userId, webUrl, className, style, children }: XiaohongshuLinkProps) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isMobileDevice()) return; // Desktop keeps the normal web link.
      event.preventDefault();
      openXiaohongshuProfile(userId, webUrl);
    },
    [userId, webUrl]
  );

  return (
    <a
      href={webUrl}
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
