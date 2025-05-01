import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Trophy } from 'lucide-react-native';
import { useGoalDraft } from '@/context/GoalDraftContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function Step5Summary() {
  const router = useRouter();
  const { goal } = useGoalDraft();
  const { user } = useAuth();

  const handleFinish = async () => {
    if (
      !user ||
      !goal.endurance_exercise ||
      goal.current_time_sec === undefined ||
      goal.target_time_sec === undefined
    ) {
      Alert.alert('Faltan datos', 'Verifica que toda la información esté completa.');
      return;
    }

    const { error } = await supabase.from('goals_endurance').insert({
      athlete_id: user.id,
      exercise_name: goal.endurance_exercise,
      distance_m: 1000,
      current_time_sec: goal.current_time_sec,
      target_time_sec: goal.target_time_sec,
      level_target: goal.level_target,
      recommended_weeks: goal.recommended_weeks,
      max_weeks: goal.max_weeks,
      target_date: goal.target_date,
      start_date: new Date().toISOString().split('T')[0],
    });

    if (error) {
      console.error('❌ Error al guardar meta:', error.message);
      Alert.alert('Error', 'No se pudo guardar tu objetivo. Intenta nuevamente.');
    } else {
      Alert.alert('✅ Éxito', 'Tu objetivo ha sido creado con éxito.');
      router.replace('/(tabs)');
    }
  };

  // Formateo de segundos a mm:ss
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <View className="flex-1 px-6 pt-20 pb-10 justify-between">
      {/* Ícono motivador */}
      <View className="items-center pt-10">
        <Trophy size={72} color="#f97316" />
      </View>

      {/* Resumen visual */}
      <View className="mb-10">
        <Text className="text-center text-orange-500 text-lg font-poppinsMedium uppercase tracking-wide mb-2">
          ¡Objetivo definido!
        </Text>

        <Text className="text-white text-xl font-poppinsBold text-center leading-snug">
          Mejorar tu tiempo en {goal.endurance_exercise?.replace('_', ' ')}{'\n'}
          de {formatTime(goal.current_time_sec || 0)} a {formatTime(goal.target_time_sec || 0)}
        </Text>

        <Text className="text-stone-300 text-lg font-poppinsMedium text-center mt-4 mb-4">
          Nivel {goal.level_target} en {goal.recommended_weeks}–{goal.max_weeks} semanas
        </Text>

        {/* Fecha estimada */}
        <View className="flex align-middle items-center py-4 px-5 rounded-2xl border border-orange-600 bg-orange-700/30">
          {goal.target_date && (
            <Text className="text-stone-100 text-base font-poppinsMedium text-center">
              Meta proyectada para el{'\n'}
              {new Date(goal.target_date).toLocaleDateString('es-EC', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          )}
        </View>
      </View>

      {/* Botones de acción */}
      <View className="flex-row justify-between gap-4 mt-8">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-1 bg-stone-100 py-4 rounded-full"
        >
          <Text className="text-center text-orange-600 font-poppinsBold text-lg">
            REGRESAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleFinish}
          className="flex-1 bg-orange-600 py-4 rounded-full"
        >
          <Text className="text-center text-white font-poppinsBold text-lg">
            CREAR OBJETIVO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
