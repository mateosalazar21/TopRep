
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';


export default function Step3Weight() {
  const router = useRouter();
  const { user } = useAuth();

  const defaultWeight = '75'; // Valor inicial predeterminado
  const [weight, setWeight] = useState(defaultWeight);
  const [hasChanged, setHasChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleWeightChange = (value: string) => {
    setWeight(value);
    setHasChanged(value !== defaultWeight);
  };

  const handleContinue = async () => {
    if (!user) return;
    setIsLoading(true);

    const { error } = await supabase
      .from('athletes')
      .update({ athlete_weight_lb: parseFloat(weight) })
      .eq('athlete_id', user.id);

    setIsLoading(false);

    if (!error) {
      console.log('📦 Peso guardado con éxito:', weight);
      router.push('/(form)/step4_height');
    } else {
      console.error('Error al guardar peso:', error.message);
    }
  };

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
          onValueChange={handleWeightChange}
          style={{ color: 'white' }}
          itemStyle={{ fontSize: 22 }}
        >
          {Array.from({ length: 200 }, (_, i) => i + 30).map((value) => (
            <Picker.Item key={value} label={`${value} lb`} value={value.toString()} />
          ))}
        </Picker>
      </View>

      {/* Botones de navegación */}
      <View className="flex-row justify-between gap-4 mt-8">
        <TouchableOpacity
          onPress={() => {
            router.back();
            setWeight(defaultWeight);
          }}
          className="flex-1 bg-stone-100 py-4 rounded-full"
        >
          <Text className="text-center text-orange-600 font-poppinsBold text-lg">
            CANCELAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleContinue}
          disabled={!hasChanged || isLoading}
          className={`flex-1 py-4 rounded-full ${
            hasChanged ? 'bg-orange-600' : 'bg-orange-400/60'
          }`}
        >
          <Text className="text-center text-white font-poppinsBold text-lg">
          {isLoading ? 'Guardando...' : 'CONTINUAR'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
