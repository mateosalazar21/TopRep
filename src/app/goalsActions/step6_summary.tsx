import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Trophy } from 'lucide-react-native';

export default function Step6Summary() {
  const router = useRouter();

  // 🧪 Simulación de los datos seleccionados (reemplazar por contexto en el futuro)
  const exercise = 'Snatch';
  const currentPR = 60;
  const improvementPercent = 10;
  const targetPR = currentPR * (1 + improvementPercent / 100);
  const weeks = 10;

  const handleFinish = () => {
    // En el futuro: guardar el objetivo completo en Supabase
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 px-6 pt-20 pb-10 justify-between">
      {/* Ícono motivador */}
      <View className="items-center  pt-10">
        <Trophy size={72} color="#f97316" />
      </View>

      {/* Resumen visual */}
      <View className="mb-10">
        <Text className="text-center text-orange-500 font-poppinsMedium text-base uppercase tracking-wide mb-2">
          ¡Objetivo definido!
        </Text>
        <Text className="text-white text-xl font-poppinsBold text-center leading-snug">
          Mejorar tu {exercise} de {currentPR} kg a {targetPR.toFixed(1)} kg
        </Text>
        <Text className="text-stone-300 text-lg font-poppinsMedium text-center mt-4">
          (+{improvementPercent}%) en {weeks} semanas
        </Text>
      </View>

      {/* Botones de acción */}
      <View className="flex-row justify-between gap-4 mt-8">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-1 bg-stone-100 py-4 rounded-full"
        >
          <Text className="text-center text-orange-600 font-poppinsBold text-lg">
            REGRESAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleFinish}
          className="flex-1 bg-orange-600 py-4 rounded-full"
        >
          <Text className="text-center text-white font-poppinsBold text-lg">
            CREAR OBJETIVO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
