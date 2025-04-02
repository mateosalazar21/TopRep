/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/app/**/*.{js,jsx,ts,tsx}",       // Tus rutas de páginas
  "./src/components/**/*.{js,jsx,ts,tsx}", // Componentes reutilizables
  "./src/lib/**/*.{js,jsx,ts,tsx}",        // Utilidades / lógica compartida
  "./src/constants/**/*.{js,jsx,ts,tsx}",  // Constantes que podrían tener UI
];
export const presets = [require("nativewind/preset")];
export const theme = {
  extend: {
    fontFamily: {
      poppinsRegular: 'Poppins_400Regular',
      poppinsMedium: 'Poppins_500Medium',
      poppinsSemiBold: 'Poppins_600SemiBold',
      poppinsBold: 'Poppins_700Bold',
    },
  },
};
export const plugins = [];