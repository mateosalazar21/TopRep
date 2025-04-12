import 'react-native-reanimated';
import '../../global.css';
import FontAwesome from '@expo/vector-icons/FontAwesome';
//
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
//
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
//
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
//import { useColorScheme } from '@/src/components/useColorScheme';
import { useColorScheme } from 'nativewind';
import { MyTheme } from '@/utilities/themeOptions';

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index.tsx',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <ThemeProvider value={MyTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="(auth)/signin"/>
        <Stack.Screen name="(auth)/signup"/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <Stack.Screen name="(onboarding)/index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
