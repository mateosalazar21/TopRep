import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import CategorySelector from '@/components/ui/CategorySelector';
import GoalCard from '@/components/ui/GoalCard';

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
      <CategorySelector
        categories={[
          { value: 'strength', label: 'PR en levantamientos' },
          { value: 'endurance', label: 'Tiempo en resistencia' },
        ]}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Metas por categoría */}
      <ScrollView className="gap-4">
        {activeCategory === 'strength' &&
          strengthGoals.map((goal) => (
            <GoalCard
              key={goal.goal_id}
              type="strength"
              goal={goal}
              onDelete={() => confirmDelete(goal.goal_id, 'strength')}
            />
          ))}

        {activeCategory === 'endurance' &&
          enduranceGoals.map((goal) => (
            <GoalCard
              key={goal.goal_id}
              type="endurance"
              goal={goal}
              onDelete={() => confirmDelete(goal.goal_id, 'endurance')}
            />
          ))}
      </ScrollView>

    </View>
  );
}
