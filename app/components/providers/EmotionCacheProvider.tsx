"use client";

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useMemo } from 'react';

export const EmotionCacheProvider = ({ children }: { children: React.ReactNode }) => {
  const emotionCache = useMemo(
    () => createCache({ key: "css", prepend: true }),
    []
  );

  return (
    <CacheProvider value={emotionCache}>
      {children}
    </CacheProvider>
  )
}