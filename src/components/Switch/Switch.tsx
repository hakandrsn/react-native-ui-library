import React, { useState } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export interface SwitchProps {
  value?: boolean;
  defaultValue?: boolean;
  disabled?: boolean;
  onValueChange?: (value: boolean) => void;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  style?: StyleProp<ViewStyle>;
}

export const Switch: React.FC<SwitchProps> = ({
  value: controlledValue,
  defaultValue = false,
  disabled = false,
  onValueChange,
  size = 'medium',
  color = 'primary',
  style,
}) => {
  const theme = useTheme();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isOn = controlledValue !== undefined ? controlledValue : internalValue;
  
  // Animation value for the thumb
  const [animatedValue] = useState(new Animated.Value(isOn ? 1 : 0));
  
  // Size calculations based on the size prop
  const getSizes = () => {
    switch (size) {
      case 'small':
        return {
          width: 36,
          height: 20,
          thumbSize: 16,
          thumbOffset: 16,
        };
      case 'large':
        return {
          width: 56,
          height: 30,
          thumbSize: 26,
          thumbOffset: 26,
        };
      case 'medium':
      default:
        return {
          width: 46,
          height: 24,
          thumbSize: 20,
          thumbOffset: 22,
        };
    }
  };
  
  const { width, height, thumbSize, thumbOffset } = getSizes();
  
  // Handle toggle
  const handleToggle = () => {
    if (disabled) return;
    
    const newValue = !isOn;
    
    // Animate the thumb
    Animated.timing(animatedValue, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    
    // Update internal state if uncontrolled
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    
    // Call the callback
    if (onValueChange) {
      onValueChange(newValue);
    }
  };
  
  // Interpolate the animated value for the thumb position
  const thumbPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, thumbOffset],
  });
  
  // Get colors based on state
  const getBackgroundColor = () => {
    if (disabled) {
      return theme.colors.text.disabled;
    }
    return isOn ? theme.colors[color] : '#E0E0E0';
  };
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleToggle}
      disabled={disabled}
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius: height / 2,
          backgroundColor: getBackgroundColor(),
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            transform: [{ translateX: thumbPosition }],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  thumb: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
