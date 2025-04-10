/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Divvy color palette
const cyclamen = '#E86A92';
const aureolin = '#F7E733';
const seasalt = '#F7F7F9';
const turquoise = '#41E2BA';

// Base tint colors
const tintColorLight = turquoise;
const tintColorDark = cyclamen;

export const Colors = {
  light: {
    text: '#11181C',
    background: seasalt,
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: turquoise,
    secondary: cyclamen,
    accent: aureolin,
    positive: turquoise,
    negative: cyclamen,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: cyclamen,
    secondary: turquoise,
    accent: aureolin,
    positive: turquoise,
    negative: cyclamen,
  },
};

// Export individual colors for direct access
export const DivvyColors = {
  cyclamen,
  aureolin,
  seasalt,
  turquoise
};