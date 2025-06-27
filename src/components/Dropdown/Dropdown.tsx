import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  ScrollView, 
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useTypography } from '../../typography/TypographyContext';

export interface DropdownItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  items: DropdownItem[];
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  onChange?: (value: string | number) => void;
  style?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  variant?: 'outlined' | 'filled' | 'standard';
  fullWidth?: boolean;
  renderItem?: (item: DropdownItem, isSelected: boolean) => React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  value: controlledValue,
  defaultValue,
  placeholder = 'Select an option',
  disabled = false,
  label,
  onChange,
  style,
  dropdownStyle,
  color = 'primary',
  variant = 'outlined',
  fullWidth = false,
  renderItem,
}) => {
  const theme = useTheme();
  const typography = useTypography();
  
  // Reference to the dropdown button for positioning
  const buttonRef = useRef<View>(null);
  const [buttonLayout, setButtonLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  // State for dropdown visibility
  const [isOpen, setIsOpen] = useState(false);
  
  // Animation value for dropdown
  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  
  // Internal value state for uncontrolled component
  const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue);
  
  // Current value (controlled or uncontrolled)
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  
  // Get selected item
  const selectedItem = items.find(item => item.value === currentValue);
  
  // Handle item selection
  const handleSelect = (item: DropdownItem) => {
    if (controlledValue === undefined) {
      setInternalValue(item.value);
    }
    
    if (onChange) {
      onChange(item.value);
    }
    
    closeDropdown();
  };
  
  // Open dropdown
  const openDropdown = () => {
    if (disabled) return;
    
    buttonRef.current?.measure((_, __, width, height, pageX, pageY) => {
      setButtonLayout({ x: pageX, y: pageY, width, height });
      setIsOpen(true);
      
      Animated.timing(dropdownAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };
  
  // Close dropdown
  const closeDropdown = () => {
    Animated.timing(dropdownAnimation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(false);
    });
  };
  
  // Get container styles based on variant
  const getContainerStyles = () => {
    const baseStyles: ViewStyle = {
      borderRadius: theme.borderRadius.md,
      width: fullWidth ? '100%' : undefined,
      opacity: disabled ? 0.7 : 1,
    };
    
    switch (variant) {
      case 'filled':
        return {
          ...baseStyles,
          backgroundColor: disabled ? '#F5F5F5' : `${theme.colors[color]}10`,
          borderWidth: 0,
          paddingHorizontal: 16,
          paddingVertical: 12,
        };
      case 'standard':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: disabled ? theme.colors.text.disabled : theme.colors[color],
          paddingHorizontal: 0,
          paddingVertical: 8,
          borderRadius: 0,
        };
      case 'outlined':
      default:
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? theme.colors.text.disabled : theme.colors[color],
          paddingHorizontal: 16,
          paddingVertical: 12,
        };
    }
  };
  
  // Render dropdown item
  const renderDropdownItem = (item: DropdownItem, isSelected: boolean) => {
    if (renderItem) {
      return renderItem(item, isSelected);
    }
    
    return (
      <View style={styles.itemContent}>
        {item.icon && <View style={styles.itemIcon}>{item.icon}</View>}
        <Text
          style={[
            styles.itemText,
            {
              fontFamily: typography.fontFamily.primary,
              color: isSelected ? theme.colors[color] : theme.colors.text.primary,
              fontWeight: isSelected ? '500' : 'normal',
            },
          ]}
        >
          {item.label}
        </Text>
        {isSelected && (
          <View
            style={[
              styles.selectedIndicator,
              { backgroundColor: theme.colors[color] },
            ]}
          />
        )}
      </View>
    );
  };
  
  return (
    <View style={[styles.container, fullWidth && { width: '100%' }, style]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              fontFamily: typography.fontFamily.primary,
              color: disabled ? theme.colors.text.disabled : theme.colors.text.secondary,
            },
          ]}
        >
          {label}
        </Text>
      )}
      
      <TouchableOpacity
        ref={buttonRef}
        activeOpacity={0.7}
        onPress={openDropdown}
        disabled={disabled}
        style={[
          styles.button,
          getContainerStyles(),
        ]}
      >
        <Text
          style={[
            styles.selectedText,
            {
              fontFamily: typography.fontFamily.primary,
              color: selectedItem
                ? theme.colors.text.primary
                : theme.colors.text.secondary,
            },
          ]}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        
        <View
          style={[
            styles.arrow,
            {
              borderTopColor: disabled
                ? theme.colors.text.disabled
                : theme.colors.text.secondary,
            },
          ]}
        />
      </TouchableOpacity>
      
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={closeDropdown}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeDropdown}
        >
          <Animated.View
            style={[
              styles.dropdown,
              {
                top: buttonLayout.y + buttonLayout.height + 4,
                left: buttonLayout.x,
                width: fullWidth ? '90%' : buttonLayout.width,
                maxWidth: Dimensions.get('window').width * 0.9,
                backgroundColor: '#FFFFFF',
                borderRadius: theme.borderRadius.md,
                opacity: dropdownAnimation,
                transform: [
                  {
                    translateY: dropdownAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-10, 0],
                    }),
                  },
                ],
                ...theme.shadows.md,
              },
              dropdownStyle,
            ]}
          >
            <ScrollView
              style={[
                styles.dropdownScroll,
                { maxHeight: Dimensions.get('window').height * 0.4 },
              ]}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              {items.map((item) => (
                <TouchableOpacity
                  key={item.value.toString()}
                  style={styles.item}
                  onPress={() => handleSelect(item)}
                >
                  {renderDropdownItem(item, item.value === currentValue)}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
  },
  selectedText: {
    fontSize: 16,
    flex: 1,
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginLeft: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdown: {
    position: 'absolute',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1000,
  },
  dropdownScroll: {
    flexGrow: 0,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
});
