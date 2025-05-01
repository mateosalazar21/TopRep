import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useGoalDraft } from '@/context/GoalDraftContext';
import { enduranceTargets } from '@/components/logic/enduranceTargets';
import { useState } from 'react';

export default function Step4SelectTargetLevel() {
  const router = useRouter();
  const { goal, setGoal } = useGoalDraft();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const modality = goal.endurance_exercise;

  if (!modality) {
    Alert.alert('Error', 'No se ha seleccionado una modalidad de ejercicio.');
    router.replace('/createGoal/endurance-time/step2_select_exercise');
    return null;
  }

  const options = enduranceTargets[modality];

  const handleSelect = (level: string) => {
    setSelectedLevel((prev) => (prev === level ? null : level));
  };

  const handleNext = () => {
    if (!selectedLevel) return;

    const selected = options.find((opt) => opt.level === selectedLevel);
    if (!selected) return;

    // Calcular fecha estimada
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + selected.weeksMin * 7);

    setGoal({
      level_target: selected.level,
      target_time_sec: selected.targetSec,
      recommended_weeks: selected.weeksMin,
      max_weeks: selected.weeksMax,
      target_date: targetDate.toISOString().split('T')[0],
    });

    console.log('✅ Meta de resistencia guardada en contexto:', {
      level_target: selected.level,
      target_time_sec: selected.targetSec,
      recommended_weeks: selected.weeksMin,
      max_weeks: selected.weeksMax,
      target_date: targetDate.toISOString().split('T')[0],
    });

    router.push('/createGoal/endurance-time/step5_summary_endurance');
  };

  return (
    <View className="flex-1 px-6 pt-20 justify-between pb-10">
      {/* Título */}
      <Text className="text-white text-2xl text-center font-poppinsBold mt-20 mb-10">
        ¿Cuál es tu nivel actual?
      </Text>

      {/* Opciones visuales */}
      <View className="gap-4">
        {options.map((opt) => {
          const isActive = selectedLevel === opt.level;
          return (
            <TouchableOpacity
              key={opt.level}
              onPress={() => handleSelect(opt.level)}
              className={`px-5 py-4 rounded-2xl border ${isActive ? 'border-orange-600 bg-orange-700/50' : 'bg-neutral-900 border-white/20'
                }`}
            >
              <Text className="text-white font-poppinsBold text-lg capitalize mb-1">
                {opt.level}
              </Text>
              <Text className="text-white font-poppinsMedium text-base">
                Tiempo objetivo: {opt.target} min
              </Text>
              <Text className="text-stone-400 font-poppinsMedium text-sm mt-1">
                Estimación: {opt.weeksMin} – {opt.weeksMax} semanas
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Botones de navegación */}
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
          disabled={!selectedLevel}
          className={`flex-1 py-4 rounded-full ${!selectedLevel ? 'bg-orange-400/60' : 'bg-orange-600'
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
