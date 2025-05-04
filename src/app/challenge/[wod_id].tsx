import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function WodDetailScreen() {
  const { wod_id } = useLocalSearchParams();
  const [wod, setWod] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!wod_id) return;

    const fetchWod = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('wods')
        .select('*')
        .eq('wod_id', wod_id)
        .single();

      if (error) {
        console.error('❌ Error cargando WOD:', error.message);
      } else {
        setWod(data);
      }
      setLoading(false);
    };

    fetchWod();
  }, [wod_id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white font-poppinsMedium text-lg">Cargando WOD...</Text>
      </View>
    );
  }

  if (!wod) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white font-poppinsMedium text-lg">WOD no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 px-6 pt-20 pb-10">
      <Text className="text-orange-500 font-poppinsMedium text-base uppercase mt-20 mb-2">
        {wod.wod_type === 'strength' ? 'Fuerza' : wod.wod_type === 'endurance' ? 'Resistencia' : 'Gimnasia'}
      </Text>

      <Text className="text-white font-poppinsBold text-2xl mb-2">
        {wod.name}
      </Text>

      <Text className="text-stone-300 font-poppinsRegular text-base">
        {wod.description}
      </Text>

      {/* Aquí en el futuro puedes agregar leaderboard o comparación con metas */}
    </ScrollView>
  );
} 
