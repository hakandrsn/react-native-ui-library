import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useTypography } from '../../typography/TypographyContext';

export interface AvatarProps {
  size?: 'small' | 'medium' | 'large' | number;
  variant?: 'circular' | 'rounded' | 'square';
  src?: ImageSourcePropType;
  alt?: string;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  style?: StyleProp<ViewStyle>;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 'medium',
  variant = 'circular',
  src,
  alt = '',
  color = 'primary',
  style,
}) => {
  const theme = useTheme();
  const typography = useTypography();
  
  // Size calculations
  const getSize = () => {
    if (typeof size === 'number') return size;
    
    switch (size) {
      case 'small': return 32;
      case 'large': return 56;
      case 'medium':
      default: return 40;
    }
  };
  
  // Border radius based on variant
  const getBorderRadius = (avatarSize: number) => {
    switch (variant) {
      case 'rounded': return theme.borderRadius.md;
      case 'square': return 0;
      case 'circular':
      default: return avatarSize / 2;
    }
  };
  
  // Get initials from alt text
  const getInitials = () => {
    if (!alt) return '';
    
    return alt
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };
  
  const avatarSize = getSize();
  const borderRadius = getBorderRadius(avatarSize);
  const initials = getInitials();
  const fontSize = avatarSize * 0.4;
  
  return (
    <View
      style={[
        styles.container,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius,
          backgroundColor: src ? 'transparent' : theme.colors[color],
        },
        style,
      ]}
    >
      {src ? (
        <Image
          source={src}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius,
          }}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={{
            color: '#fff',
            fontSize,
            fontFamily: typography.fontFamily.primary,
            fontWeight: '500',
          }}
        >
          {initials}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
