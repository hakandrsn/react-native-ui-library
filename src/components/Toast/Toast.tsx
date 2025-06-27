import React, { useEffect, useRef } from 'react';
import { Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useTypography } from '../../typography/TypographyContext';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom';

export interface ToastProps {
  visible: boolean;
  message: string;
  variant?: ToastVariant;
  position?: ToastPosition;
  duration?: number;
  onClose?: () => void;
  action?: {
    label: string;
    onPress: () => void;
  };
  style?: StyleProp<ViewStyle>;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  variant = 'info',
  position = 'bottom',
  duration = 3000,
  onClose,
  action,
  style,
}) => {
  const theme = useTheme();
  const typography = useTypography();
  
  // Animation values
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(position === 'top' ? -20 : 20)).current;
  
  // Auto-hide timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Animation configurations
  const showAnimation = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // Reset animation values
    translateY.setValue(position === 'top' ? -20 : 20);
    
    // Run animations
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Set auto-hide timer if duration is provided
    if (duration > 0) {
      timerRef.current = setTimeout(() => {
        hideAnimation();
      }, duration);
    }
  };
  
  const hideAnimation = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: position === 'top' ? -20 : 20,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onClose) {
        onClose();
      }
    });
  };
  
  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      showAnimation();
    } else {
      hideAnimation();
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visible]);
  
  // Get variant color
  const getVariantColor = () => {
    switch (variant) {
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      case 'info':
      default: return theme.colors.info;
    }
  };
  
  // Get position style
  const getPositionStyle = () => {
    return {
      [position]: 16,
    };
  };
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getVariantColor(),
          ...getPositionStyle(),
          opacity,
          transform: [{ translateY }],
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.message,
          {
            fontFamily: typography.fontFamily.primary,
            color: '#fff',
          },
        ]}
      >
        {message}
      </Text>
      
      {action && (
        <TouchableOpacity
          onPress={action.onPress}
          style={styles.actionButton}
        >
          <Text
            style={[
              styles.actionText,
              {
                fontFamily: typography.fontFamily.primary,
                fontWeight: '500',
                color: '#fff',
              },
            ]}
          >
            {action.label}
          </Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1000,
  },
  message: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  actionButton: {
    marginLeft: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: 14,
    textTransform: 'uppercase',
  },
});
