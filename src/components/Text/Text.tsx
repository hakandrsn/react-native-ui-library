import React from 'react';
import type { ReactNode } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import type { TextStyle, StyleProp } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useTypography } from '../../typography/TypographyContext';

export type TextVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6' 
  | 'subtitle1' 
  | 'subtitle2' 
  | 'body1' 
  | 'body2' 
  | 'button' 
  | 'caption' 
  | 'overline'
  | 'title'
  | 'headerTitle'
  | 'descriptionTitle';

interface TextProps {
  variant?: TextVariant;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  noWrap?: boolean;
  gutterBottom?: boolean;
  style?: StyleProp<TextStyle>;
  children: ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body1',
  color,
  align = 'left',
  noWrap = false,
  gutterBottom = false,
  style = {},
  children
}) => {
  const theme = useTheme();
  const typography = useTypography();
  
  // Map custom variants to typography variants
  const getTypographyVariant = (variant: TextVariant) => {
    switch (variant) {
      case 'headerTitle':
        return 'h4';
      case 'title':
        return 'h5';
      case 'descriptionTitle':
        return 'subtitle1';
      default:
        return variant;
    }
  };
  
  const typographyVariant = getTypographyVariant(variant);
  const variantStyles = typography.variants[typographyVariant];
  
  const textColor = color || (
    variant === 'headerTitle' ? theme.colors.primary :
    variant === 'title' ? theme.colors.text.primary :
    variant === 'descriptionTitle' ? theme.colors.text.secondary :
    theme.colors.text.primary
  );
  
  const combinedStyles = StyleSheet.flatten([
    {
      fontFamily: variantStyles.fontFamily,
      fontSize: variantStyles.fontSize,
      fontWeight: variantStyles.fontWeight as TextStyle['fontWeight'],
      lineHeight: variantStyles.lineHeight,
      letterSpacing: variantStyles.letterSpacing,
      color: textColor,
      textAlign: align,
      marginBottom: gutterBottom ? theme.spacing.sm : 0,
    },
    noWrap && {
      flexShrink: 1,
      flexWrap: 'nowrap' as 'nowrap',
    },
    style
  ]) as TextStyle;

  return (
    <RNText style={combinedStyles}>
      {children}
    </RNText>
  );
};
