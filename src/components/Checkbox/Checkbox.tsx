import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useTypography } from '../../typography/TypographyContext';
import { getCheckboxStyles } from './Checkbox.styles';
import type { CheckboxColor, CheckboxSize } from './Checkbox.styles';

interface CheckboxProps {
  color?: CheckboxColor;
  size?: CheckboxSize;
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  color = 'primary',
  size = 'medium',
  label,
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  onChange,
  style,
  labelStyle,
}) => {
  const theme = useTheme();
  const typography = useTypography();
  
  // Kontrollü veya kontrolsüz mod için state yönetimi
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;
  
  // Checkbox'a tıklandığında
  const handlePress = () => {
    if (disabled) return;
    
    if (controlledChecked === undefined) {
      setInternalChecked(!internalChecked);
    }
    
    if (onChange) {
      onChange(!isChecked);
    }
  };
  
  // Checkbox stillerini al
  const styles = getCheckboxStyles({
    size,
    color,
    disabled,
    theme,
    typography
  });
  
  // Stil birleştirme
  const containerStyle = [styles.container, style];
  const checkboxStyle = [styles.checkbox, isChecked && styles.checkedCheckbox];
  const textStyle = [styles.label, labelStyle];

  return (
    <TouchableOpacity 
      style={containerStyle} 
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={checkboxStyle}>
        {isChecked && (
          <Text style={styles.checkmark}>
            ✓
          </Text>
        )}
      </View>
      {label && (
        typeof label === 'string' ? 
          <Text style={textStyle}>{label}</Text> : 
          label
      )}
    </TouchableOpacity>
  );
};
