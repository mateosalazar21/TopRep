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
    if (!user || !goal.exercise || !goal.current_pr_lb || !goal.target_pr_lb) {
      Alert.alert('Faltan datos', 'Verifica que toda la información esté completa.');
      return;
    }

    const { error } = await supabase.from('goals_strength').insert({
      athlete_id: user.id,
      exercise_name: goal.exercise,
      current_pr_lb: goal.current_pr_lb,
      improvement_percent: goal.improvement_percent,
      target_pr_lb: goal.target_pr_lb,
      recommended_weeks: goal.recommended_weeks,
      max_weeks: goal.max_weeks,
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
          Mejorar tu {goal.exercise?.replace('_', ' ')} {'\n'} de {goal.current_pr_lb} lb a {goal.target_pr_lb?.toFixed(1)} lb
        </Text>

        <Text className="text-stone-300 text-lg font-poppinsMedium text-center mt-4 mb-4">
          (+{(goal.improvement_percent ?? 0) * 100}%) en {goal.recommended_weeks}–{goal.max_weeks} semanas
        </Text>
        
        <View className='flex align-middle items-center py-4 px-5 rounded-2xl border border-orange-600 bg-orange-700/30'>
          {goal.target_date && (
            <Text className="text-stone-100 text-base font-poppinsMedium text-center">
              Meta proyectada para el{' '} {'\n'}
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
