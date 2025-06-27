import React from 'react';
import type { ReactNode } from 'react';
import { Text, StyleSheet } from 'react-native';
import type { TextStyle, StyleProp } from 'react-native';
import { useTypography } from '../../typography/TypographyContext';
import { useTheme } from '../../theme/ThemeContext';

export type TypographyVariant = 
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
  | 'overline';

interface TypographyProps {
  variant?: TypographyVariant;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  noWrap?: boolean;
  gutterBottom?: boolean;
  style?: StyleProp<TextStyle>;
  children: ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color,
  align = 'left',
  noWrap = false,
  gutterBottom = false,
  style = {},
  children
}) => {
  const typography = useTypography();
  const theme = useTheme();
  const variantStyles = typography.variants[variant];
  
  const textColor = color || theme.colors.text.primary;
  
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
    <Text style={combinedStyles}>
      {children}
    </Text>
  );
};
