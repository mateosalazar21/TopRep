import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function Step4Height() {
  
  const router = useRouter();
  const { user } = useAuth();

  const [height, setHeight] = useState('170');
  const [initialHeight] = useState('170'); // para comparar si se cambió
  const [isSaving, setIsSaving] = useState(false);

  const updateHeight = async () => {
    if (!user || height === initialHeight) return;

    setIsSaving(true);

    const { error } = await supabase
      .from('athletes')
      .update({ athlete_height_cm: Number(height) })
      .eq('athlete_id', user.id);

    setIsSaving(false);

    if (!error) {
      console.log('📏 Altura actualizada con éxito:', height);
      router.push('/(form)/step5_crossfitLevel');
    } else {
      console.error('Error al guardar altura:', error.message);
    }
  };

  return (
    <View className="flex-1 px-6 pt-14 justify-between pb-10">

      {/* Barra de progreso */}
      <View className="w-full pt-6">
        <View className="h-2 bg-neutral-700 rounded-full">
          <View className="h-2 bg-orange-600 rounded-full w-3/6" />
        </View>
        <Text className="text-stone-100 font-poppinsMedium text-sm mt-2 text-right">3 de 6</Text>
      </View>

      {/* Título */}
      <View className="mt-10">
        <Text className="text-white text-2xl font-poppinsBold text-center mb-6">
          ¿Cuánto mides?
        </Text>

        {/* Número + unidad */}
        <View className="flex-row justify-center items-end mb-6">
          <Text className="text-white text-6xl font-poppinsBold leading-none pt-2">
            {height}
            <Text className="text-gray-400 text-xl font-poppinsBold ml-1 mb-1">
              CM
            </Text>
          </Text>

        </View>
      </View>

      {/* Picker */}
      <View className="border-orange-600 rounded-2xl mt-10 mb-6">
        <Picker
          selectedValue={height}
          onValueChange={(itemValue) => setHeight(itemValue)}
          style={{ color: 'white'}}
          itemStyle={{ fontSize: 22 }}
        >
          {Array.from({ length: 121 }, (_, i) => 100 + i).map((val) => (
            <Picker.Item key={val} label={`${val}`} value={`${val}`} />
          ))}
        </Picker>
      </View>

      {/* Botones de navegación */}
      <View className="flex-row justify-between gap-4 mt-8">
        <TouchableOpacity
          onPress={() => {
            router.back() 
            setHeight(initialHeight);
          }}
          className="flex-1 bg-stone-100 py-4 rounded-full"
        >
          <Text className="text-center text-orange-600 font-poppinsBold text-lg">
            CANCELAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={updateHeight}
          disabled={height === initialHeight || isSaving}
          className={`flex-1 py-4 rounded-full ${height === initialHeight ? 'bg-orange-400/60' : 'bg-orange-600'}`}
        >
          <Text className="text-center text-white font-poppinsBold text-lg">
          {isSaving ? 'Guardando...' : 'CONTINUAR'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
