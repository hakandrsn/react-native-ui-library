import type { TextStyle } from 'react-native';

export interface FontWeight {
  light: number;
  regular: number;
  medium: number;
  semiBold: number;
  bold: number;
}

export interface FontSize { 
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface LineHeight {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface LetterSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
}

export interface FontFamily {
  primary: string;
  secondary: string;
  monospace: string;
}

export interface TypographyVariant {
  fontFamily: string;
  fontSize: number;
  fontWeight: string | number;
  lineHeight: number;
  letterSpacing?: number;
  textTransform?: TextStyle['textTransform'];
}

export interface Typography {
  fontFamily: FontFamily;
  fontWeight: FontWeight;
  fontSize: FontSize;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
  variants: {
    h1: TypographyVariant;
    h2: TypographyVariant;
    h3: TypographyVariant;
    h4: TypographyVariant;
    h5: TypographyVariant;
    h6: TypographyVariant;
    subtitle1: TypographyVariant;
    subtitle2: TypographyVariant;
    body1: TypographyVariant;
    body2: TypographyVariant;
    button: TypographyVariant;
    caption: TypographyVariant;
    overline: TypographyVariant;
  };
}

export interface TypographyOptions {
  fontFamily?: Partial<FontFamily>;
  fontWeight?: Partial<FontWeight>;
  fontSize?: Partial<FontSize>;
  lineHeight?: Partial<LineHeight>;
  letterSpacing?: Partial<LetterSpacing>;
  variants?: Partial<{
    h1: Partial<TypographyVariant>;
    h2: Partial<TypographyVariant>;
    h3: Partial<TypographyVariant>;
    h4: Partial<TypographyVariant>;
    h5: Partial<TypographyVariant>;
    h6: Partial<TypographyVariant>;
    subtitle1: Partial<TypographyVariant>;
    subtitle2: Partial<TypographyVariant>;
    body1: Partial<TypographyVariant>;
    body2: Partial<TypographyVariant>;
    button: Partial<TypographyVariant>;
    caption: Partial<TypographyVariant>;
    overline: Partial<TypographyVariant>;
  }>;
}
