import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Clock } from 'lucide-react-native';
import PersonalResultsList from '@/components/stats/PersonalStatsChart';
import Leaderboard from '@/components/stats/Leaderboard';

export default function StatsScreen() {
  const [view, setView] = useState<'personal' | 'community'>('personal');
  const [leaderboardEntries, setLeaderboardEntries] = useState<any[]>([]);
  const [dailyWod, setDailyWod] = useState<{
    name: string;
    wod_type: string;
    start_date: string;
  } | null>(null);

  // 📊 Cargar leaderboard del WOD diario
  useEffect(() => {
    const fetchLeaderboard = async () => {
      // 1. Buscar el WOD marcado como is_daily_challenge = true
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

      // 2. Guardar datos del WOD para mostrar en UI
      setDailyWod({
        name: wodData.name,
        wod_type: wodData.wod_type,
        start_date: wodData.start_date,
      });

      // 3. Buscar resultados (inscritos) para ese WOD
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
    };

    fetchLeaderboard();
  }, []);

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
    <ScrollView className="flex-1 px-6 pt-20 pb-10">
      {/* Tabs */}
      <View className="flex-row justify-center gap-4 mb-6">
        <TouchableOpacity
          onPress={() => setView('personal')}
          className={`flex-1 py-2 rounded-full ${
            view === 'personal' ? 'bg-orange-600' : 'bg-stone-700'
          }`}
        >
          <Text className="text-white text-center font-poppinsMedium">
            Mis estadísticas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setView('community')}
          className={`flex-1 py-2 rounded-full ${
            view === 'community' ? 'bg-orange-600' : 'bg-stone-700'
          }`}
        >
          <Text className="text-white text-center font-poppinsMedium">
            Comunidad
          </Text>
        </TouchableOpacity>
      </View>

      {/* Comunidad (Leaderboard) */}
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

      {/* Estadísticas personales */}
      {view === 'personal' && (
        <>
          <Text className="text-white text-2xl font-poppinsBold mb-6 text-center">
            Tus progresos
          </Text>

          <PersonalResultsList />
        </>
      )}
    </ScrollView>
  );
}
