// src/app/(form)/index.tsx
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function FormIntroScreen() {
  console.log('📦 (form)/intro.tsx MONTADO');
  const router = useRouter();

  return (
    <View className="flex-1 justify-between pb-12">
      {/* Imagen y texto superior */}
      <View>
        <Image
          source={require('@/assets/images/form-intro.jpg')} // Coloca tu imagen aquí
          resizeMode="cover"
          className="w-full h-72"
        />
        <View className="px-6 pt-6">
          <Text className="text-center text-white text-xl font-poppinsBold leading-snug">
            ¡Usuario llevemos tu rendimiento en CrossFit al{' '}
            <Text className="text-orange-600">siguiente nivel</Text>!
          </Text>
        </View>
      </View>

      {/* Texto explicativo */}
      <View className="px-6">
        <Text className="text-stone-300 font-poppinsRegular text-center mb-2">
          Para <Text className="text-orange-500">personalizar</Text> tu experiencia en TopRep,
          necesitamos algunos datos sobre ti.
        </Text>
        <Text className="text-stone-300 font-poppinsRegular text-center">
          Solo tomará un minuto y nos ayudará a registrar tu progreso y{' '}
          <Text className="text-orange-500">adaptar la app a tus objetivos</Text>.
        </Text>
      </View>

      {/* Botón de continuar */}
      <View className="px-6">
        <TouchableOpacity
          onPress={() => router.push('/(form)/step1_sex')} // Aquí definirás la ruta a la próxima pantalla del formulario
          className="bg-orange-600 py-4 rounded-full items-center"
        >
          <Text className="text-white font-poppinsSemiBold text-lg">CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
