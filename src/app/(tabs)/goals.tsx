import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import FullScreenLoader from '@/components/ui/FullScreenLoader';
import { supabase } from '@/lib/supabase';
import { View, TouchableOpacity, Text } from 'react-native';
import { Pencil, SquarePlus } from 'lucide-react-native';

export default function GoalsGate() {
  const { user, formCompleted, loading, checkingForm } = useAuth();
  const router = useRouter();

  const [checkingGoals, setCheckingGoals] = useState(true);
  const [hasGoals, setHasGoals] = useState(false);

  // Redirigir si el formulario no está completo
  useEffect(() => {
    if (!loading && !checkingForm && user) {
      if (!formCompleted) {
        router.replace('/(form)');
      }
    }
  }, [loading, checkingForm, user, formCompleted]);

  // Verificar si el usuario tiene metas creadas en cualquiera de las 3 tablas
  useEffect(() => {
    const checkUserGoals = async () => {
      if (!user) return;
      setCheckingGoals(true);

      try {
        const [strength, endurance, gymnastics] = await Promise.all([
          supabase.from('goals_strength').select('goal_id').eq('athlete_id', user.id).limit(1),
          supabase.from('goals_endurance').select('goal_id').eq('athlete_id', user.id).limit(1),
          supabase.from('goals_gymnastics').select('goal_id').eq('athlete_id', user.id).limit(1),
        ]);

        const hasAnyGoal =
          (strength.data?.length ?? 0) > 0 ||
          (endurance.data?.length ?? 0) > 0 ||
          (gymnastics.data?.length ?? 0) > 0;

        setHasGoals(hasAnyGoal);
        console.log('📦 Resultado metas strength:', strength.data);
        console.log('📦 Resultado metas endurance:', endurance.data);
        console.log('📦 Resultado metas gymnastics:', gymnastics.data);
      } catch (error) {
        console.error('❌ Error al verificar metas:', error);
        setHasGoals(false);
      }

      setCheckingGoals(false);
    };

    checkUserGoals();
  }, [user]);


  if (loading || checkingForm || checkingGoals) {
    return <FullScreenLoader message="Verificando acceso..." />;
  }

  return (
    <View className="flex-1 px-6 pt-20 justify-start">
      {/* Título */}
      <Text className="text-white text-2xl font-poppinsBold text-center mt-20 mb-20">
        ¡Es momento de enfocarte!{"\n"}¿Qué quieres hacer?
      </Text>

      {/* Botones */}
      <View className="gap-10 items-center mt-16">
        <TouchableOpacity
          onPress={() => router.push('/createGoal/step1_select-goal-type')}
          className="items-center justify-center rounded-full w-40 h-40 bg-orange-600"
        >
          <SquarePlus size={50} color="white" />
          <Text className="text-white font-poppinsMedium mt-2 text-center">
            Crear meta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!hasGoals}
          onPress={() => hasGoals && router.push('/editGoal/edit-goals')}
          className={`items-center justify-center rounded-full w-40 h-40 ${hasGoals ? 'bg-stone-700' : 'bg-stone-700 opacity-40'
            }`}
        >
          <Pencil size={50} color="white" />
          <Text className="text-white font-poppinsMedium mt-2 text-center">
            Ver metas
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
