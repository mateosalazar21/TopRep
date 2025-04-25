// src/app/(form)/step2_birthdate.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export default function Step2Birthdate() {
  const router = useRouter();
  const { user } = useAuth();

  const defaultDate = new Date(2000, 0, 1);
  const [birthdate, setBirthdate] = useState<Date>(defaultDate);
  const [changed, setChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!user || !changed) return;

    setIsLoading(true);
    const { error } = await supabase
      .from('athletes')
      .update({ athlete_date_birth: birthdate.toISOString().split('T')[0] }) // formato YYYY-MM-DD
      .eq('athlete_id', user.id);

    if (!error) {
      console.log('✅ Fecha de nacimiento guardada:', birthdate);
      router.push('/(form)/step3_weight');
    } else {
      console.error('❌ Error al guardar fecha de nacimiento:', error.message);
    }

    setIsLoading(false);
  };

  return (
    <View className="flex-1 px-6 pt-14 pb-10 justify-between">
      {/* Barra de progreso */}
      <View className="w-full pt-6">
        <View className="h-2 bg-neutral-700 rounded-full">
          <View className="h-2 bg-orange-600 rounded-full w-2/6" />
        </View>
        <Text className="text-stone-100 font-poppinsMedium text-sm mt-2 text-right">
          2 de 6
        </Text>
      </View>

      {/* Título */}
      <View className="mt-12">
        <Text className="text-center text-white text-2xl font-poppinsBold mb-8">
          ¿Cuál es tu fecha de nacimiento?
        </Text>

        <DateTimePicker
          value={birthdate}
          mode="date"
          display="spinner"
          textColor="white"
          maximumDate={new Date()}
          onChange={(_, selectedDate) => {
            if (selectedDate && selectedDate.getTime() !== defaultDate.getTime()) {
              setBirthdate(selectedDate);
              setChanged(true);
            }
          }}
        />
      </View>

      {/* Botones */}
      <View className="flex-row justify-between gap-4 mt-16">
        <TouchableOpacity
          onPress={() => {
            router.back();
            setBirthdate(defaultDate);
          }}
          className="flex-1 bg-stone-100 py-4 rounded-full"
        >
          <Text className="text-center text-orange-600 font-poppinsBold text-lg">
            CANCELAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleContinue}
          className={`flex-1 py-4 rounded-full ${
            !changed || isLoading ? 'bg-orange-400/60' : 'bg-orange-600'
          }`}
          disabled={!changed || isLoading}
        >
          <Text className="text-center text-white font-poppinsBold text-lg">
            {isLoading ? 'Cargando...' : 'CONTINUAR'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
