// src/app/goalsActions/select-goal-type.tsx

import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { HelpCircle } from 'lucide-react-native';

export default function SelectGoalType() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const toggleGoal = (value: string) => {
    setSelectedGoal((prev) => (prev === value ? null : value));
  };

  const handleBack = () => {
    setSelectedGoal(null);
    router.back();
  };

  const handleNext = () => {
    if (!selectedGoal) return;
    router.push('/goalsActions/step2_create-goal');
  };

  const goals = [
    {
      label: '💪 PR en levantamientos',
      value: 'pr_levantamientos',
      description: 'Mejorar tus cargas máximas en ejercicios como sentadilla, clean & jerk y snatch.',
    },
    {
      label: '🏃‍♂️ Tiempo en resistencia',
      value: 'resistencia',
      description: 'Reducir tus tiempos en WODs de larga duración o pruebas de cardio.',
    },
    {
      label: '🤸 Reps gimnásticos',
      value: 'gimnasticos',
      description: 'Aumentar repeticiones en pull-ups, muscle-ups, etc.',
    },
  ];

  return (
    <View className="flex-1 px-6 pt-20 justify-between pb-10">
      {/* Título */}
      <Text className="text-center text-white text-2xl font-poppinsBold mb-10 mt-20">
        ¿Qué tipo de meta quieres alcanzar?
      </Text>

      {/* Lista de metas */}
      <View className="gap-4 mb-10">
        {goals.map((goal) => {
          const isActive = selectedGoal === goal.value;
          return (
            <View key={goal.value} className="relative">
              <Pressable
                onPress={() => toggleGoal(goal.value)}
                className={`flex-row justify-between items-center py-4 px-5 rounded-full ${isActive
                  ? 'bg-orange-600'
                  : 'bg-neutral-800 border border-white/20'
                  }`}
              >
                <Text className="text-white font-poppinsBold">
                  {goal.label}
                </Text>
                <HelpCircle size={20} color="white" />
              </Pressable>
            </View>
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
          onPress={handleNext}
          disabled={!selectedGoal}
          className={`flex-1 py-4 rounded-full ${!selectedGoal ? 'bg-orange-400/60' : 'bg-orange-600'
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
