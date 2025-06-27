import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Theme } from './types';
import { defaultTheme } from './defaultTheme';

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType>({ theme: defaultTheme });

interface ThemeProviderProps {
  theme: Theme;
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context.theme;
};
