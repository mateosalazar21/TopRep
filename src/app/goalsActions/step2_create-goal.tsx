// src/app/goalsActions/create-goal.tsx

import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Dumbbell, ChevronDown } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const exercises = [
  { id: 'snatch', label: 'Snatch' },
  { id: 'clean_jerk', label: 'Clean & Jerk' },
  { id: 'front_squat', label: 'Front Squat' },
  { id: 'deadlift', label: 'Deadlift' },
];

export default function CreateGoalScreen() {
  const router = useRouter();
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 px-6 justify-between pb-8">
      <View className=" pt-10">
        
        {/* Título */}
        <Text className="text-white text-2xl text-center font-poppinsBold mt-2 mb-6">
          ¿Qué tipo de ejercicio quieres mejorar?
        </Text>

        {/* Botones de ejercicios */}
        <View className="space-y-4">
          {exercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              onPress={() => setSelectedExercise(exercise.id)}
              className={`flex-row items-center justify-between px-4 py-5 rounded-2xl border ${
                selectedExercise === exercise.id
                  ? 'border-orange-600 bg-orange-900/20'
                  : 'border-stone-700'
              }`}
            >
              <View className="flex-row items-center space-x-3">
                <Dumbbell color="#f97316" size={24} />
                <Text className="text-white font-poppinsMedium text-base">{exercise.label}</Text>
              </View>
              <ChevronDown color="#f97316" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Botones de acción */}
      <View className="flex-row justify-between gap-4 mt-12">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-1 bg-stone-100 py-4 rounded-full"
        >
          <Text className="text-center text-orange-600 font-poppinsBold text-lg">
            CANCELAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/goalsActions/step3_current-pr')}
          className={`flex-1 py-4 rounded-full ${
            selectedExercise ? 'bg-orange-600' : 'bg-orange-400'
          }`}
          disabled={!selectedExercise}
        >
          <Text className="text-center text-white font-poppinsBold text-lg">
            CONTINUAR
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
