import { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

export default function Step2Birthdate() {
  const [birthdate, setBirthdate] = useState<Date>(new Date(2000, 0, 1));
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();

  const handleConfirm = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setBirthdate(selectedDate);
    }
  };

  return (
    <View className="flex-1 px-6 pt-14 justify-between pb-10">

      {/* Progreso */}
      <View className="w-full pt-6">
        <View className="h-2 bg-neutral-700 rounded-full">
          <View className="h-2 bg-orange-600 rounded-full w-1/6" />
        </View>
        <Text className="text-stone-100 font-poppinsMedium text-sm mt-2 text-right">1 de 6</Text>
      </View>

      {/* Título */}
      <Text className="text-white text-2xl font-poppinsBold text-center mt-10">
        ¿Cuándo naciste?
      </Text>

      {/* Selector de fecha */}
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className="items-center justify-center"
      >
        <Text className="text-6xl font-poppinsBold text-white pt-2">
          {birthdate.getDate()}
        </Text>
        <Text className="text-white mt-2 text-base font-poppinsMedium">
          {birthdate.toLocaleDateString('es-EC', {
            month: 'long',
            year: 'numeric',
          })}
        </Text>
      </TouchableOpacity>

      {/* Date Picker nativo */}
      {showPicker && (
        <DateTimePicker
          value={birthdate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleConfirm}
          maximumDate={new Date()}
        />
      )}

      {/* Botones de navegación */}
      <View className="flex-row justify-between gap-4 mt-16">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-1 bg-stone-100 py-4 rounded-full"
        >
          <Text className="text-center text-orange-600 font-poppinsBold text-lg">CANCELAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(form)/step3_weight')}
          className="flex-1 bg-orange-600 py-4 rounded-full"
        >
          <Text className="text-center text-white font-poppinsBold text-lg">CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
