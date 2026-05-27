/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';
export type Density = 'compact' | 'comfortable';

export interface UiPreferences {
  theme: Theme;
  density: Density;
  toggleTheme: () => void;
  setDensity: (density: Density) => void;
}

const UiPreferencesContext = createContext<UiPreferences | null>(null);

export function UiPreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('ui-theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  const [density, setDensityState] = useState<Density>('comfortable');

  function toggleTheme() {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('ui-theme', next);
      return next;
    });
  }

  function setDensity(d: Density) {
    setDensityState(d);
  }

  return (
    <UiPreferencesContext.Provider value={{ theme, density, toggleTheme, setDensity }}>
      <div className={theme === 'dark' ? 'dark' : ''}>{children}</div>
    </UiPreferencesContext.Provider>
  );
}

export function useUiPreferences(): UiPreferences {
  const ctx = useContext(UiPreferencesContext);
  if (!ctx) throw new Error('useUiPreferences must be used within UiPreferencesProvider');
  return ctx;
}
