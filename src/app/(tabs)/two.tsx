import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useRouter, router } from 'expo-router';

export default function TabTwoScreen() {

  return (
    <View className="flex-1 items-center justify-center px-6">

      <Text className="text-white text-2xl font-poppinsBold mb-6">
        POantalla Vacia
      </Text>

    </View>
  );
}
