import { Stack } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function FormLayout() {
  const router = useRouter();

  return (
    <Stack>
      {/* Pantalla inicial del formulario (form)/index.tsx con header personalizado */}
      <Stack.Screen
        name="index"
        options={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerBackVisible: false,
          headerTitle: '', // o puedes poner '' si prefieres ocultar el título
          headerLeft: () => (
            <Pressable onPress={() => router.replace('/(tabs)')} className="ml-4">
              <Text className="text-white text-base">← Volver</Text>
            </Pressable>
          ),
        }}
      />
    
      <Stack.Screen name="step1_sex" options={{ headerShown: false }} />
      <Stack.Screen name="step2_birthdate" options={{ headerShown: false }} />
      <Stack.Screen name="step3_weight" options={{ headerShown: false }} />
      <Stack.Screen name="step4_height" options={{ headerShown: false }} />
      <Stack.Screen name="step5_crossfitLevel" options={{ headerShown: false }} />
      <Stack.Screen name="step6_goals" options={{ headerShown: false }} />
      <Stack.Screen name="step7_confirmation" options={{ headerShown: false }} />
    </Stack>
  );
}
