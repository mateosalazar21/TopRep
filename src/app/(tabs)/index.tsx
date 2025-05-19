import { View, Text, ScrollView, RefreshControl } from 'react-native';
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
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
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
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    await new Promise((res) => setTimeout(res, 500)); // delay para mostrar loader
    setRefreshing(false);
  }, [fetchData]);

  return (
    <View className="flex-1 ">
      {/* Header fijo, fuera del scroll */}
      <View className="px-6 pt-20">
        <GreetingHeader />
      </View>

      {/* Scrollable content con refresco */}
      <ScrollView
        className="px-6 pb-8"
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#f97316']}
            tintColor="#f97316"
          />
        }
      >
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

        {/* Spacer para asegurar scroll */}
        <View className="h-32" />
      </ScrollView>
    </View>
  );

}
