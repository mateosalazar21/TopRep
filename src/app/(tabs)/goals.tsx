import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function GoalsScreen() {
  const {
    user,
    formCompleted,
    loading,
    checkingForm,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    // ✅ Solo redirigir si todo está cargado y el formulario NO está completo
    if (!loading && !checkingForm && user && !formCompleted) {
      router.push('/(form)');
    }
  }, [loading, checkingForm, user, formCompleted]);

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white text-xl font-poppinsMedium">
        Aquí irá la sección de tus metas 💪
      </Text>
    </View>
  );
}
