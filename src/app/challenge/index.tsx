import { View, Text, ScrollView, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import ChallengeCard from '@/components/ui/ChallengeCard';
import CategorySelector from '@/components/ui/CategorySelector';

export default function ChallengeListScreen() {
  const [wods, setWods] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'strength' | 'endurance'>('strength');

  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (!user) return;
  
      const fetchWodsAndResults = async () => {
        setLoading(true);
  
        const [wodsResponse, resultsResponse] = await Promise.all([
          supabase.from('wods').select('*').order('created_at', { ascending: false }),
          supabase.from('wod_results').select('wod_id, score_value, notes').eq('athlete_id', user.id),
        ]);
  
        if (wodsResponse.error || resultsResponse.error) {
          console.error('❌ Error al cargar datos:',
            wodsResponse.error?.message || resultsResponse.error?.message
          );
        } else {
          setWods(wodsResponse.data || []);
          setResults(resultsResponse.data || []);
        }
  
        setLoading(false);
      };
  
      fetchWodsAndResults();
    }, [user])
  );
  

  const handleAcceptChallenge = async (wod_id: string) => {
    if (!user) return;

    setSubmitting(true);

    const { error } = await supabase.from('wod_results').insert({
      athlete_id: user.id,
      wod_id,
      score_value: 0,
      notes: 'Pendiente de completar',
    });

    setSubmitting(false);

    if (error) {
      if (error.code === '23505') {
        Alert.alert('Ya inscrito', 'Ya te registraste en este desafío.');
      } else {
        console.error('❌ Error al aceptar desafío:', error.message);
        Alert.alert('Error', 'No se pudo aceptar el desafío.');
      }
    } else {
      Alert.alert('✅ Desafío aceptado', 'Ahora puedes completarlo y subir tu resultado.');
    }
  };

  const getResultForWod = (wod_id: string) => {
    return results.find((r) => r.wod_id === wod_id);
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 px-6 pb-10">

        <Text className="text-white text-2xl font-poppinsBold mt-1 mb-8 text-center">
          Desafíos disponibles
        </Text>

        <CategorySelector
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        {loading ? (
          <Text className="text-white font-poppinsRegular">Cargando...</Text>
        ) : (
          wods
            .filter((wod) => wod.wod_type === activeCategory)
            .map((wod) => (
              <ChallengeCard
                key={wod.wod_id}
                wod={wod}
                onAccept={() => handleAcceptChallenge(wod.wod_id)}
                submitting={submitting}
                result={getResultForWod(wod.wod_id)}
              />
            ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
