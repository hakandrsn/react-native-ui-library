import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import type { ReactNode } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  FlatList, 
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import type { StyleProp, ViewStyle, TextStyle, PanResponderGestureState } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useTypography } from '../../typography/TypographyContext';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onChange?: (value: string | number) => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  
  // Yeni özellikler
  enableDrag?: boolean; // Sürükleme özelliğini etkinleştirme/devre dışı bırakma
  customIndicator?: ReactNode; // Seçili öğe için özel gösterge (dot)
  animationDuration?: number; // Animasyon süresi
  modalContentStyle?: StyleProp<ViewStyle>; // Modal içerik stili
  optionContainerStyle?: StyleProp<ViewStyle>; // Seçenek container stili
  optionTextStyle?: StyleProp<TextStyle>; // Seçenek metin stili
  closeOnSelect?: boolean; // Seçim yapıldığında modalı otomatik kapatma
  onOpen?: () => void; // Modal açıldığında çağrılacak fonksiyon
  onClose?: () => void; // Modal kapandığında çağrılacak fonksiyon
}

export const Select: React.FC<SelectProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  placeholder = 'Select an option',
  disabled = false,
  error = false,
  helperText,
  onChange,
  style,
  labelStyle,
  color = 'primary',
  // Yeni özellikler için varsayılan değerler
  enableDrag = false,
  customIndicator,
  animationDuration = 300,
  modalContentStyle,
  optionContainerStyle,
  optionTextStyle,
  closeOnSelect = true,
  onOpen,
  onClose,
}) => {
  const theme = useTheme();
  const typography = useTypography();
  
  // State for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  
  // Animation value for modal
  const modalAnimation = useRef(new Animated.Value(0)).current;
  
  // Internal value state for uncontrolled component
  const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue);
  
  // Modal position için state (sürükleme özelliği için)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalPositionRef = useRef({ top: 0, left: 0 });
  
  // Current value (controlled or uncontrolled)
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  
  // Seçili option için useMemo kullanarak performans iyileştirmesi
  const selectedOption = useMemo(() => {
    return options.find(option => option.value === currentValue);
  }, [options, currentValue]);
  
  // useEffect ile değer değişikliklerini izleme
  useEffect(() => {
    if (defaultValue !== undefined && controlledValue === undefined) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue, controlledValue]);
  
  // PanResponder için sürükleme özelliği
  const panResponder = useMemo(() => {
    if (!enableDrag) return PanResponder.create({});
    
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
        const { dx, dy } = gestureState;
        setModalPosition({
          top: modalPositionRef.current.top + dy,
          left: modalPositionRef.current.left + dx,
        });
      },
      onPanResponderRelease: () => {
        modalPositionRef.current = modalPosition;
      }
    });
  }, [enableDrag, modalPosition]);
  
  // Handle option selection - useCallback ile performans iyileştirmesi
  const handleSelect = useCallback((option: SelectOption) => {
    if (option.disabled) return;
    
    if (controlledValue === undefined) {
      setInternalValue(option.value);
    }
    
    if (onChange) {
      onChange(option.value);
    }
    
    if (closeOnSelect) {
      closeModal();
    }
  }, [controlledValue, onChange, closeOnSelect]);
  
  // Open modal - useCallback ile performans iyileştirmesi
  const openModal = useCallback(() => {
    if (disabled) return;
    
    setModalVisible(true);
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
    
    // Modal açıldığında callback çağırma
    if (onOpen) {
      onOpen();
    }
  }, [disabled, modalAnimation, animationDuration, onOpen]);
  
  // Close modal - useCallback ile performans iyileştirmesi
  const closeModal = useCallback(() => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: animationDuration * 0.7, // Kapanma animasyonu daha hızlı
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      
      // Modal kapandığında callback çağırma
      if (onClose) {
        onClose();
      }
    });
  }, [modalAnimation, animationDuration, onClose]);
  
  // Get border color based on state - useMemo ile performans iyileştirmesi
  const borderColor = useMemo(() => {
    if (error) return theme.colors.error;
    if (modalVisible) return theme.colors[color];
    return theme.colors.text.secondary;
  }, [error, modalVisible, theme.colors, color]);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={openModal}
        disabled={disabled}
        style={[
          styles.selectButton,
          {
            borderColor: borderColor,
            borderRadius: theme.borderRadius.md,
            backgroundColor: disabled ? '#F5F5F5' : '#FFFFFF',
            opacity: disabled ? 0.7 : 1,
          },
          style,
        ]}
      >
        <Text
          style={[
            styles.selectText,
            {
              fontFamily: typography.fontFamily.primary,
              color: selectedOption 
                ? theme.colors.text.primary 
                : theme.colors.text.secondary,
            },
            labelStyle,
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        
        <View style={styles.arrow}>
          <View
            style={[
              styles.arrowDown,
              {
                borderTopColor: theme.colors.text.secondary,
              },
            ]}
          />
        </View>
      </TouchableOpacity>
      
      {helperText && (
        <Text
          style={[
            styles.helperText,
            {
              color: error ? theme.colors.error : theme.colors.text.secondary,
              fontFamily: typography.fontFamily.primary,
            },
          ]}
        >
          {helperText}
        </Text>
      )}
      
      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeModal}
        >
          <Animated.View
            {...(enableDrag ? panResponder.panHandlers : {})}
            style={[
              styles.modalContent,
              {
                backgroundColor: '#FFFFFF',
                borderRadius: theme.borderRadius.md,
                opacity: modalAnimation,
                top: enableDrag ? modalPosition.top : undefined,
                left: enableDrag ? modalPosition.left : undefined,
                transform: [
                  {
                    translateY: modalAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
              modalContentStyle,
            ]}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.disabled && styles.disabledOption,
                    item.value === currentValue && {
                      backgroundColor: `${theme.colors[color]}20`,
                    },
                    optionContainerStyle,
                  ]}
                  onPress={() => handleSelect(item)}
                  disabled={item.disabled}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        fontFamily: typography.fontFamily.primary,
                        color: item.disabled
                          ? theme.colors.text.disabled
                          : theme.colors.text.primary,
                      },
                      item.value === currentValue && {
                        color: theme.colors[color],
                        fontWeight: '500',
                      },
                      optionTextStyle,
                    ]}
                  >
                    {item.label}
                  </Text>
                  
                  {item.value === currentValue && (
                    customIndicator ? (
                      <View style={styles.selectedIndicator}>
                        {customIndicator}
                      </View>
                    ) : (
                      <View
                        style={[
                          styles.selectedIndicator,
                          {
                            backgroundColor: theme.colors[color],
                          },
                        ]}
                      />
                    )
                  )}
                </TouchableOpacity>
              )}
              style={styles.optionsList}
            />
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selectButton: {
    height: 48,
    paddingHorizontal: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 16,
    flex: 1,
  },
  arrow: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.9,
    maxHeight: 300,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionsList: {
    flexGrow: 0,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  disabledOption: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 16,
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
