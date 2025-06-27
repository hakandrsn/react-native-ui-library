
export interface ColorPalette {
  primary: string;
  secondary: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  light: string;
  dark: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface BorderRadius {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  round: string;
}

export interface Shadow {
  sm: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  md: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  lg: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}

export interface BreakPoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ZIndex {
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
}

export interface ThemeOptions {
  colors: Partial<ColorPalette>;
  spacing?: Partial<Spacing>;
  borderRadius?: Partial<BorderRadius>;
  shadows?: Partial<Shadow>;
  breakpoints?: Partial<BreakPoints>;
  zIndex?: Partial<ZIndex>;
}

export interface Theme {
  colors: ColorPalette;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadow;
  breakpoints: BreakPoints;
  zIndex: ZIndex;
}
