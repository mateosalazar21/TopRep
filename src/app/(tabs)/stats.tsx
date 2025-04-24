// src/app/(tabs)/stats.tsx

import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Clock } from 'lucide-react-native';

export default function StatsScreen() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'alltime'>('weekly');

  return (
    <View className="flex-1 px-6 pt-20">
      {/* Título */}
      <Text className="text-orange-400 text-3xl font-poppinsBold mb-6">Leaderboard</Text>

      {/* Filtro Weekly / All Time */}
      <View className="flex-row space-x-4 mb-6">
        <TouchableOpacity
          onPress={() => setActiveTab('weekly')}
          className={`px-6 py-2 rounded-full ${activeTab === 'weekly' ? 'bg-orange-600' : 'bg-transparent border border-orange-600'}`}
        >
          <Text className={`font-poppinsMedium ${activeTab === 'weekly' ? 'text-black' : 'text-orange-600'}`}>Weekly</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('alltime')}
          className={`px-6 py-2 rounded-full ${activeTab === 'alltime' ? 'bg-orange-600' : 'bg-transparent border border-orange-600'}`}
        >
          <Text className={`font-poppinsMedium ${activeTab === 'alltime' ? 'text-black' : 'text-orange-600'}`}>All Time</Text>
        </TouchableOpacity>
      </View>

      {/* Aviso motivacional */}
      <View className="bg-orange-300/80 rounded-xl px-4 py-3 mb-4">
        <Text className="text-orange-900 font-poppinsBold text-base">#4</Text>
        <Text className="text-orange-900 font-poppinsRegular">
          ¡Lo estás haciendo mejor que el 60% de los otros jugadores!
        </Text>
      </View>

      {/* Temporizador */}
      <View className="flex-row justify-end items-center mb-6">
        <Clock size={16} color="#f97316" />
        <Text className="text-orange-400 font-poppinsMedium ml-2">06d 23h 00m</Text>
      </View>
    </View>
  );
}
