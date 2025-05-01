import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useGoalDraft } from '@/context/GoalDraftContext';

const improvementOptions = [
  {
    label: '5% de mejora',
    value: 0.05,
    recommended_weeks: 4,
    max_weeks: 6,
  },
  {
    label: '10% de mejora',
    value: 0.10,
    recommended_weeks: 8,
    max_weeks: 10,
  },
  {
    label: '15% de mejora',
    value: 0.15,
    recommended_weeks: 10,
    max_weeks: 14,
  },
];

export default function Step4DefineGoalTarget() {
  const router = useRouter();
  const { goal, setGoal } = useGoalDraft();
  const [selectedPercent, setSelectedPercent] = useState<number | null>(null);

  const currentPR = goal.current_pr_lb;

  const handleSelect = (percent: number) => {
    setSelectedPercent((prev) => (prev === percent ? null : percent));
  };

  const handleNext = () => {
    if (!selectedPercent || !currentPR) return;

    const option = improvementOptions.find((opt) => opt.value === selectedPercent);
    if (!option) return;

    const targetPR = parseFloat((currentPR * (1 + selectedPercent)).toFixed(1));

    // 🧠 Calcular fecha proyectada de finalización
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + option.recommended_weeks * 7); // sumar semanas en días

    setGoal({
      improvement_percent: selectedPercent,
      target_pr_lb: targetPR,
      recommended_weeks: option.recommended_weeks,
      max_weeks: option.max_weeks,
      target_date: targetDate.toISOString().split('T')[0], // formato 'YYYY-MM-DD'
    });

    console.log('🎯 Meta calculada:', {
      improvement_percent: selectedPercent,
      target_pr_lb: targetPR,
      recommended_weeks: option.recommended_weeks,
      max_weeks: option.max_weeks,
      target_date: targetDate.toISOString().split('T')[0],
    });

    router.push('/createGoal/strength-pr/step5_summary');
  };


  return (
    <View className="flex-1 px-6 pt-20 justify-between pb-10">
      {/* Título */}
      <Text className="text-white text-2xl text-center font-poppinsBold mt-20 mb-10">
        ¿Cuánto quieres mejorar?
      </Text>

      {/* Opciones */}
      <View className="gap-4">
        {improvementOptions.map((option) => {
          const isActive = selectedPercent === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => handleSelect(option.value)}
              className={`px-5 py-4 rounded-2xl border ${isActive ? 'border-orange-600 bg-orange-700/50' : 'bg-neutral-900 border-white/20'
                }`}
            >
              <Text className="text-white font-poppinsMedium text-lg">
                {option.label} → {option.recommended_weeks} a {option.max_weeks} semanas
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Botones navegación */}
      <View className="flex-row justify-between gap-4 mt-20">
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
          disabled={!selectedPercent}
          className={`flex-1 py-4 rounded-full ${!selectedPercent ? 'bg-orange-400/60' : 'bg-orange-600'
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
