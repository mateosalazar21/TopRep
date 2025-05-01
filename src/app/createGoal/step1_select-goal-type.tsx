import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import InfoButton from '@/components/ui/InfoButton';
import { useGoalDraft } from '@/context/GoalDraftContext';
import type { GoalType } from '@/context/GoalDraftContext';



export default function SelectGoalType() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<GoalType>(null);
  const { setGoal, goal } = useGoalDraft();


  const toggleGoal = (value: Exclude<GoalType, null>) => {
    setSelectedGoal((prev) => (prev === value ? null : value));
  };

  const handleBack = () => {
    setSelectedGoal(null);
    router.back();
  };

  const handleNext = async () => {
    if (!selectedGoal) return;

    setGoal({ goal_type: selectedGoal });
    console.log('✅ Contexto actualizado:', goal);

    if (selectedGoal === 'pr_levantamientos') {
      router.push('/createGoal/strength-pr/step2_pr_goals');
    } else if (selectedGoal === 'resistencia') {
      router.push('/createGoal/endurance-time/step2_select_exercise');
    } else if (selectedGoal === 'gimnasticos') {
      console.warn('🚧 Gymnastics flow not implemented yet');
    }
  };


  const goals: { label: string; value: Exclude<GoalType, null>; description: string }[] = [
    {
      label: '💪 PR en levantamientos',
      value: 'pr_levantamientos',
      description: 'Mejorar tus cargas máximas en squat, deadlift, clean & jerk o snatch.',
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
                className={`flex-row justify-between items-center py-4 px-5 rounded-2xl border ${isActive
                  ? 'border-orange-600 bg-orange-700/50'
                  : 'bg-neutral-900 border-white/20'
                  }`}
              >
                <Text className="text-white font-poppinsMedium flex-1 pr-2">
                  {goal.label}
                </Text>

                <InfoButton description={goal.description} />

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
