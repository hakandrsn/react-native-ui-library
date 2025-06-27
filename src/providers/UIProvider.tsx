import type { ReactNode } from 'react';
import { ThemeProvider } from '../theme/ThemeContext';
import { TypographyProvider } from '../typography/TypographyContext';
import type { Theme, ThemeOptions } from '../theme/types';
import type { Typography, TypographyOptions } from '../typography/types';
import { createTheme } from '../theme/createTheme';
import { createTypography } from '../typography/createTypography';

interface UIProviderProps {
  children: ReactNode;
  theme?: ThemeOptions;
  typography?: TypographyOptions;
}

/**
 * UIProvider component that provides theme and typography context to the application
 * @param children - React children components
 * @param theme - Optional custom theme options
 * @param typography - Optional custom typography options
 */
export const UIProvider: React.FC<UIProviderProps> = ({
  children,
  theme,
  typography
}) => {
  const customTheme: Theme = createTheme(theme);
  const customTypography: Typography = createTypography(typography);

  return (
    <ThemeProvider theme={customTheme}>
      <TypographyProvider typography={customTypography}>
        {children}
      </TypographyProvider>
    </ThemeProvider>
  );
};
