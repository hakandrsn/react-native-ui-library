import type { Typography } from './types';

export const defaultTypography: Typography = {
  fontFamily: {
    primary: "Roboto",
    secondary: "Georgia",
    monospace: "Roboto-Mono"
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24
  },
  lineHeight: {
    xs: 1.1,
    sm: 1.25,
    md: 1.5,
    lg: 1.75,
    xl: 2
  },    
  letterSpacing: {
    xs: -0.05,
    sm: 0,
    md: 0.1,
    lg: 0.15
  },
  variants: {
    h1: {
      fontFamily: "Roboto",
      fontSize: 40,
      fontWeight: "300",
      lineHeight: 48
    },
    h2: {
      fontFamily: "Roboto",
      fontSize: 32,
      fontWeight: "300",
      lineHeight: 38
    },
    h3: {
      fontFamily: "Roboto",
      fontSize: 28,
      fontWeight: "400",
      lineHeight: 34
    },
    h4: {
      fontFamily: "Roboto",
      fontSize: 24,
      fontWeight: "400",
      lineHeight: 29
    },
    h5: {
      fontFamily: "Roboto",
      fontSize: 20,
      fontWeight: "400",
      lineHeight: 24
    },
    h6: {
      fontFamily: "Roboto",
      fontSize: 16,
      fontWeight: "500",
      lineHeight: 19
    },
    subtitle1: {
      fontFamily: "Roboto",
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 28,
      letterSpacing: 0.15
    },
    subtitle2: {
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: "500",
      lineHeight: 22,
      letterSpacing: 0.1
    },
    body1: {
      fontFamily: "Roboto",
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
      letterSpacing: 0.15
    },
    body2: {
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20,
      letterSpacing: 0.17
    },
    button: {
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: "500",
      lineHeight: 24,
      letterSpacing: 0.4,
      textTransform: "uppercase"
    },
    caption: {
      fontFamily: "Roboto",
      fontSize: 12,
      fontWeight: "400",
      lineHeight: 20,
      letterSpacing: 0.4
    },
    overline: {
      fontFamily: "Roboto",
      fontSize: 12,
      fontWeight: "400",
      lineHeight: 32,
      letterSpacing: 1,
      textTransform: "uppercase"
    }
  }
};
