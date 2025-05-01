import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useGoalDraft } from '@/context/GoalDraftContext';

export default function Step3CurrentTime() {
  const router = useRouter();
  const { setGoal, goal } = useGoalDraft();

  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const numericMin = parseInt(minutes);
  const numericSec = parseInt(seconds);

  const isValid =
    minutes !== '' &&
    seconds !== '' &&
    !isNaN(numericMin) &&
    !isNaN(numericSec) &&
    numericMin >= 0 &&
    numericMin < 30 &&
    numericSec >= 0 &&
    numericSec < 60;

  const handleNext = () => {
    if (!isValid) {
      Alert.alert('Dato inválido', 'Ingresa un tiempo válido (ej. 06:00).');
      return;
    }

    const totalSeconds = numericMin * 60 + numericSec;

    if (totalSeconds <= 0) {
      Alert.alert('Tiempo inválido', 'El tiempo no puede ser cero.');
      return;
    }

    setGoal({ current_time_sec: totalSeconds });

    console.log('✅ Tiempo guardado en contexto:', {
      ...goal,
      current_time_sec: totalSeconds,
    });

    router.push('/createGoal/endurance-time/step4_select_target_level');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 px-6 pt-20 pb-10 justify-between">
        {/* Título */}
        <Text className="text-center text-white text-2xl font-poppinsBold mb-10 mt-20">
          ¿Cuál es tu mejor tiempo actual en 1 km?
        </Text>

        {/* Inputs de tiempo */}
        <View className="flex-row justify-center gap-4 items-end mt-10">
          <View className="items-center">
            <TextInput
              keyboardType="number-pad"
              value={minutes}
              onChangeText={(text) =>
                setMinutes(text.replace(/[^0-9]/g, '').slice(0, 2))
              }
              placeholder="00"
              placeholderTextColor="#aaa"
              className="text-white text-4xl text-center border-b-2 border-orange-500 w-16"
            />
            <Text className="text-white mt-1 font-poppinsMedium text-sm">min</Text>
          </View>

          <Text className="text-white text-4xl font-poppinsBold">:</Text>

          <View className="items-center">
            <TextInput
              keyboardType="number-pad"
              value={seconds}
              onChangeText={(text) => {
                let cleaned = text.replace(/[^0-9]/g, '').slice(0, 2);
                if (parseInt(cleaned) > 59) cleaned = '59';
                setSeconds(cleaned);
              }}
              placeholder="00"
              placeholderTextColor="#aaa"
              className="text-white text-4xl text-center border-b-2 border-orange-500 w-16"
            />
            <Text className="text-white mt-1 font-poppinsMedium text-sm">sec</Text>
          </View>
        </View>

        {/* Botones de navegación */}
        <View className="flex-row justify-between gap-4 mt-24">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 bg-stone-100 py-4 rounded-full"
          >
            <Text className="text-center text-orange-600 font-poppinsBold text-lg">
              CANCELAR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            disabled={!isValid}
            className={`flex-1 py-4 rounded-full ${
              !isValid ? 'bg-orange-400/60' : 'bg-orange-600'
            }`}
          >
            <Text className="text-center text-white font-poppinsBold text-lg">
              CONTINUAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
