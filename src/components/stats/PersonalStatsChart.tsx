import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function PersonalResultsList() {
  const { user } = useAuth();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchResults = async () => {
      const { data, error } = await supabase
        .from('wod_results')
        .select('score_value, created_at, wods(name, wod_type, scoring_type)')
        .eq('athlete_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error al cargar resultados:', error.message);
      } else {
        setResults(data ?? []);
      }

      setLoading(false);
    };

    fetchResults();
  }, [user]);

  const formatValue = (value: number, type: string) => {
    if (type === 'time') {
      const min = Math.floor(value / 60);
      const sec = Math.round(value % 60);
      return `${min}:${sec.toString().padStart(2, '0')} min`;
    }
    if (type === 'load') return `${value} lb`;
    if (type === 'reps') return `${value} reps`;
    return `${value}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-EC', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <View className="mt-6">
      <Text className="text-white font-poppinsBold text-xl mb-4">Tus resultados</Text>

      {loading ? (
        <Text className="text-white font-poppinsRegular">Cargando...</Text>
      ) : results.length === 0 ? (
        <Text className="text-stone-400 font-poppinsRegular">No hay resultados aún.</Text>
      ) : (
        results.map((r, i) => (
          <View
            key={i}
            className="bg-stone-800 px-5 py-4 mb-3 rounded-2xl border border-stone-700"
          >
            <Text className="text-orange-500 font-poppinsMedium text-sm mb-1">
              {r.wods?.wod_type === 'strength'
                ? 'Fuerza'
                : r.wods?.wod_type === 'endurance'
                ? 'Resistencia'
                : 'Otro'}
            </Text>
            <Text className="text-white font-poppinsBold text-lg mb-1">
              {r.wods?.name ?? 'WOD'}
            </Text>
            <Text className="text-stone-300 font-poppinsRegular text-base">
              Resultado: {formatValue(r.score_value, r.wods?.scoring_type)}
            </Text>
            <Text className="text-stone-500 font-poppinsRegular text-sm mt-1">
              {formatDate(r.created_at)}
            </Text>
          </View>
        ))
      )}
    </View>
  );
}
