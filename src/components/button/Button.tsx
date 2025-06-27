import React from 'react';
import type { ReactNode } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import type { ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useTypography } from '../../typography/TypographyContext';
import { getButtonStyles } from './Button.styles';
import type { ButtonColor, ButtonSize, ButtonVariant } from './Button.styles';

interface ButtonProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  children,
  style,
  onPress
}) => {
  const theme = useTheme();
  const typography = useTypography();
  
  // Button stillerini al
  const styles = getButtonStyles({
    variant,
    color,
    size,
    fullWidth,
    disabled,
    theme,
    typography
  });
  
  const buttonStyle = StyleSheet.flatten([styles.container, style]);
  const textStyle = styles.text;

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {startIcon && <View style={{ marginRight: 8 }}>{startIcon}</View>}
      {typeof children === 'string' ? 
        <Text style={textStyle}>{children}</Text> : 
        children
      }
      {endIcon && <View style={{ marginLeft: 8 }}>{endIcon}</View>}
    </TouchableOpacity>
  );
};