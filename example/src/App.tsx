import { useState, useRef } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import type { SelectOption, DropdownItem } from '../../src';
import {
  UIProvider,
  Button,
  Text,
  Checkbox,
  Switch,
  Avatar,
  Slider,
  Toast,
  Select,
  Dropdown,
  Popover,
  createTheme,
  createTypography
} from '@joygame/ui';

// Özel tema oluşturma
const customTheme = createTheme({
  colors: {
    primary: '#FF5722',
    secondary: '#2196F3',
    success: '#4CAF50'
  },
  borderRadius: {
    md: 10
  }
});

// Özel typography oluşturma
const customTypography = createTypography({
  fontFamily: {
    primary: "Roboto",
    secondary: "Poppins"
  },
  variants: {
    h1: {
      fontSize: 28,
      fontWeight: 700
    },
    body1: {
      fontSize: 16
    }
  }
});

export default function App() {
  const [checked, setChecked] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [selectValue, setSelectValue] = useState<string | number>('option1');
  const [dropdownValue, setDropdownValue] = useState<string | number>('item1');
  const [toastVisible, setToastVisible] = useState(false);
  const [sliderOne, setSliderOne] = useState(50);
  const [sliderTwo, setSliderTwo] = useState(50);
  const [sliderThree, setSliderThree] = useState(50);
  
  // Popover state ve ref'leri
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverTopVisible, setPopoverTopVisible] = useState(false);
  const [popoverLeftVisible, setPopoverLeftVisible] = useState(false);
  const [popoverRightVisible, setPopoverRightVisible] = useState(false);
  
  const popoverAnchorRef = useRef(null);
  const popoverTopAnchorRef = useRef(null);
  const popoverLeftAnchorRef = useRef(null);
  const popoverRightAnchorRef = useRef(null);
  
  // Select ve Dropdown için seçenekler
  const selectOptions: SelectOption[] = [
    { label: 'Seçenek 1', value: 'option1' },
    { label: 'Seçenek 2', value: 'option2' },
    { label: 'Seçenek 3', value: 'option3', disabled: true },
    { label: 'Seçenek 4', value: 'option4' },
    { label: 'Seçenek 5', value: 'option5' },
    { label: 'Seçenek 6', value: 'option6' },
  ];
  
  const dropdownItems: DropdownItem[] = [
    { label: 'Öğe 1', value: 'item1' },
    { label: 'Öğe 2', value: 'item2' },
    { label: 'Öğe 3', value: 'item3' },
    { label: 'Öğe 4', value: 'item4' },
  ];

  return (
    <UIProvider theme={customTheme} typography={customTypography}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <Text variant="headerTitle" gutterBottom>JoyGame UI Örneği</Text>

            <Text variant="title" gutterBottom>Farklı Metin Türleri</Text>
            <Text variant="h1" gutterBottom>Başlık 1</Text>
            <Text variant="h2" gutterBottom>Başlık 2</Text>
            <Text variant="body1" gutterBottom>Normal metin içeriği burada yer alır.</Text>
            <Text variant="descriptionTitle" gutterBottom>Açıklama Başlığı</Text>
            <Text variant="body2" gutterBottom>Daha küçük metin içeriği.</Text>

            <View style={styles.section}>
              <Text variant="title" gutterBottom>Butonlar</Text>
              <View style={styles.row}>
                <Button color="primary" style={styles.button}>Primary</Button>
                <Button color="secondary" variant="outlined" style={styles.button}>Secondary</Button>
                <Button color="success" variant="text" style={styles.button}>Success</Button>
              </View>

              <View style={styles.row}>
                <Button size="small" style={styles.button}>Small</Button>
                <Button size="medium" style={styles.button}>Medium</Button>
                <Button size="large" style={styles.button}>Large</Button>
              </View>
            </View>

            <View style={styles.section}>
              <Text variant="title" gutterBottom>Checkbox</Text>
              <View style={styles.row}>
                <Checkbox
                  label="Temel Checkbox"
                  checked={checked}
                  onChange={(isChecked: boolean) => setChecked(isChecked)}
                  style={styles.checkbox}
                />
                <Checkbox
                  label="Secondary"
                  color="secondary"
                  style={styles.checkbox}
                />
                <Checkbox
                  label="Disabled"
                  disabled
                  style={styles.checkbox}
                />
              </View>
            </View>
            
            {/* Switch Bileşeni */}
            <View style={styles.section}>
              <Text variant="title" gutterBottom>Switch</Text>
              <View style={styles.row}>
                <View style={styles.componentWrapper}>
                  <Text variant="body2" gutterBottom>Temel</Text>
                  <Switch 
                    value={switchValue} 
                    onValueChange={setSwitchValue} 
                  />
                </View>
                
                <View style={styles.componentWrapper}>
                  <Text variant="body2" gutterBottom>Secondary</Text>
                  <Switch 
                    value={switchValue} 
                    onValueChange={setSwitchValue} 
                    color="secondary"
                  />
                </View>
                
                <View style={styles.componentWrapper}>
                  <Text variant="body2" gutterBottom>Small</Text>
                  <Switch 
                    value={switchValue} 
                    onValueChange={setSwitchValue} 
                    size="small"
                  />
                </View>
                
                <View style={styles.componentWrapper}>
                  <Text variant="body2" gutterBottom>Large</Text>
                  <Switch 
                    value={switchValue} 
                    onValueChange={setSwitchValue} 
                    size="large"
                  />
                </View>
                
                <View style={styles.componentWrapper}>
                  <Text variant="body2" gutterBottom>Disabled</Text>
                  <Switch 
                    value={true} 
                    onValueChange={() => {}} 
                    disabled
                  />
                </View>
              </View>
            </View>
            
            {/* Avatar Bileşeni */}
            <View style={styles.section}>
              <Text variant="title" gutterBottom>Avatar</Text>
              <View style={styles.row}>
                <View style={styles.componentWrapper}>
                  <Text variant="body2" gutterBottom>İnitials</Text>
                  <Avatar alt="John Doe" size="medium" />
                </View>
                
                <View style={styles.componentWrapper}>
                  <Text variant="body2" gutterBottom>Small</Text>
                  <Avatar alt="Jane Smith" size="small" color="secondary" />
                </View>
                
                <View style={styles.componentWrapper}>
                  <Text variant="body2" gutterBottom>Large</Text>
                  <Avatar alt="Alex Brown" size="large" color="success" />
                </View>
                
                <View style={styles.componentWrapper}>
                  <Text variant="body2" gutterBottom>Square</Text>
                  <Avatar alt="Mike Johnson" variant="square" />
                </View>
                
                <View style={styles.componentWrapper}>
                  <Text variant="body2" gutterBottom>Rounded</Text>
                  <Avatar alt="Lisa Williams" variant="rounded" color="warning" />
                </View>
              </View>
            </View>
            
            {/* Slider Bileşeni */}
            <View style={styles.section}>
              <Text variant="title" gutterBottom>Slider</Text>
              <View style={styles.sliderContainer}>
                <Text variant="body2">Değer: {sliderOne}</Text>
                <Slider
                  value={sliderOne}
                  onChange={setSliderOne}
                  min={0}
                  max={100}
                  step={1}
                  showValue
                  style={styles.slider}
                />
              </View>
              
              <View style={styles.sliderContainer}>
                <Text variant="body2">Secondary</Text>
                <Slider
                  value={sliderTwo}
                  onChange={setSliderTwo}
                  min={0}
                  max={100}
                  step={10}
                  color="secondary"
                  style={styles.slider}
                  allowTap
                />
              </View>
              
              <View style={styles.sliderContainer}>
                <Text variant="body2">Disabled</Text>
                <Slider
                  value={sliderThree}
                  onChange={setSliderThree}
                  min={0}
                  max={100}
                  disabled
                  style={styles.slider}
                />
              </View>
            </View>
            
            {/* Select Bileşeni */}
            <View style={styles.section}>
              <Text variant="title" gutterBottom>Select</Text>
              <View style={styles.formField}>
                <Select
                  options={selectOptions}
                  value={selectValue}
                  onChange={setSelectValue}
                  placeholder="Bir seçenek seçin"
                  style={styles.select}
                />
              </View>
              
              <View style={styles.formField}>
                <Select
                  options={selectOptions}
                  placeholder="Secondary"
                  color="secondary"
                  style={styles.select}
                />
              </View>
              
              <View style={styles.formField}>
                <Select
                  options={selectOptions}
                  placeholder="Error"
                  error
                  helperText="Lütfen bir seçenek seçin"
                  style={styles.select}
                />
              </View>

              <Text variant="body1" gutterBottom style={{marginTop: 10}}>Yeni Özellikler</Text>
              
              <View style={styles.formField}>
                <Select
                  options={selectOptions}
                  placeholder="Sürüklenebilir Select"
                  color="primary"
                  style={styles.select}
                  enableDrag={true}
                  closeOnSelect={true}
                  animationDuration={300}
                  onOpen={() => console.log('Select açıldı')}
                  onClose={() => console.log('Select kapandı')}
                />
              </View>
              
              <View style={styles.formField}>
                <Select
                  options={selectOptions}
                  placeholder="Özel Gösterge"
                  color="secondary"
                  style={styles.select}
                  customIndicator={<View style={{width: 12, height: 12, borderRadius: 6, backgroundColor: '#FF5722'}} />}
                  modalContentStyle={{backgroundColor: '#f5f5f5'}}
                  optionContainerStyle={{borderBottomWidth: 1, borderBottomColor: '#e0e0e0'}}
                  optionTextStyle={{fontWeight: '600'}}
                />
              </View>
            </View>
            
            {/* Dropdown Bileşeni */}
            <View style={styles.section}>
              <Text variant="title" gutterBottom>Dropdown</Text>
              <View style={styles.row}>
                <View style={styles.dropdownContainer}>
                  <Dropdown
                    items={dropdownItems}
                    value={dropdownValue}
                    onChange={setDropdownValue}
                    placeholder="Bir öğe seçin"
                    label="Temel Dropdown"
                    style={styles.dropdown}
                  />
                </View>
                
                <View style={styles.dropdownContainer}>
                  <Dropdown
                    items={dropdownItems}
                    placeholder="Filled Variant"
                    label="Filled"
                    variant="filled"
                    color="secondary"
                    style={styles.dropdown}
                  />
                </View>
              </View>
              
              <View style={styles.row}>
                <View style={styles.dropdownContainer}>
                  <Dropdown
                    items={dropdownItems}
                    placeholder="Standard Variant"
                    label="Standard"
                    variant="standard"
                    color="success"
                    style={styles.dropdown}
                  />
                </View>
              </View>
            </View>
            
            {/* Popover */}
            <View style={styles.section}>
              <Text variant="headerTitle" gutterBottom>Popover</Text>
              <Text variant="body2" gutterBottom>Farklı yerleşim seçenekleri ile Popover bileşeni</Text>
              
              <View style={styles.row}>
                {/* Bottom Placement */}
                <View style={styles.componentWrapper}>
                  <Text variant="descriptionTitle" gutterBottom>Bottom</Text>
                  <View ref={popoverAnchorRef}>
                    <Button
                      onPress={() => setPopoverVisible(true)}
                      variant="contained"
                      color="primary"
                    >
                      Aşağıda Göster
                    </Button>
                  </View>
                  
                  <Popover
                    isVisible={popoverVisible}
                    onClose={() => setPopoverVisible(false)}
                    anchorRef={popoverAnchorRef}
                    placement="bottom"
                    withArrow={true}
                    closeOnBackdropPress={true}
                    content={
                      <View style={styles.popoverContent}>
                        <Text variant="title" gutterBottom>Bottom Popover</Text>
                        <Text variant="body2" style={styles.popoverText}>Bu popover aşağıda gösterilir.</Text>
                        <Button 
                          size="small" 
                          style={styles.popoverButton}
                          onPress={() => setPopoverVisible(false)}
                        >
                          Kapat
                        </Button>
                      </View>
                    }
                  />
                </View>
                
                {/* Top Placement */}
                <View style={styles.componentWrapper}>
                  <Text variant="descriptionTitle" gutterBottom>Top</Text>
                  <View ref={popoverTopAnchorRef}>
                    <Button
                      onPress={() => setPopoverTopVisible(true)}
                      variant="contained"
                      color="secondary"
                    >
                      Yukarıda Göster
                    </Button>
                  </View>
                  
                  <Popover
                    isVisible={popoverTopVisible}
                    onClose={() => setPopoverTopVisible(false)}
                    anchorRef={popoverTopAnchorRef}
                    placement="top"
                    withArrow={true}
                    closeOnBackdropPress={true}
                    content={
                      <View style={styles.popoverContent}>
                        <Text variant="title" gutterBottom>Top Popover</Text>
                        <Text variant="body2" style={styles.popoverText}>Bu popover yukarıda gösterilir.</Text>
                        <Button 
                          size="small" 
                          style={styles.popoverButton}
                          onPress={() => setPopoverTopVisible(false)}
                        >
                          Kapat
                        </Button>
                      </View>
                    }
                  />
                </View>
              </View>
              
              <View style={styles.row}>
                {/* Left Placement */}
                <View style={styles.componentWrapper}>
                  <Text variant="descriptionTitle" gutterBottom>Left</Text>
                  <View ref={popoverLeftAnchorRef}>
                    <Button
                      onPress={() => setPopoverLeftVisible(true)}
                      variant="contained"
                      color="success"
                    >
                      Solda Göster
                    </Button>
                  </View>
                  
                  <Popover
                    isVisible={popoverLeftVisible}
                    onClose={() => setPopoverLeftVisible(false)}
                    anchorRef={popoverLeftAnchorRef}
                    placement="left"
                    withArrow={true}
                    closeOnBackdropPress={true}
                    content={
                      <View style={styles.popoverContent}>
                        <Text variant="title" gutterBottom>Left Popover</Text>
                        <Text variant="body2" style={styles.popoverText}>Bu popover solda gösterilir.</Text>
                        <Button 
                          size="small" 
                          style={styles.popoverButton}
                          onPress={() => setPopoverLeftVisible(false)}
                        >
                          Kapat
                        </Button>
                      </View>
                    }
                  />
                </View>
                
                {/* Right Placement */}
                <View style={styles.componentWrapper}>
                  <Text variant="descriptionTitle" gutterBottom>Right</Text>
                  <View ref={popoverRightAnchorRef}>
                    <Button
                      onPress={() => setPopoverRightVisible(true)}
                      variant="contained"
                      color="primary"
                    >
                      Sağda Göster
                    </Button>
                  </View>
                  
                  <Popover
                    isVisible={popoverRightVisible}
                    onClose={() => setPopoverRightVisible(false)}
                    anchorRef={popoverRightAnchorRef}
                    placement="right"
                    withArrow={true}
                    closeOnBackdropPress={true}
                    content={
                      <View style={styles.popoverContent}>
                        <Text variant="title" gutterBottom>Right Popover</Text>
                        <Text variant="body2" style={styles.popoverText}>Bu popover sağda gösterilir.</Text>
                        <Button 
                          size="small" 
                          style={styles.popoverButton}
                          onPress={() => setPopoverRightVisible(false)}
                        >
                          Kapat
                        </Button>
                      </View>
                    }
                  />
                </View>
              </View>
            </View>
            
            {/* Toast butonları */}
            <View style={styles.section}>
              <Text variant="title" gutterBottom>Toast</Text>
              <View style={styles.row}>
                <Button 
                  onPress={() => setToastVisible(true)} 
                  style={styles.button}
                >
                  Toast Göster
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
        
        {/* Toast Bileşeni */}
        <Toast
          visible={toastVisible}
          message="Bu bir bildirim mesajıdır!"
          variant="success"
          position="bottom"
          duration={3000}
          onClose={() => setToastVisible(false)}
          action={{
            label: "TAMAM",
            onPress: () => setToastVisible(false)
          }}
        />
        
        {/* Popover bileşeni şimdilik kaldırıldı */}
      </SafeAreaView>
    </UIProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  section: {
    marginTop: 24,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  button: {
    marginRight: 12,
    marginBottom: 12,
  },
  checkbox: {
    marginRight: 24,
    marginBottom: 12,
  },
  componentWrapper: {
    marginRight: 24,
    marginBottom: 16,
  },
  popoverContent: {
    padding: 16,
    minWidth: 200,
    maxWidth: 300,
    alignItems: 'center',
  },
  sliderContainer: {
    marginBottom: 20,
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 8,
  },
  formField: {
    marginBottom: 16,
    width: '100%',
  },
  select: {
    width: '100%',
  },
  dropdownContainer: {
    width: '45%',
    marginRight: 16,
    marginBottom: 16,
  },
  dropdown: {
    width: '100%',
  },
  popoverText: {
    marginBottom: 8,
  },
  popoverButton: {
    marginTop: 12,
    alignSelf: 'flex-end',
  }
});
