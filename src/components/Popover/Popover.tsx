import React, { useState, useRef, useEffect } from 'react';
import type { ReactNode, FC } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import type { ViewStyle, LayoutChangeEvent } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  isVisible: boolean;
  onClose: () => void;
  children?: ReactNode;
  content: ReactNode;
  placement?: PopoverPlacement;
  anchorRef: React.RefObject<any>;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  animationDuration?: number;
  withArrow?: boolean;
  closeOnBackdropPress?: boolean;
}

export const Popover: FC<PopoverProps> = ({
  isVisible,
  onClose,
  children,
  content,
  placement = 'bottom',
  anchorRef,
  containerStyle,
  contentStyle,
  animationDuration = 200,
  withArrow = true,
  closeOnBackdropPress = true,
}) => {
  const theme = useTheme();
  const [anchorLayout, setAnchorLayout] = useState<{ x: number; y: number; width: number; height: number }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  const [contentLayout, setContentLayout] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0
  });
  const [popoverPosition, setPopoverPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0
  });
  const [arrowPosition, setArrowPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0
  });
  const [isPositioned, setIsPositioned] = useState(false);

  // Animation values
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  const measureLayout = () => {
    if (anchorRef?.current && anchorRef.current.measureInWindow) {
      anchorRef.current.measureInWindow((x: number, y: number, width: number, height: number) => {
        setAnchorLayout({ x, y, width, height });
      });
    }
  };

  const calculatePosition = () => {
    const { width, height } = anchorLayout;
    let positionX = 0;
    let positionY = 0;
    const contentWidth = contentLayout.width || 250; // Use measured width or estimate
    const contentHeight = contentLayout.height || 150; // Use measured height or estimate

    switch (placement) {
      case 'top':
        positionX = anchorLayout.x + (width / 2) - (contentWidth / 2);
        positionY = anchorLayout.y - contentHeight - 10;
        break;
      case 'bottom':
        positionX = anchorLayout.x + (width / 2) - (contentWidth / 2);
        positionY = anchorLayout.y + height + 10;
        break;
      case 'left':
        positionX = anchorLayout.x - contentWidth - 10;
        positionY = anchorLayout.y + (height / 2) - (contentHeight / 2);
        break;
      case 'right':
        positionX = anchorLayout.x + width + 10;
        positionY = anchorLayout.y + (height / 2) - (contentHeight / 2);
        break;
      default:
        positionX = anchorLayout.x + (width / 2) - (contentWidth / 2);
        positionY = anchorLayout.y + height + 10;
    }

    const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

    if (positionX < 10) positionX = 10;
    if (positionX + contentWidth > windowWidth - 10) {
      positionX = windowWidth - contentWidth - 10;
    }

    if (positionY < 10) positionY = 10;
    if (positionY + contentHeight > windowHeight - 10) {
      positionY = windowHeight - contentHeight - 10;
    }

    setPopoverPosition({ top: positionY, left: positionX });

    switch (placement) {
      case 'top':
        setArrowPosition({ top: contentHeight, left: contentWidth / 2 - 8 });
        break;
      case 'bottom':
        setArrowPosition({ top: -8, left: contentWidth / 2 - 8 });
        break;
      case 'left':
        setArrowPosition({ top: contentHeight / 2 - 8, left: contentWidth });
        break;
      case 'right':
        setArrowPosition({ top: contentHeight / 2 - 8, left: -8 });
        break;
    }

    setIsPositioned(true);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Effect to measure and position when visible
  useEffect(() => {
    if (isVisible && anchorRef) {
      measureLayout();
    }
  }, [isVisible, anchorRef]);

  // Effect to calculate position when anchor layout changes
  useEffect(() => {
    if (isVisible && anchorLayout.width > 0 && anchorLayout.height > 0) {
      calculatePosition();
    }
  }, [anchorLayout, isVisible]);

  // Handle close
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.8,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
      setIsPositioned(false);
    });
  };

  // Get arrow style based on placement
  const getArrowStyle = () => {
    const arrowStyle: ViewStyle = {
      position: 'absolute',
      width: 16,
      height: 16,
      backgroundColor: 'white',
      transform: [{ rotate: '45deg' }],
      ...arrowPosition,
    };

    switch (placement) {
      case 'top':
        arrowStyle.borderBottomWidth = 1;
        arrowStyle.borderRightWidth = 1;
        arrowStyle.borderBottomColor = theme.colors.light;
        arrowStyle.borderRightColor = theme.colors.light;
        break;
      case 'bottom':
        arrowStyle.borderTopWidth = 1;
        arrowStyle.borderLeftWidth = 1;
        arrowStyle.borderTopColor = theme.colors.light;
        arrowStyle.borderLeftColor = theme.colors.light;
        break;
      case 'left':
        arrowStyle.borderTopWidth = 1;
        arrowStyle.borderRightWidth = 1;
        arrowStyle.borderTopColor = theme.colors.light;
        arrowStyle.borderRightColor = theme.colors.light;
        break;
      case 'right':
        arrowStyle.borderBottomWidth = 1;
        arrowStyle.borderLeftWidth = 1;
        arrowStyle.borderBottomColor = theme.colors.light;
        arrowStyle.borderLeftColor = theme.colors.light;
        break;
    }

    return arrowStyle;
  };

  return (
    <>
      {children && (
        <View
          onLayout={() => {
            if (isVisible) measureLayout();
          }}
        >
          {children}
        </View>
      )}

      {isVisible && (
        <Modal
          visible={true}
          transparent
          animationType="none"
          onRequestClose={handleClose}
        >
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={closeOnBackdropPress ? handleClose : undefined}
          >
            {isPositioned && (
              <Animated.View
                style={[
                  styles.container,
                  {
                    top: popoverPosition.top,
                    left: popoverPosition.left,
                    opacity,
                    transform: [{ scale }],
                  },
                  containerStyle,
                ]}
                onLayout={(event: LayoutChangeEvent) => {
                  const { width, height } = event.nativeEvent.layout;
                  if (contentLayout.width !== width || contentLayout.height !== height) {
                    setContentLayout({ width, height });
                  }
                }}
              >
                {withArrow && <View style={getArrowStyle()} />}
                <View
                  style={[
                    styles.content,
                    {
                      backgroundColor: 'white',
                      borderRadius: theme.borderRadius.md,
                      ...theme.shadows.md,
                    },
                    contentStyle,
                  ]}
                >
                  {content}
                </View>
              </Animated.View>
            )}
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  container: {
    position: 'absolute',
    zIndex: 1000,
  },
  content: {
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
