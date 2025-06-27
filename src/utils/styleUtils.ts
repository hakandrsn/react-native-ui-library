import { useTheme } from '../theme/ThemeContext';
import { useTypography } from '../typography/TypographyContext';

/**
 * Hook that provides access to theme and typography values for styling components
 * @returns Object containing theme and typography values
 */
export const useStyles = () => {
  const theme = useTheme();
  const typography = useTypography();

  return {
    theme,
    typography,
    
    // Helper functions for common styling needs
    spacing: (multiplier = 1) => `${theme.spacing.md * multiplier}px`,
    
    // Helper for responsive design
    breakpoints: {
      up: (key: keyof typeof theme.breakpoints) => `@media (min-width: ${theme.breakpoints[key]})`,
      down: (key: keyof typeof theme.breakpoints) => `@media (max-width: ${theme.breakpoints[key]})`
    },
    
    // Helper for typography variants
    getTypographyStyle: (variant: keyof typeof typography.variants) => typography.variants[variant]
  };
};
