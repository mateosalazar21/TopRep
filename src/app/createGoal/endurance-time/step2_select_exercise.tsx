import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Timer } from 'lucide-react-native';
import InfoButtonPicture from '@/components/ui/InfoButtonPicture';
import { useGoalDraft } from '@/context/GoalDraftContext';

// 🧠 Modalidades válidas para metas de resistencia
const modalities: {
  id: 'run' | 'row' | 'assault_bike';
  label: string;
}[] = [
  { id: 'run', label: 'Running' },
  { id: 'row', label: 'Rowing' },
  { id: 'assault_bike', label: 'Assault AirBike' },
];

// 📸 Temporal: puedes reemplazar estas imágenes cuando tengas assets propios
import runImage from '@/assets/images/exercises/run.jpg';
import rowImage from '@/assets/images/exercises/row.jpg';
import bikeImage from '@/assets/images/exercises/bike.jpg';

export default function Step2SelectModality() {
  const router = useRouter();
  const [selectedModality, setSelectedModality] = useState<'run' | 'row' | 'assault_bike' | null>(null);
  const { setGoal, goal } = useGoalDraft();

  const toggleModality = (value: typeof selectedModality) => {
    setSelectedModality((prev) => (prev === value ? null : value));
  };

  const handleBack = () => {
    setSelectedModality(null);
    router.back();
  };

  const handleNext = () => {
    if (!selectedModality) return;
    setGoal({ endurance_exercise: selectedModality });
    console.log('✅ Modalidad guardada en contexto:', { ...goal, endurance_exercise: selectedModality });
    router.push('/createGoal/endurance-time/step3_current_time');
  };

  const imageMap = {
    run: runImage,
    row: rowImage,
    assault_bike: bikeImage,
  };

  return (
    <View className="flex-1 px-6 pt-20 justify-between pb-10">
      {/* Título */}
      <Text className="text-white text-2xl text-center font-poppinsBold mt-20 mb-10">
        ¿Qué modalidad quieres mejorar?
      </Text>

      {/* Opciones */}
      <View className="gap-4">
        {modalities.map((modality) => {
          const isActive = selectedModality === modality.id;

          return (
            <View key={modality.id} className="relative">
              <TouchableOpacity
                onPress={() => toggleModality(modality.id)}
                className={`flex-row justify-between items-center py-4 px-5 rounded-2xl border ${
                  isActive ? 'border-orange-600 bg-orange-700/50' : 'bg-neutral-900 border-white/20'
                }`}
              >
                <View className="flex-row items-center gap-4">
                  <Timer size={24} color="#E38627" />
                  <Text className="text-white font-poppinsMedium">{modality.label}</Text>
                </View>
                <InfoButtonPicture
                  image={imageMap[modality.id as keyof typeof imageMap]}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* Botones navegación */}
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
          disabled={!selectedModality}
          className={`flex-1 py-4 rounded-full ${
            !selectedModality ? 'bg-orange-400/60' : 'bg-orange-600'
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
