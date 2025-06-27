import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Typography } from './types';
import { defaultTypography } from './defaultTypography';

interface TypographyContextType {
  typography: Typography;
}

const TypographyContext = createContext<TypographyContextType>({ typography: defaultTypography });

interface TypographyProviderProps {
  typography: Typography;
  children: ReactNode;
}

export const TypographyProvider: React.FC<TypographyProviderProps> = ({ typography, children }) => {
  return (
    <TypographyContext.Provider value={{ typography }}>
      {children}
    </TypographyContext.Provider>
  );
};

export const useTypography = (): Typography => {
  const context = useContext(TypographyContext);
  if (context === undefined) {
    throw new Error('useTypography must be used within a TypographyProvider');
  }
  return context.typography;
};
