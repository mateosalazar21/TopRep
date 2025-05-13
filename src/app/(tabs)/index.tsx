import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import GreetingHeader from '@/components/ui/GreetingHeader';
import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import ExploreChallengesCard from '@/components/ui/DailyChallengeCard';
import ActiveChallengesList from '@/components/ui/ActiveChallengesList';



export default function HomeScreen() {
  const [hasActiveGoals, setHasActiveGoals] = useState(false);
  const [activeChallenges, setActiveChallenges] = useState<any[]>([]);
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        if (!user) return;

        const [strength, endurance] = await Promise.all([
          supabase.from('goals_strength').select('goal_id').eq('athlete_id', user.id),
          supabase.from('goals_endurance').select('goal_id').eq('athlete_id', user.id),
        ]);

        setHasActiveGoals(
          (strength.data?.length ?? 0) > 0 ||
          (endurance.data?.length ?? 0) > 0
        );

        const { data, error } = await supabase
          .from('wod_results')
          .select('*, wods(*)')
          .eq('athlete_id', user.id)
          .eq('score_value', 0);

        if (error) {
          console.error('❌ Error al cargar desafíos activos:', error.message);
        } else {
          setActiveChallenges(data ?? []);
        }
      };

      fetchData();
    }, [user])
  );



  return (
    <ScrollView className="flex-1 px-6 pt-20 pb-8 ">

      {/* Header */}
      <GreetingHeader />

      {/* Desafío diario */}
      <View className="relative">
        <ExploreChallengesCard />
        {!hasActiveGoals && (
          <View className="absolute inset-0 px-6 items-center justify-center bg-black/80 rounded-2xl">
            <Text className="text-stone-200 font-poppinsMedium text-center text-lg">
              Primero define una meta para participar en los desafíos
            </Text>
          </View>
        )}
      </View>

      {/* Historial de desafíos */}
      <ActiveChallengesList
        challenges={activeChallenges}
        hasGoals={hasActiveGoals}
      />
    </ScrollView>
  );
}
