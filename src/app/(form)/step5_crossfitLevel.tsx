import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export default function Step5CrossfitLevel() {
  const router = useRouter();
  const { user } = useAuth();
  const [level, setLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const options = [
    { label: 'PRINCIPIANTE', value: 'principiante', bg: 'bg-orange-600', textColor: 'text-white' },
    { label: 'INTERMEDIO', value: 'intermedio', bg: 'bg-orange-300', textColor: 'text-white' },
    { label: 'AVANZADO', value: 'avanzado', bg: 'bg-white', textColor: 'text-neutral-900' },
  ];

  const handleSaveLevel = async () => {
    if (!user || !level) return;
    setIsLoading(true);

    const { error } = await supabase
      .from('athletes')
      .update({ athlete_crossfit_level: level })
      .eq('athlete_id', user.id);

    setIsLoading(false);

    if (!error) {
      console.log('✅ Nivel de CrossFit guardado:', level);
      router.push('/(form)/step6_goals');
    } else {
      console.error('❌ Error al guardar nivel de CrossFit:', error.message);
    }
  };

  const handleBack = () => {
    setLevel('');
    router.back();
  };



  return (
    <View className="flex-1 px-6 pt-14 justify-between pb-10">

      {/* Barra de progreso */}
      <View className="w-full pt-6">
        <View className="h-2 bg-neutral-700 rounded-full">
          <View className="h-2 bg-orange-600 rounded-full w-4/6" />
        </View>
        <Text className="text-stone-100 font-poppinsMedium text-sm mt-2 text-right">4 de 6</Text>
      </View>

      {/* Título */}
      <Text className="text-center text-white text-2xl font-poppinsBold mt-10">
        ¿Cuál es tu categoría?
      </Text>

      {/* Opciones */}
      <View className="gap-10 space-y-4 ">
        {options.map((option) => {
          const isActive = level === option.value;
          return (
            <Pressable
              key={option.value}
              onPress={() => setLevel(option.value)}
              className={`py-4 rounded-full items-center ${isActive ? option.bg : 'bg-neutral-800 border border-white/20'
                }`}
            >
              <Text
                className={`uppercase font-poppinsBold ${isActive ? option.textColor : 'text-white'
                  }`}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
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
          onPress={handleSaveLevel}
          disabled={!level || isLoading}
          className={`flex-1 py-4 rounded-full ${level ? 'bg-orange-600' : 'bg-orange-400/60'
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
