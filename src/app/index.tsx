import { View, Text, Image, StyleSheet, TouchableOpacity, AppState } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const appState = useRef(AppState.currentState);

  const checkSession = async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session?.user) {
      setCheckingSession(false); // No hay sesión → muestra bienvenida
      return;
    }

    const userId = sessionData.session.user.id;

    const { data: athleteData, error: profileError } = await supabase
      .from('athletes')
      .select('onboarding_completed')
      .eq('athlete_id', userId)
      .single();

    if (profileError || !athleteData) {
      alert('Error al obtener tu perfil.');
      setCheckingSession(false);
      return;
    }

    if (athleteData.onboarding_completed) {
      router.replace('/(tabs)');
    } else {
      router.replace('/(onboarding)');
    }
  };

  useEffect(() => {
    checkSession(); // Al cargar la pantalla
    
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkSession(); // Cuando la app vuelve a estar activa
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (checkingSession) {
    return null; // O puedes poner un loading spinner si deseas
  }

  return (
    <View
      className='flex-1 items-center justify-strech px-1' >

      {/*Logo*/}
      <Image
        source={require('../assets/icons/splash-icon-dark.png')}
        className='w-1/2 h-1/2 mb-1'
        resizeMode='contain'
      />
      {/*Grupo1*/}
      <View className='w-4/5 items-center '>
        <Text
          className='font-poppinsSemiBold text-xl text-stone-50 mb-4 text-center'>
          ¿Ya tienes una cuenta?
        </Text>

        <TouchableOpacity
          className='bg-orange-600 p-4 rounded-full w-full items-center'
          onPress={() => router.push('/(auth)/signin')}
        >
          <Text
            className='font-poppinsSemiBold text-xl text-stone-50'
          >
            INGRESAR
          </Text>
        </TouchableOpacity>
      </View>

      {/*Separador*/}
      <View className="w-10/12 h-px bg-stone-300 my-8" />


      {/*Grupo2*/}
      <View className='w-4/5 items-center'>
        <Text
          className='font-poppinsSemiBold text-xl text-stone-50 mb-4 text-center'>
          ¿Es tu primera vez en TopRep?
        </Text>
        <TouchableOpacity
          className='bg-stone-50 p-4 rounded-full w-full items-center'
          onPress={() => router.push('/(auth)/signup')}
        >
          <Text
            className='font-poppinsSemiBold text-xl text-orange-600'>
            EMPIEZA AHORA
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

