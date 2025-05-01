import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Trash2 } from 'lucide-react-native';

export default function EditGoals() {
  const router = useRouter();
  const { user } = useAuth();

  const [activeCategory, setActiveCategory] = useState<'strength' | 'endurance'>('strength');
  const [strengthGoals, setStrengthGoals] = useState<any[]>([]);
  const [enduranceGoals, setEnduranceGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadGoals = async () => {
      setLoading(true);

      const { data: strength, error: err1 } = await supabase
        .from('goals_strength')
        .select('*')
        .eq('athlete_id', user.id);

      const { data: endurance, error: err2 } = await supabase
        .from('goals_endurance')
        .select('*')
        .eq('athlete_id', user.id);

      if (err1) console.error('❌ Error cargando strength goals:', err1.message);
      if (err2) console.error('❌ Error cargando endurance goals:', err2.message);

      setStrengthGoals(strength || []);
      setEnduranceGoals(endurance || []);
      setLoading(false);
    };

    loadGoals();
  }, [user]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const confirmDelete = (goalId: string, type: 'strength' | 'endurance') => {
    Alert.alert(
      '¿Eliminar meta?',
      'Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteGoal(goalId, type),
        },
      ],
      { cancelable: true }
    );
  };

  const deleteGoal = async (goalId: string, type: 'strength' | 'endurance') => {
    const table = type === 'strength' ? 'goals_strength' : 'goals_endurance';

    const { error } = await supabase.from(table).delete().eq('goal_id', goalId);

    if (error) {
      console.error('❌ Error al eliminar meta:', error.message);
      Alert.alert('Error', 'No se pudo eliminar la meta.');
    } else {
      Alert.alert('Meta eliminada', 'Tu meta ha sido eliminada correctamente.');

      if (type === 'strength') {
        setStrengthGoals((prev) => prev.filter((g) => g.goal_id !== goalId));
      } else {
        setEnduranceGoals((prev) => prev.filter((g) => g.goal_id !== goalId));
      }
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white font-poppinsMedium text-lg">Cargando metas...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-6 pt-20 pb-10">
      {/* Título */}
      <Text className="text-white text-2xl font-poppinsBold text-center mt-10 mb-6">
        Tus metas activas
      </Text>

      {/* Categorías */}
      <View className="flex-row justify-center gap-4 mb-8">
        <TouchableOpacity
          onPress={() => setActiveCategory('strength')}
          className={`px-4 py-2 rounded-full ${activeCategory === 'strength' ? 'bg-orange-600' : 'bg-stone-700'}`}
        >
          <Text className="text-white font-poppinsMedium">PR en levantamientos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveCategory('endurance')}
          className={`px-4 py-2 rounded-full ${activeCategory === 'endurance' ? 'bg-orange-600' : 'bg-stone-700'}`}
        >
          <Text className="text-white font-poppinsMedium">Tiempo en resistencia</Text>
        </TouchableOpacity>
      </View>

      {/* Metas por categoría */}
      <ScrollView className="gap-4">
        {activeCategory === 'strength' &&
          strengthGoals.map((goal) => (
            <View
              key={goal.goal_id}
              className="px-5 py-4 mb-4 rounded-2xl border border-orange-600 bg-orange-700/30 relative"
            >
              <TouchableOpacity
                onPress={() => confirmDelete(goal.goal_id, 'strength')}
                className="absolute top-3 right-3"
              >
                <Trash2 size={20} color="#fff" />
              </TouchableOpacity>

              <Text className="text-white font-poppinsBold text-lg mb-1 capitalize">
                {goal.exercise_name.replace('_', ' ')}
              </Text>
              <Text className="text-white font-poppinsMedium text-base">
                De {goal.current_pr_lb} lb a {goal.target_pr_lb} lb
              </Text>
              <Text className="text-stone-300 font-poppinsMedium text-sm mt-1">
                Estimación: {goal.recommended_weeks}–{goal.max_weeks} semanas
              </Text>
            </View>
          ))}

        {activeCategory === 'endurance' &&
          enduranceGoals.map((goal) => (
            <View
              key={goal.goal_id}
              className="px-5 py-4 mb-4 rounded-2xl border border-orange-600 bg-orange-700/30 relative"
            >
              <TouchableOpacity
                onPress={() => confirmDelete(goal.goal_id, 'endurance')}
                className="absolute top-3 right-3"
              >
                <Trash2 size={20} color="#fff" />
              </TouchableOpacity>

              <Text className="text-white font-poppinsBold text-lg mb-1 capitalize">
                {goal.exercise_name.replace('_', ' ')}
              </Text>
              <Text className="text-white font-poppinsMedium text-base">
                De {formatTime(goal.current_time_sec)} a {formatTime(goal.target_time_sec)}
              </Text>
              <Text className="text-stone-300 font-poppinsMedium text-sm mt-1">
                Estimación: {goal.recommended_weeks}–{goal.max_weeks} semanas
              </Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}
