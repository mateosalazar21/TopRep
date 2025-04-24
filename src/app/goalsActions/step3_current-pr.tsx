import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Step3CurrentPR() {
  const router = useRouter();
  const [prValue, setPrValue] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (prValue && parseFloat(prValue) > 0) {
      // Más adelante: guardar el PR en estado global o Supabase
      router.push('/goalsActions/step4_target-percentage');
    }
  };

  const isValid = prValue && parseFloat(prValue) > 0;

  return (
    <View className="flex-1 px-6 pt-14 justify-between pb-10">
      {/* Título */}
      <Text className="text-center text-white text-2xl font-poppinsBold mb-2 mt-10 pt-5">
        ¿Cuál es tu PR actual?
      </Text>

      {/* Input numérico */}
      <View className="items-center">
        <View className="flex-row items-end">
          <TextInput
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#94a3b8"
            value={prValue}
            onChangeText={setPrValue}
            className="text-center text-white text-6xl font-poppinsBold w-40 border-b border-orange-500"
          />
          <Text className="text-gray-400 text-lg ml-2 pb-2">LB</Text>
        </View>
      </View>

      {/* Botones de navegación */}
      <View className="flex-row justify-between gap-4 mt-16">
        <TouchableOpacity
          onPress={handleBack}
          className="flex-1 bg-stone-100 py-4 rounded-full"
        >
          <Text className="text-center text-orange-600 font-poppinsBold text-lg">
            CANCELAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={!isValid}
          className={`flex-1 py-4 rounded-full ${!isValid ? 'bg-orange-400/60' : 'bg-orange-600'
            }`}
        >
          <Text className="text-center text-white font-poppinsBold text-lg">
            CONTINUAR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
