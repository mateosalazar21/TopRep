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
import { useColorScheme } from 'nativewind';
import { MyTheme } from '@/utilities/themeOptions';
import { AuthProvider } from '@/context/AuthContext';

import { GoalDraftProvider } from '@/context/GoalDraftContext';

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
      <AuthProvider>
        <GoalDraftProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, }} />
            <Stack.Screen name="(auth)/signin" />
            <Stack.Screen name="(auth)/signup" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(onboarding)/index" options={{ headerShown: false }} />
            <Stack.Screen name="profileModal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="(form)" options={{ headerShown: false }} />


            <Stack.Screen
              name="createGoal/step1_select-goal-type"
              options={{
                headerTitle: '',
                headerTransparent: true,
                headerBackButtonDisplayMode: 'minimal',
              }}
            />
            <Stack.Screen
              name="createGoal/strength-pr/step2_pr_goals"
              options={{
                headerTitle: '',
                headerTransparent: true,
                headerBackButtonDisplayMode: 'minimal',
              }}
            />

            <Stack.Screen
              name="createGoal/strength-pr/step3_current_pr"
              options={{
                headerTitle: '',
                headerTransparent: true,
                headerBackButtonDisplayMode: 'minimal',
              }}
            />

            <Stack.Screen
              name="createGoal/strength-pr/step4_improvement_plan"
              options={{
                headerTitle: '',
                headerTransparent: true,
                headerBackButtonDisplayMode: 'minimal',
              }}
            />

            <Stack.Screen
              name="createGoal/strength-pr/step5_summary"
              options={{
                headerTitle: '',
                headerTransparent: true,
                headerBackButtonDisplayMode: 'minimal',
              }}
            />

            <Stack.Screen
              name="createGoal/endurance-time/step2_select_exercise"
              options={{
                headerTitle: '',
                headerTransparent: true,
                headerBackButtonDisplayMode: 'minimal',
              }}
            />

            <Stack.Screen
              name="createGoal/endurance-time/step3_current_time"
              options={{
                headerTitle: '',
                headerTransparent: true,
                headerBackButtonDisplayMode: 'minimal',
              }}
            />

            <Stack.Screen
              name="createGoal/endurance-time/step4_select_target_level"
              options={{
                headerTitle: '',
                headerTransparent: true,
                headerBackButtonDisplayMode: 'minimal',
              }}
            />

            <Stack.Screen
              name="createGoal/endurance-time/step5_summary_endurance"
              options={{
                headerTitle: '',
                headerTransparent: true,
                headerBackButtonDisplayMode: 'minimal',
              }}
            />

            <Stack.Screen
              name="editGoal/edit-goals"
              options={{
                headerTitle: '',
                headerTransparent: true,
                headerBackButtonDisplayMode: 'minimal',
              }}
            />

            <Stack.Screen
              name="challenge/[wod_id]"
              options={{
                headerTitle: '',
                headerTransparent: true,
                headerBackButtonDisplayMode: 'minimal',
              }}
            />

          </Stack>
        </GoalDraftProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
