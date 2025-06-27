# @joygame/ui

JoyGame UI Component Library - Özelleştirilebilir tema ve tipografi sistemi ile geliştirilmiş modern UI bileşenleri.

## Kurulum

```sh
npm install @joygame/ui
```

## Özellikler

- Merkezi tema ve tipografi yönetimi
- Özelleştirilebilir renk paletleri, boşluklar, köşe yuvarlamaları, gölgeler ve daha fazlası
- Kolay özelleştirilebilir bileşenler (Button, Checkbox, Typography)
- Farklı metin varyantları (başlık, alt başlık, açıklama başlığı, vb.)
- React Context API ile global tema ve tipografi erişimi

## Kullanım

### Temel Kullanım

```jsx
import { UIProvider, Button, Text } from '@joygame/ui';

function App() {
  return (
    <UIProvider>
      <Text variant="headerTitle">JoyGame UI Örneği</Text>
      <Button color="primary">Tıkla</Button>
    </UIProvider>
  );
}
```

### Özel Tema ve Tipografi

```jsx
import { UIProvider, Button, Text, createTheme, createTypography } from '@joygame/ui';

// Özel tema oluşturma
const customTheme = createTheme({
  colors: {
    primary: '#FF5722',
    secondary: '#2196F3'
  },
  borderRadius: {
    md: 12
  }
});

// Özel tipografi oluşturma
const customTypography = createTypography({
  fontFamily: {
    primary: "'Roboto Condensed', 'Helvetica', 'Arial', sans-serif"
  },
  variants: {
    h1: {
      fontSize: '3rem',
      fontWeight: 700
    }
  }
});

function App() {
  return (
    <UIProvider theme={customTheme} typography={customTypography}>
      <Text variant="h1">Özel Başlık</Text>
      <Button color="primary">Özel Buton</Button>
    </UIProvider>
  );
}
```

### Bileşenler

#### Button

```jsx
<Button 
  variant="contained" // 'contained', 'outlined', 'text'
  size="medium" // 'small', 'medium', 'large'
  color="primary" // 'primary', 'secondary', 'success', 'error', 'warning', 'info'
  disabled={false}
  fullWidth={false}
  startIcon={<Icon />}
  endIcon={<Icon />}
  onClick={() => console.log('Tıklandı')}
>
  Buton İçeriği
</Button>
```

#### Checkbox

```jsx
const [checked, setChecked] = useState(false);

<Checkbox 
  label="Onaylıyorum"
  checked={checked}
  onChange={(isChecked) => setChecked(isChecked)}
  size="medium" // 'small', 'medium', 'large'
  color="primary" // 'primary', 'secondary', 'success', 'error', 'warning', 'info'
  disabled={false}
/>
```

#### Text

```jsx
<Text 
  variant="body1" // 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline', 'title', 'headerTitle', 'descriptionTitle'
  color="#333"
  align="left" // 'left', 'center', 'right', 'justify'
  noWrap={false}
  gutterBottom={true}
>
  Metin içeriği
</Text>
```

## Tema ve Tipografi API

### Tema Yapısı

```typescript
interface Theme {
  colors: ColorPalette;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  breakpoints: Breakpoints;
  zIndex: ZIndex;
}
```

### Tipografi Yapısı

```typescript
interface Typography {
  fontFamily: FontFamily;
  fontWeight: FontWeight;
  fontSize: FontSize;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
  variants: TypographyVariants;
}
```

## Contributing

Katkıda bulunmak için [contributing guide](CONTRIBUTING.md) dosyasını inceleyebilirsiniz.

## License

MIT
