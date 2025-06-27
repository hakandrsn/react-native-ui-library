import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { 
  UIProvider, 
  Text, 
  Button, 
  Checkbox,
  useStyles
} from '../src';

// Example component that uses the UI components
const ExampleApp = () => {
  const { theme } = useStyles();
  const [checked, setChecked] = React.useState(false);
  
  // Theme değerlerini kullanarak özel stiller oluşturma örneği
  const customSectionStyle = {
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text variant="headerTitle" gutterBottom>JoyGame UI Components</Text>
        
        {/* Text examples */}
        <View style={[styles.section, customSectionStyle]}>
          <Text variant="title" gutterBottom>Text Variants</Text>
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="body1">Body 1 - Main text paragraph</Text>
          <Text variant="body2">Body 2 - Secondary text paragraph</Text>
          <Text variant="descriptionTitle">Description Title</Text>
        </View>
        
        {/* Button examples */}
        <View style={styles.section}>
          <Text variant="title" gutterBottom>Button Variants</Text>
          
          <Text variant="subtitle1" gutterBottom>Contained Buttons</Text>
          <View style={styles.buttonRow}>
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="success">Success</Button>
          </View>
          <View style={styles.buttonRow}>
            <Button color="error">Error</Button>
            <Button color="warning">Warning</Button>
            <Button color="info">Info</Button>
          </View>
          
          <Text variant="subtitle1" gutterBottom style={styles.marginTop}>Outlined Buttons</Text>
          <View style={styles.buttonRow}>
            <Button variant="outlined" color="primary">Primary</Button>
            <Button variant="outlined" color="secondary">Secondary</Button>
            <Button variant="outlined" color="success">Success</Button>
          </View>
          
          <Text variant="subtitle1" gutterBottom style={styles.marginTop}>Text Buttons</Text>
          <View style={styles.buttonRow}>
            <Button variant="text" color="primary">Primary</Button>
            <Button variant="text" color="secondary">Secondary</Button>
            <Button variant="text" color="error">Error</Button>
          </View>
          
          <Text variant="subtitle1" gutterBottom style={styles.marginTop}>Button Sizes</Text>
          <View style={styles.buttonRow}>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </View>
          
          <Text variant="subtitle1" gutterBottom style={styles.marginTop}>Disabled Button</Text>
          <Button disabled>Disabled Button</Button>
          
          <Text variant="subtitle1" gutterBottom style={styles.marginTop}>Full Width Button</Text>
          <Button fullWidth>Full Width Button</Button>
        </View>
        
        {/* Checkbox examples */}
        <View style={styles.section}>
          <Text variant="title" gutterBottom>Checkbox Examples</Text>
          
          <Text variant="subtitle1" gutterBottom>Basic Checkbox</Text>
          <Checkbox 
            label="Basic Checkbox" 
            checked={checked}
            onChange={(isChecked: boolean) => setChecked(isChecked)}
          />
          
          <Text variant="subtitle1" gutterBottom style={styles.marginTop}>Checkbox Colors</Text>
          <View style={styles.checkboxRow}>
            <Checkbox label="Primary" color="primary" />
            <Checkbox label="Secondary" color="secondary" />
            <Checkbox label="Success" color="success" />
          </View>
          <View style={styles.checkboxRow}>
            <Checkbox label="Error" color="error" />
            <Checkbox label="Warning" color="warning" />
            <Checkbox label="Info" color="info" />
          </View>
          
          <Text variant="subtitle1" gutterBottom style={styles.marginTop}>Checkbox Sizes</Text>
          <View style={styles.checkboxRow}>
            <Checkbox label="Small" size="small" />
            <Checkbox label="Medium" size="medium" />
            <Checkbox label="Large" size="large" />
          </View>
          
          <Text variant="subtitle1" gutterBottom style={styles.marginTop}>Disabled Checkbox</Text>
          <Checkbox label="Disabled Checkbox" disabled />
          <Checkbox label="Disabled Checked" checked disabled />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Custom theme (optional)
const customTheme = {
  colors: {
    primary: '#6200ee',
    secondary: '#03dac6',
  }
};

// Main App with UIProvider
export default function App() {
  return (
    <UIProvider theme={customTheme}>
      <ExampleApp />
    </UIProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 8,
  },
  marginTop: {
    marginTop: 16,
  },
});
