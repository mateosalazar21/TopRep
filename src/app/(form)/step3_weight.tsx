import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

export default function Step3Weight() {
  const [weight, setWeight] = useState('75');
  const router = useRouter();

  return (
    <View className="flex-1 px-6 pt-14 justify-between pb-10">
      {/* Barra de progreso */}
      <View className="w-full pt-6">
        <View className="h-2 bg-neutral-700 rounded-full">
          <View className="h-2 bg-orange-600 rounded-full w-2/6" />
        </View>
        <Text className="text-stone-100 font-poppinsMedium text-sm mt-2 text-right">2 de 6</Text>
      </View>

      {/* Título */}
      <View className="mt-10">
        <Text className="text-white text-2xl font-poppinsBold text-center mb-6">
          ¿Cuál es tu peso?
        </Text>
        <Text className="text-center text-white text-6xl font-poppinsBold pt-2">
          {weight} <Text className="text-gray-400 text-lg">LB</Text>
        </Text>
      </View>

      {/* Picker */}
      <View className="bg-orange-600 rounded-2xl mt-10 mb-6">
        <Picker
          selectedValue={weight}
          onValueChange={(itemValue) => setWeight(itemValue)}
          style={{ color: 'white', height: 180 }}
          itemStyle={{ fontSize: 22 }}
        >
          {Array.from({ length: 151 }, (_, i) => 50 + i).map((val) => (
            <Picker.Item key={val} label={`${val}`} value={`${val}`} />
          ))}
        </Picker>
      </View>

      {/* Botones de navegación */}
      <View className="flex-row justify-between gap-4 mt-8">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-1 bg-stone-100 py-4 rounded-full"
        >
          <Text className="text-center text-orange-600 font-poppinsBold text-lg">
            CANCELAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(form)/step4_height')}
          className="flex-1 bg-orange-600 py-4 rounded-full"
        >
          <Text className="text-center text-white font-poppinsBold text-lg">
            CONTINUAR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
