import { useTheme } from '../theme/ThemeContext';
import { useTypography } from '../typography/TypographyContext';
import type { Theme } from '../theme/types';
import type { Typography } from '../typography/types';

/**
 * Custom hook that provides access to theme and typography values
 * @returns An object containing theme and typography values
 */
export const useStyles = () => {
  const theme = useTheme();
  const typography = useTypography();

  return {
    theme,
    typography,
  };
};

export type StylesHook = {
  theme: Theme;
  typography: Typography;
};
