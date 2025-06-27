import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { View, PanResponder, Animated, StyleSheet, Text } from 'react-native';
import type { StyleProp, ViewStyle, LayoutChangeEvent } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  disabled?: boolean;
  showValue?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  onChange?: (value: number) => void;
  onChangeComplete?: (value: number) => void;
  style?: StyleProp<ViewStyle>;
  trackHeight?: number;
  thumbSize?: number;
  loading?: boolean;
  vertical?: boolean;
  height?: number;
  allowTap?: boolean;
  onTap?: (value: number) => Promise<void> | void;
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = 0,
  disabled = false,
  showValue = false,
  color = 'primary',
  onChange,
  onChangeComplete,
  style,
  trackHeight = 4,
  thumbSize = 20,
  loading = false,
  vertical = false,
  height = 200,
  allowTap = true,
  onTap,
}) => {
  const theme = useTheme();
  
  // Track layout and position for calculations
  const [trackLayout, setTrackLayout] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const trackRef = useRef<View>(null);
  
  // Animation value for the thumb position
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  // Loading state for async operations
  const [isLoading, setIsLoading] = useState(loading);
  
  // Internal value state for uncontrolled component
  const [internalValue, setInternalValue] = useState(
    Math.max(min, Math.min(max, defaultValue))
  );
  
  // Current value - either controlled or internal
  const currentValue = useMemo(() => {
    return typeof controlledValue !== 'undefined' ? controlledValue : internalValue;
  }, [controlledValue, internalValue]);
  
  
  // Calculate the position percentage based on value - memoized for performance
  const valueToPosition = useCallback((val: number) => {
    if (vertical) {
      // Dikey mod için - yukarıdan aşağıya değer artar
      return ((max - val) / (max - min)) * trackLayout.height;
    } else {
      // Yatay mod için - soldan sağa değer artar
      return ((val - min) / (max - min)) * trackLayout.width;
    }
  }, [min, max, vertical, trackLayout.width, trackLayout.height]);
  
  // Calculate the value based on position - memoized for performance
  const positionToValue = useCallback((position: number) => {
    if ((vertical && trackLayout.height <= 0) || (!vertical && trackLayout.width <= 0)) {
      return min;
    }
    
    let val;
    if (vertical) {
      // Dikey mod için - yukarıdan aşağıya değer artar
      val = max - (position / trackLayout.height) * (max - min);
    } else {
      // Yatay mod için - soldan sağa değer artar
      val = min + (position / trackLayout.width) * (max - min);
    }
    
    // Apply step
    if (step > 0) {
      val = Math.round(val / step) * step;
    }
    
    return Math.max(min, Math.min(max, val));
  }, [min, max, step, vertical, trackLayout.width, trackLayout.height]);
  
  // Handle track layout changes
  const handleTrackLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    
    // Get the absolute position of the track
    if (trackRef.current) {
      trackRef.current.measure((_x, _y, _width, _height, pageX, pageY) => {
        setTrackLayout({ width, height, x: pageX, y: pageY });
      });
    }
  }, []);
  
  // Update animated value when controlled value or track dimensions change
  useEffect(() => {
    if ((vertical && trackLayout.height > 0) || (!vertical && trackLayout.width > 0)) {
      animatedValue.setValue(valueToPosition(currentValue));
    }
  }, [currentValue, valueToPosition, trackLayout.width, trackLayout.height, vertical]);
  
  // Update loading state when prop changes
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  
  // Handle tap on track - async operation support
  const handleTrackTap = useCallback(async (event: any) => {
    if (disabled || !allowTap || isLoading) return;
    
    // Get tap position relative to track
    const pageX = event.nativeEvent.pageX;
    const pageY = event.nativeEvent.pageY;
    
    let position;
    if (vertical) {
      position = Math.max(0, Math.min(trackLayout.height, pageY - trackLayout.y));
    } else {
      position = Math.max(0, Math.min(trackLayout.width, pageX - trackLayout.x));
    }
    
    const newValue = positionToValue(position);
    
    // Set loading state if onTap is provided
    if (onTap) {
      setIsLoading(true);
      try {
        await onTap(newValue);
      } finally {
        setIsLoading(false);
      }
    }
    
    // Update value
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    
    // Animate thumb to new position
    animatedValue.setValue(position);
    
    if (onChange) {
      onChange(newValue);
    }
    
    if (onChangeComplete) {
      onChangeComplete(newValue);
    }
  }, [disabled, allowTap, isLoading, vertical, trackLayout, positionToValue, onTap, controlledValue, onChange, onChangeComplete]);
  
  // Pan responder for thumb dragging - memoized for performance
  const panResponder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled && !isLoading,
      onMoveShouldSetPanResponder: () => !disabled && !isLoading,
      onPanResponderGrant: () => {
        // Sürükleme başladı
      },
      onPanResponderMove: (_, gestureState) => {
        // Calculate position relative to the track
        let newPosition;
        
        if (vertical) {
          // Dikey sürükleme - yukarı/aşağı
          newPosition = Math.max(
            0, 
            Math.min(
              trackLayout.height, 
              gestureState.moveY - trackLayout.y
            )
          );
        } else {
          // Yatay sürükleme - sol/sağ
          newPosition = Math.max(
            0, 
            Math.min(
              trackLayout.width, 
              gestureState.moveX - trackLayout.x
            )
          );
        }
        
        animatedValue.setValue(newPosition);
        
        const newValue = positionToValue(newPosition);
        
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        
        if (onChange) {
          onChange(newValue);
        }
      },
      onPanResponderRelease: () => {
        // Sürükleme bitti
        
        if (onChangeComplete) {
          onChangeComplete(currentValue);
        }
      },
    });
  }, [disabled, isLoading, vertical, trackLayout, positionToValue, controlledValue, onChange, onChangeComplete, currentValue]);
  
  return (
    <View style={[styles.container, style]}>
      <View
        ref={trackRef}
        onLayout={handleTrackLayout}
        style={[
          styles.trackContainer,
          vertical && { height, width: trackHeight },
          !vertical && { height: 30 }
        ]}
        // Track'e tıklama işlevi
        onTouchStart={allowTap ? handleTrackTap : undefined}
      >
        {/* Background Track */}
        <View
          style={[
            styles.track,
            vertical ? {
              width: trackHeight,
              height: '100%',
              borderRadius: trackHeight / 2,
              backgroundColor: disabled ? theme.colors.text.disabled : theme.colors.text.secondary,
            } : {
              height: trackHeight,
              borderRadius: trackHeight / 2,
              backgroundColor: disabled ? theme.colors.text.disabled : theme.colors.text.secondary,
            },
          ]}
        />
        
        {/* Active Track */}
        <Animated.View
          style={[
            styles.activeTrack,
            vertical ? {
              width: trackHeight,
              borderRadius: trackHeight / 2,
              backgroundColor: disabled ? theme.colors.text.disabled : theme.colors[color],
              height: animatedValue,
            } : {
              height: trackHeight,
              borderRadius: trackHeight / 2,
              backgroundColor: disabled ? theme.colors.text.disabled : theme.colors[color],
              width: animatedValue,
            },
          ]}
        />
        
        {/* Thumb ve dokunma alanı */}
        <Animated.View
          style={[
            styles.thumbContainer,
            vertical ? {
              transform: [
                {
                  translateY: Animated.subtract(
                    animatedValue,
                    thumbSize / 2
                  ),
                },
              ],
            } : {
              transform: [
                {
                  translateX: Animated.subtract(
                    animatedValue,
                    thumbSize / 2
                  ),
                },
              ],
            },
          ]}
        >
          <View
            {...panResponder.panHandlers}
            style={[
              styles.thumb,
              {
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbSize / 2,
                backgroundColor: disabled ? theme.colors.text.disabled : theme.colors[color],
                opacity: disabled ? 0.5 : 1,
              },
              isLoading && styles.thumbLoading,
            ]}
          />
        </Animated.View>
      </View>
      
      {showValue && (
        <Text style={styles.valueText}>
          {currentValue.toFixed(step < 1 ? 1 : 0)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 8,
  },
  trackContainer: {
    height: 30,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    width: '100%',
    position: 'absolute',
  },
  activeTrack: {
    position: 'absolute',
  },
  thumbContainer: {
    position: 'absolute',
    // Genişletilmiş dokunma alanı için
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    // Thumb'un ortalanması için negatif margin
    marginLeft: -22,
  },
  thumb: {
    position: 'absolute',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  thumbLoading: {
    opacity: 0.7,
    // Yükleme durumunda titreme animasyonu için
    transform: [{ scale: 0.9 }],
  },
  valueText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
});
