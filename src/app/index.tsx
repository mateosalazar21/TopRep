import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

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

