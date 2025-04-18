import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';

export default function GreetingHeader() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  return (
    <View style={{ paddingTop: insets.top + 16 }} className="px-6">
      <Text className="text-orange-500 text-xl font-poppinsSemiBold">
        Hola, {user?.user_metadata?.athlete_name || 'Usuario'}
      </Text>
      <Text className="text-stone-50 text-base font-poppinsRegular mt-1">
        Es hora de desafiar tus límites.
      </Text>
    </View>
  );
}
