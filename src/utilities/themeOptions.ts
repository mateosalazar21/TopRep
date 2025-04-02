import { Platform } from 'react-native';
import { Theme } from '@react-navigation/native';
import { stone, orange } from 'tailwindcss/colors';

const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const MyTheme: Theme = {
  dark: false,
  colors: {
    primary: stone[50],       // Color de acento o acción
    background: stone[800],   // Fondo general oscuro
    card: stone[950],         // Fondo de tarjetas/contenedores
    text: stone[50],          // Texto claro sobre fondo oscuro
    border: stone[700],       // Bordes suaves que no distraigan
    notification: orange[600],// Color vibrante para alertas
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
