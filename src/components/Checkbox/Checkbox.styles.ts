import type { ViewStyle, TextStyle } from 'react-native';
import type { Theme } from '../../theme/types';
import type { Typography } from '../../typography/types';

export type CheckboxSize = 'small' | 'medium' | 'large';
export type CheckboxColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

interface CheckboxStyleProps {
  size: CheckboxSize;
  color: CheckboxColor;
  disabled: boolean;
  theme: Theme;
  typography: Typography;
}

export interface CheckboxStyles {
  container: ViewStyle;
  checkbox: ViewStyle;
  checkmark: TextStyle;
  label: TextStyle;
  checkedCheckbox: ViewStyle;
}

export const getCheckboxStyles = ({
  size,
  color,
  disabled,
  theme,
  typography
}: CheckboxStyleProps): CheckboxStyles => {
  // Base container styles
  const container: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: disabled ? 0.5 : 1,
  };

  // Size values
  const checkboxSize = size === 'small' ? 16 : size === 'medium' ? 20 : 24;
  const fontSize = size === 'small' ? 10 : size === 'medium' ? 14 : 18;

  // Checkbox styles
  const checkbox: ViewStyle = {
    width: checkboxSize,
    height: checkboxSize,
    borderRadius: theme.borderRadius.xs,
    borderWidth: 2,
    borderColor: theme.colors[color],
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Label styles
  const label: TextStyle = {
    marginLeft: theme.spacing.sm,
    fontFamily: typography.variants.body2.fontFamily,
    fontSize: size === 'small' ? 14 : size === 'medium' ? 16 : 18,
    fontWeight: typography.variants.body2.fontWeight as TextStyle['fontWeight'],
    lineHeight: typography.variants.body2.lineHeight,
    color: disabled ? theme.colors.text.disabled : theme.colors.text.primary,
  };

  // Checked state styles
  const checkedCheckbox: ViewStyle = {
    backgroundColor: theme.colors[color],
    borderColor: theme.colors[color],
  };

  // Checkmark styles
  const checkmark: TextStyle = {
    color: '#fff',
    fontSize: fontSize,
    textAlign: 'center',
  };

  return {
    container,
    checkbox,
    label,
    checkedCheckbox,
    checkmark,
  };
};
