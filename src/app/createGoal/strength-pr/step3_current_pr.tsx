import {
  View, Text, TouchableOpacity, TextInput, Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useGoalDraft } from '@/context/GoalDraftContext';

export default function Step3CurrentPR() {
  const router = useRouter();
  const [prValue, setPrValue] = useState('');
  const { setGoal, goal } = useGoalDraft();

  const numericPR = parseFloat(prValue);
  const isValid = !isNaN(numericPR) && numericPR > 0;

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (!isValid) return;

    setGoal({ current_pr_lb: numericPR });
    console.log('✅ PR guardado en contexto:', { ...goal, current_pr_lb: numericPR });
    router.push('/createGoal/strength-pr/step4_improvement_plan');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 px-6 pt-20 justify-between pb-10">
        {/* Título */}
        <Text className="text-center text-white text-2xl font-poppinsBold mb-10 mt-20">
          ¿Cuál es tu PR actual?
        </Text>

        {/* Input numérico */}
        <View className="items-center">
          <TextInput
            value={prValue}
            onChangeText={setPrValue}
            keyboardType="numeric"
            placeholder="Ingresa tu PR en libras"
            placeholderTextColor="#aaa"
            className="text-white text-3xl font-poppinsBold text-center w-full border-b-2 border-orange-600 pb-2"
          />
          <Text className="text-gray-400 text-xl mt-2 font-poppinsMedium">
            LB
          </Text>
        </View>

        {/* Botones de navegación */}
        <View className="flex-row justify-between gap-4 mt-24">
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
    </TouchableWithoutFeedback>
  );
}
