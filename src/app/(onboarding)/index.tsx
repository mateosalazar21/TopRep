import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';
import { useRouter } from 'expo-router';
import React from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';

// Íconos desde lucide-react-native
import { Activity, Target, HeartPulse, Sparkle, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';

import { completeOnboarding } from '@/components/logic/completeOnboarding';


const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Mide tu progreso',
    Icon: Activity,
  },
  {
    title: 'Alcanza tus metas',
    Icon: Target,
  },
  {
    title: 'Recupera tu cuerpo',
    Icon: HeartPulse,
  },
];

export default function OnboardingSwiper() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const carouselRef = React.useRef<ICarouselInstance>(null);


  return (
    <View className="flex-1 justify-center">

      {/* Flechas indicativas */}
      {currentIndex > 0 && (
        <TouchableOpacity
          onPress={() => carouselRef.current?.prev()}
          className="absolute left-4 top-1/22 z-10"
        >
          <ChevronLeft color="#fff" size={32} />
        </TouchableOpacity>
      )}

      {currentIndex < slides.length - 1 && (
        <TouchableOpacity
          onPress={() => carouselRef.current?.next()}
          className="absolute right-4 top-1/22 z-10"
        >
          <ChevronRight color="#fff" size={32} />
        </TouchableOpacity>
      )}

      <Carousel
        ref={carouselRef}
        loop={false}
        width={width}
        height={700}
        data={slides}
        scrollAnimationDuration={300}
        onSnapToItem={(index) => setCurrentIndex(index)}

        renderItem={({ item }) => (

          <View className="h-[700px] items-center justify-center px-8">

            {/* Contenedor de la tarjeta */}
            <View className="bg-orange-600 rounded-xl p-10 w-full items-center justify-center h-[400px]">
              {item.Icon && <item.Icon color="white" size={64} />}
              <Text className="text-white text-xl font-poppinsBold text-center mt-6">
                {item.title}
              </Text>
            </View>

            {/* Indicadores de progreso */}
            <View className="flex-row space-x-2 mt-6">
              {slides.map((_, i) => (
                <View
                  key={i}
                  className={`h-2 w-6 rounded-full space-x-2  ${currentIndex === i ? 'bg-orange-500' : 'bg-stone-500'
                    }`}
                />
              ))}
            </View>

          </View>
        )}
      />

      {/* Botón EMPEZAR solo en la última tarjeta */}
      {currentIndex === slides.length - 1 && (
        <Animated.View
          entering={FadeInUp.duration(500)}
          className="absolute bottom-24 left-1/3"
        >
          <TouchableOpacity
            onPress={() => completeOnboarding(supabase, router)}
            className="bg-orange-600 px-8 py-3 rounded-full"
          >
            <Text className="text-white font-poppinsSemiBold text-base">EMPEZAR</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

    </View>
  );
}
