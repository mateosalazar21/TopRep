// src/app/(form)/step1_sex.tsx
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Mars, Venus } from 'lucide-react-native';

export default function Step1Sex() {
  const [selectedSex, setSelectedSex] = useState<'masculino' | 'femenino' | null>(null);
  const router = useRouter();

  const handleSelect = (sex: 'masculino' | 'femenino') => {
    setSelectedSex(sex);
  };

  return (
    <View className="flex-1  px-6 pt-14 justify-between pb-10">
      
      {/* Progreso */}
      <View className="w-full pt-6">
        <View className="h-2 bg-neutral-700 rounded-full">
        </View>
        <Text className="text-stone-100 font-poppinsMedium text-sm mt-2 text-right">0 de 6</Text>
      </View>

      {/* Título */}
      <Text className="text-white text-2xl font-poppinsBold text-center mt-10">
        ¿Cuál es tu sexo?
      </Text>

      {/* Botones de opción */}
      <View className="gap-10 items-center mt-10">
        <TouchableOpacity
          onPress={() => handleSelect('masculino')}
          className={`items-center justify-center rounded-full w-40 h-40 ${
            selectedSex === 'masculino' ? 'bg-orange-600' : 'bg-neutral-700'
          }`}
        >
          <Mars size={50} color="white" />
          <Text className="text-white font-poppinsMedium mt-2">Masculino</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSelect('femenino')}
          className={`items-center justify-center rounded-full w-40 h-40 ${
            selectedSex === 'femenino' ? 'bg-orange-300' : 'bg-neutral-700'
          }`}
        >
          <Venus size={50} color="white" />
          <Text className="text-white font-poppinsMedium mt-2">Femenino</Text>
        </TouchableOpacity>
      </View>

      {/* Botones de navegación */}
      <View className="flex-row justify-between gap-4 mt-16">
        <TouchableOpacity
          onPress={() => {
            setSelectedSex(null);
            router.back();
          }}
          className="flex-1 bg-stone-100 py-4 rounded-full"
        >
          <Text className="text-center text-orange-600 font-poppinsBold text-lg">CANCELAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!selectedSex}
          onPress={() => {
            // Aquí luego haremos la actualización en Supabase
            router.push('/(form)/step2_birthdate');
          }}
          className={`flex-1 py-4 rounded-full ${
            selectedSex ? 'bg-orange-600' : 'bg-orange-400 opacity-50'
          }`}
        >
          <Text className="text-center text-white font-poppinsBold text-lg">CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
