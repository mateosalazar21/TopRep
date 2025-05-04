import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, User } from 'lucide-react-native';
import GreetingHeader from '@/components/ui/GreetingHeader';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { getCurrentChallenge } from '@/components/logic/wods';
import { router } from 'expo-router';


export default function HomeScreen() {
  const [weeklyChallenge, setWeeklyChallenge] = useState<any | null>(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      const challenge = await getCurrentChallenge();
      setWeeklyChallenge(challenge);
    };

    fetchChallenge();
  }, []);

  return (
    <ScrollView className="flex-1 px-6 pt-14 pb-8">

      <GreetingHeader />

      {/* Últimos entrenamientos */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-orange-600 font-poppinsMedium text-base">
            Últimos Entrenamientos
          </Text>
          <TouchableOpacity>
            <Text className="text-orange-500 font-poppinsMedium text-sm">Ver más ▸</Text>
          </TouchableOpacity>
        </View>

        {[1, 2].map((_, i) => (
          <View key={i} className="bg-white/90 rounded-2xl px-4 py-3 mb-3 flex-row justify-between items-center">
            <View>
              <Text className="text-orange-600 font-poppinsBold text-xs">🔥 120 Kcal</Text>
              <Text className="text-black font-poppinsBold text-sm">Upper Body Workout</Text>
              <Text className="text-gray-600 text-xs">Junio 09</Text>
            </View>
            <View className="items-end">
              <Text className="text-orange-600 font-poppinsBold text-sm">Duración</Text>
              <Text className="text-black text-sm">25 Min</Text>
            </View>
          </View>
        ))}
      </View>

      {weeklyChallenge && (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/challenge/[wod_id]',
              params: { wod_id: weeklyChallenge.wod_id },
            })
          }
          className="mb-6 relative"
          activeOpacity={0.8}
        >
          <Image
            source={require('@/assets/images/image_fitness1.jpg')}
            className="w-full h-40 rounded-2xl"
            resizeMode="cover"
            style={{ opacity: 0.3 }}
          />

          <View className="absolute top-0 left-0 right-0 bottom-0 px-5 py-4 justify-center">
            <Text className="text-white font-poppinsBold text-sm uppercase mb-1">
              Desafío Diario
            </Text>
            <Text className="text-orange-600 font-poppinsBold text-lg">
              {weeklyChallenge.name}
            </Text>
            <Text className="text-stone-100 font-poppinsRegular text-sm mt-1">
              {weeklyChallenge.description}
            </Text>
          </View>
        </TouchableOpacity>
      )}




      {/* Tips de recuperación */}
      <View>
        <Text className="text-orange-600 font-poppinsMedium text-base mb-3">Tips De Recuperación</Text>
        <View className="flex-row justify-between space-x-4">
          <View className="flex-1">
            <Image
              source={require('@/assets/images/image_fitness2.jpg')}
              className="w-full h-28 rounded-2xl mb-1"
              resizeMode="cover"
            />
            <Text className="text-white font-poppinsMedium text-sm">Guía De Suplementos...</Text>
          </View>
          <View className="flex-1">
            <Image
              source={require('@/assets/images/image_fitness3.jpg')}
              className="w-full h-28 rounded-2xl mb-1"
              resizeMode="cover"
            />
            <Text className="text-white font-poppinsMedium text-sm">Rutina Diaria Efectiva...</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
