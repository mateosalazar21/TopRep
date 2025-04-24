// src/app/(tabs)/goals.tsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import FullScreenLoader from '@/components/ui/FullScreenLoader';
import { View, TouchableOpacity, Text } from 'react-native';
import { Pencil, SquarePlus } from 'lucide-react-native';

export default function GoalsGate() {
  const { user, formCompleted, loading, checkingForm } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !checkingForm && user) {
      if (!formCompleted) {
        router.replace('/(form)');
      }
    }
  }, [loading, checkingForm, user, formCompleted]);

  if (loading || checkingForm) {
    return <FullScreenLoader message="Verificando acceso..." />;
  }

  return (
    <View className="flex-1 px-6 pt-20 justify-start">
      {/* Título */}
      <Text className="text-white text-2xl font-poppinsBold text-center mt-20 mb-20">
        ¡Es momento de enfocarte!{"\n"}¿Qué quieres hacer?
      </Text>

      {/* Botones */}
      <View className="gap-10 items-center mt-16">
        <TouchableOpacity
          onPress={() => router.push('/goalsActions/step1_select-goal-type')}
          className="items-center justify-center rounded-full w-40 h-40 bg-orange-600"
        >
          <SquarePlus size={50} color="white" />
          <Text className="text-white font-poppinsMedium mt-2 text-center">
            Crear meta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/goalsActions/edit-goals')}
          className="items-center justify-center rounded-full w-40 h-40 bg-stone-700"
        >
          <Pencil size={50} color="white" />
          <Text className="text-white font-poppinsMedium mt-2 text-center">
            Editar metas
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
