import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Dumbbell } from 'lucide-react-native';
import snatchImage from '@/assets/images/exercises/snatch.jpg';
import cleanJerkImage from '@/assets/images/exercises/clean_jerk.jpg';
import squatImage from '@/assets/images/exercises/squat.jpg';
import InfoButtonPicture from '@/components/ui/InfoButtonPicture';
import { useGoalDraft } from '@/context/GoalDraftContext';

const exercises: {
  id: 'snatch' | 'clean_and_jerk' | 'back_squat';
  label: string;
}[] = [
    { id: 'snatch', label: 'Snatch' },
    { id: 'clean_and_jerk', label: 'Clean & Jerk' },
    { id: 'back_squat', label: 'Back Squat' },
  ];


export default function Step2PRGoals() {
  const router = useRouter();
  const [selectedExercise, setSelectedExercise] = useState<'snatch' | 'clean_and_jerk' | 'back_squat' | null>(null);
  const { setGoal, goal } = useGoalDraft();

  const toggleExercise = (value: typeof selectedExercise) => {
    setSelectedExercise((prev) => (prev === value ? null : value));
  };

  const handleBack = () => {
    setSelectedExercise(null);
    router.back();
  };

  const handleNext = () => {
    if (!selectedExercise) return;
    setGoal({ exercise: selectedExercise });
    console.log('✅ Ejercicio guardado en contexto:', { ...goal, exercise: selectedExercise });
    router.push('/createGoal/strength-pr/step3_current_pr');
  };

  const imageMap = {
    snatch: snatchImage,
    clean_and_jerk: cleanJerkImage,
    back_squat: squatImage,
  };

  return (
    <View className="flex-1 px-6 pt-20 justify-between pb-10">
      {/* Título */}
      <Text className="text-white text-2xl text-center font-poppinsBold mt-20 mb-10">
        ¿Qué tipo de ejercicio quieres mejorar?
      </Text>

      {/* Botones de ejercicios */}
      <View className="gap-4">
        {exercises.map((exercise) => {
          const isActive = selectedExercise === exercise.id;

          return (
            <View key={exercise.id} className="relative">
              <TouchableOpacity
                onPress={() => toggleExercise(exercise.id)}
                className={`flex-row justify-between items-center py-4 px-5 rounded-2xl border ${isActive
                  ? 'border-orange-600 bg-orange-700/50'
                  : 'bg-neutral-900 border-white/20'
                  }`}
              >
                <View className='flex-row items-center gap-4'>
                  <Dumbbell size={24} color="#E38627" />
                  <Text className="text-white font-poppinsMedium ">{exercise.label}</Text>
                </View>
                <InfoButtonPicture
                  image={imageMap[exercise.id as keyof typeof imageMap]}
                />
              </TouchableOpacity>
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
          disabled={!selectedExercise}
          className={`flex-1 py-4 rounded-full ${!selectedExercise ? 'bg-orange-400/60' : 'bg-orange-600'
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
