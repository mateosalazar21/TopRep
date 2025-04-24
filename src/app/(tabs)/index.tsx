import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, User } from 'lucide-react-native';
import GreetingHeader from '@/components/ui/GreetingHeader';

export default function HomeScreen() {
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

      {/* Desafío semanal */}
      <View className="mb-6">
        <Image
          source={require('@/assets/images/image_fitness1.jpg')}
          className="w-full h-40 rounded-2xl mb-2"
          resizeMode="cover"
        />
        <Text className="text-white font-poppinsBold text-lg">Desafío Semanal</Text>
        <Text className="text-gray-300 font-poppinsRegular text-sm">¡Plancha 4 Ever!</Text>
      </View>

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
