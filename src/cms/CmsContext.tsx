import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_CMS_DATA } from './defaultData';
import { MuscleTownCMS } from './types';

const STORAGE_KEY = 'the_muscle_town_cms_v2';

interface CmsContextValue {
  cms: MuscleTownCMS;
  updateCms: (updater: (prev: MuscleTownCMS) => MuscleTownCMS) => void;
  resetCms: () => void;
  getAccentColor: (zone?: number) => string;
}

const CmsContext = createContext<CmsContextValue | null>(null);

const ZONE_COLORS: Record<number, string> = {
  1: '#8B0000',
  2: '#E11D2E',
  3: '#8B0000',
  4: '#E11D2E',
  5: '#E11D2E',
};

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [cms, setCms] = useState<MuscleTownCMS>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<MuscleTownCMS>;
        return {
          ...DEFAULT_CMS_DATA,
          ...parsed,
          site: { ...DEFAULT_CMS_DATA.site, ...(parsed.site || {}) },
        };
      }
    } catch {
      // Fallback to defaults if storage unavailable
    }
    return DEFAULT_CMS_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cms));
    } catch {
      // Ignore storage quota errors
    }
    document.documentElement.style.setProperty('--mt-live', cms.site.accentColor);
    document.documentElement.style.setProperty('--mt-live-tint', cms.site.accentTint);
  }, [cms]);

  const updateCms = (updater: (prev: MuscleTownCMS) => MuscleTownCMS) => {
    setCms((prev) => updater(prev));
  };

  const resetCms = () => {
    setCms(DEFAULT_CMS_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const getAccentColor = (zone?: number) => {
    if (cms.site.perZoneColorMode && zone && ZONE_COLORS[zone]) {
      return ZONE_COLORS[zone];
    }
    return cms.site.accentColor || '#E11D2E';
  };

  return (
    <CmsContext.Provider value={{ cms, updateCms, resetCms, getAccentColor }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error('useCms must be used inside CmsProvider');
  return ctx;
}
