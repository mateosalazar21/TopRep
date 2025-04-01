import { Platform } from 'react-native';
import { Theme } from '@react-navigation/native';

const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const MyTheme: Theme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 255, 255)',
    background: 'rgb(18, 18, 18)',
    card: 'rgb(0, 0, 0)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(255, 255, 255)',
    notification: 'rgb(255, 255, 255)',
  },

  fonts: {
    regular: {
      fontFamily: 'Poppins_400Regular',
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: 'Poppins_500Medium',
      fontWeight: '500' as const,
    },
    bold: {
      fontFamily: 'Poppins_600SemiBold',
      fontWeight: '600' as const,
    },
    heavy: {
      fontFamily: 'Poppins_700Bold',
      fontWeight: '700' as const,
    },

    }
};
