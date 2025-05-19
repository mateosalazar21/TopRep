import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Clock } from 'lucide-react-native';
import PersonalResultsList from '@/components/stats/PersonalStatsChart';
import Leaderboard from '@/components/stats/Leaderboard';
import CategorySelector from '@/components/ui/CategorySelector';

export default function StatsScreen() {
  const [view, setView] = useState<'personal' | 'community'>('personal');
  const [leaderboardEntries, setLeaderboardEntries] = useState<any[]>([]);
  const [dailyWod, setDailyWod] = useState<{
    name: string;
    wod_type: string;
    start_date: string;
  } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeaderboard = useCallback(async () => {
    const { data: wodData, error: wodError } = await supabase
      .from('wods')
      .select('wod_id, name, scoring_type, wod_type, start_date')
      .eq('is_daily_challenge', true)
      .limit(1)
      .single();

    if (wodError || !wodData) {
      console.error('❌ Error al buscar el WOD activo:', wodError?.message);
      return;
    }

    const activeWodId = wodData.wod_id;
    const scoringType = wodData.scoring_type;

    setDailyWod({
      name: wodData.name,
      wod_type: wodData.wod_type,
      start_date: wodData.start_date,
    });

    const { data: resultsData, error: resultsError } = await supabase
      .from('wod_results')
      .select('score_value, athlete_id, athletes(athlete_name)')
      .eq('wod_id', activeWodId)
      .order('score_value', { ascending: false });

    if (resultsError) {
      console.error('❌ Error al cargar resultados:', resultsError.message);
      return;
    }

    const parsedEntries = resultsData.map((entry: any) => ({
      athlete_id: entry.athlete_id,
      athlete_name: entry.athletes?.athlete_name ?? 'Sin nombre',
      score_value: entry.score_value,
      scoring_type: scoringType,
    }));

    setLeaderboardEntries(parsedEntries);
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchLeaderboard();
    await new Promise((res) => setTimeout(res, 500));
    setRefreshing(false);
  }, [fetchLeaderboard]);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-EC', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <View className="flex-1">
      <View className="px-6 pt-20">
        <CategorySelector
          categories={[
            { value: 'personal', label: 'Mis estadísticas' },
            { value: 'community', label: 'Comunidad' },
          ]}
          activeCategory={view}
          onChange={setView}
        />
      </View>

      <ScrollView
        className="px-6 pb-10"
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
        {view === 'community' && (
          <>
            <Text className="text-white text-2xl font-poppinsBold mb-2 text-center">
              Leaderboard del día
            </Text>

            {dailyWod && (
              <>
                <Text className="text-stone-300 font-poppinsRegular text-base text-center mb-1">
                  Desafío: <Text className="text-white font-poppinsBold">{dailyWod.name}</Text>
                </Text>
                <Text className="text-stone-500 font-poppinsRegular text-sm text-center mb-4">
                  Publicado: {formatDate(dailyWod.start_date)}
                </Text>
              </>
            )}

            <Leaderboard entries={leaderboardEntries} />
          </>
        )}

        {view === 'personal' && (
          <>
            <Text className="text-white text-2xl font-poppinsBold mb-6 text-center">
              Tus progresos
            </Text>

            <PersonalResultsList />
          </>
        )}

        <View className="h-20" />
      </ScrollView>
    </View>
  );
}
