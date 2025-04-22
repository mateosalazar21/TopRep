import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import FullScreenLoader from '@/components/ui/FullScreenLoader';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen() {
  const {
    user,
    onboardingCompleted,
    formCompleted,
    loading,
    checkingOnboarding,
    checkingForm,
  } = useAuth();

  const router = useRouter();

  // 🧭 Solo redirigir cuando ya tenemos info
  useEffect(() => {
    if (
      !loading &&
      !checkingOnboarding &&
      !checkingForm &&
      user
    ) {
      if (!onboardingCompleted) {
        router.replace('/(onboarding)');
      } else {
        router.replace('/(tabs)');
      }
    }
  }, [
    user,
    onboardingCompleted,
    formCompleted,
    loading,
    checkingOnboarding,
    checkingForm,
  ]);

  // ✅ Mostrar splash mientras carga sesión
  if (loading || checkingOnboarding || checkingForm) {
    return <FullScreenLoader message="Cargando sesión..." opaque />;
  }

  // ✅ Mostrar pantalla de bienvenida solo si NO hay usuario
  if (!user) {
    return (
      <View
        key={'guest'}
        className='flex-1 items-center justify-strech px-1' >

        {/*Logo*/}
        <Image
          source={require('../assets/icons/splash-icon-dark.png')}
          className='w-1/2 h-1/2 mb-1'
          resizeMode='contain'
        />
        {/*Grupo1*/}
        <View className='w-4/5 items-center '>
          <Text className='font-poppinsSemiBold text-xl text-stone-50 mb-4 text-center'>
            ¿Ya tienes una cuenta?
          </Text>
          <TouchableOpacity
            className='bg-orange-600 p-4 rounded-full w-full items-center'
            onPress={() => router.push('/(auth)/signin')}
          >
            <Text className='font-poppinsSemiBold text-xl text-stone-50'>
              INGRESAR
            </Text>
          </TouchableOpacity>
        </View>

        {/*Separador*/}
        <View className="w-10/12 h-px bg-stone-300 my-8" />

        {/*Grupo2*/}
        <View className='w-4/5 items-center'>
          <Text className='font-poppinsSemiBold text-xl text-stone-50 mb-4 text-center'>
            ¿Es tu primera vez en TopRep?
          </Text>
          <TouchableOpacity
            className='bg-stone-50 p-4 rounded-full w-full items-center'
            onPress={() => router.push('/(auth)/signup')}
          >
            <Text className='font-poppinsSemiBold text-xl text-orange-600'>
              EMPIEZA AHORA
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }

  // ⚠️ Caso intermedio (fallback de seguridad)
  return null;
}
