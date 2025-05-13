import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';

export default function GreetingHeader() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  return (
    <View style={{ paddingTop: insets.top + 5 }} className="px-1 pb-5">
      <Text className="text-orange-600 text-3xl font-poppinsBold">
        Hola, {user?.user_metadata?.athlete_name || 'Usuario'}
      </Text>
      <Text className="text-stone-50 text-lg font-poppinsRegular mt-1">
        Es hora de desafiar tus límites.
      </Text>
    </View>
  );
}
