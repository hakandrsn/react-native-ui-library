import type { ViewStyle, TextStyle } from 'react-native';
import type { Theme } from '../../theme/types';
import type { Typography } from '../../typography/types';

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

interface ButtonStyleProps {
  variant: ButtonVariant;
  size: ButtonSize;
  color: ButtonColor;
  fullWidth: boolean;
  disabled: boolean;
  theme: Theme;
  typography: Typography;
}

export interface ButtonStyles {
  container: ViewStyle;
  text: TextStyle;
}

export const getButtonStyles = ({
  variant,
  size,
  color,
  fullWidth,
  disabled,
  theme,
  typography
}: ButtonStyleProps): ButtonStyles => {
  // Base container styles
  const baseContainerStyles: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
    width: fullWidth ? '100%' : undefined,
    borderRadius: theme.borderRadius.md,
    opacity: disabled ? 0.5 : 1,
  };

  // Base text styles
  const baseTextStyles: TextStyle = {
    fontFamily: typography.variants.button.fontFamily,
    fontWeight: typography.variants.button.fontWeight as TextStyle['fontWeight'],
    fontSize: typography.variants.button.fontSize,
    lineHeight: typography.variants.button.lineHeight,
    letterSpacing: typography.variants.button.letterSpacing,
    textTransform: typography.variants.button.textTransform,
    textAlign: 'center',
  };

  // Size styles for container
  const containerSizeStyles: Record<ButtonSize, ViewStyle> = {
    small: {
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
    },
    medium: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    large: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
    },
  };

  // Size styles for text
  const textSizeStyles: Record<ButtonSize, TextStyle> = {
    small: {
      fontSize: typography.fontSize.xs,
    },
    medium: {
      fontSize: typography.fontSize.sm,
    },
    large: {
      fontSize: typography.fontSize.md,
    },
  };

  // Variant styles
  let containerVariantStyles: ViewStyle = {};
  let textVariantStyles: TextStyle = {};
  
  const colorValue = theme.colors[color];
  
  switch (variant) {
    case 'contained':
      containerVariantStyles = {
        backgroundColor: colorValue,
        ...theme.shadows.sm,
      };
      textVariantStyles = {
        color: '#fff',
      };
      break;
    case 'outlined':
      containerVariantStyles = {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colorValue,
      };
      textVariantStyles = {
        color: colorValue,
      };
      break;
    case 'text':
    default:
      containerVariantStyles = {
        backgroundColor: 'transparent',
      };
      textVariantStyles = {
        color: colorValue,
      };
      break;
  }

  return {
    container: {
      ...baseContainerStyles,
      ...containerSizeStyles[size],
      ...containerVariantStyles,
    },
    text: {
      ...baseTextStyles,
      ...textSizeStyles[size],
      ...textVariantStyles,
    },
  };
};