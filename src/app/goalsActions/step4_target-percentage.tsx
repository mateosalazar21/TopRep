import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Step4TargetPercentage() {
  const router = useRouter();
  const [selectedPercent, setSelectedPercent] = useState<number | null>(null);

  const handleBack = () => {
    setSelectedPercent(null);
    router.back();
  };

  const handleNext = () => {
    if (!selectedPercent) return;
    // Guardar porcentaje elegido en estado global más adelante
    router.push('/goalsActions/step5_weeks');
  };

  const percentages = [5, 10, 15, 20];

  return (
    <View className="flex-1 px-6 pt-14 justify-between pb-10">
      {/* Título */}
      <Text className="text-center text-white text-2xl font-poppinsBold mb-10 mt-10 pt-5">
        ¿Cuánto quieres mejorar?
      </Text>

      {/* Opciones de porcentaje */}
      <View className="gap-4">
        {percentages.map((percent) => {
          const isActive = selectedPercent === percent;
          return (
            <TouchableOpacity
              key={percent}
              onPress={() => setSelectedPercent(percent)}
              className={`py-4 px-6 rounded-full items-center ${isActive
                ? 'bg-orange-600'
                : 'bg-neutral-800 border border-white/20'
                }`}
            >
              <Text className="text-white font-poppinsBold text-lg">+{percent}%</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Botones de navegación */}
      <View className="flex-row justify-between gap-4 mt-16">
        <TouchableOpacity
          onPress={handleBack}
          className="flex-1 bg-stone-100 py-4 rounded-full"
        >
          <Text className="text-center text-orange-600 font-poppinsBold text-lg">
            CANCELAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={!selectedPercent}
          className={`flex-1 py-4 rounded-full ${!selectedPercent ? 'bg-orange-400/60' : 'bg-orange-600'
            }`}
        >
          <Text className="text-center text-white font-poppinsBold text-lg">
            CONTINUAR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
