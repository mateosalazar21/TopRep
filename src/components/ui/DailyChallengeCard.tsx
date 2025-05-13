import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function ExploreChallengesCard() {
  return (
    <TouchableOpacity
      onPress={() => router.push('/challenge')}
      className="mb-6 relative h-55 rounded-2xl overflow-hidden"
      activeOpacity={0.9}
    >
      {/* Gradiente de fondo */}
      <LinearGradient
        colors={['#8F310A', '#EA580C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Contenido superpuesto */}
      <View className="flex-1 px-5 py-4 justify-center">
        <View className="absolute bg-white/60 rounded-full top-5 right-10 ">
          <ArrowRight color="#EA580C" size={26} strokeWidth={2} />
        </View>
        <Text className="self-start text-white font-poppinsMedium text-sm uppercase tracking-wider px-3 py-2 bg-black/30 rounded-full mb-7">
          Desafíos
        </Text>
        <Text className="text-white font-poppinsSemiBold text-xl">
          Explora los WODs disponibles
        </Text>
        <Text className="text-stone-100 font-poppinsRegular text-base mt-1">
          Elige el que mejor se alinee con tu meta y comienza a superarte
        </Text>
      </View>
    </TouchableOpacity>
  );
}
