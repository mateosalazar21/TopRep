import { Text, View, Image } from 'react-native';
import GreetingHeader from '@/components/ui/GreetingHeader';
import React from 'react';

export default function HomeScreen() {

  return (
    <View
      className="flex-1 px-6"
    >
       <GreetingHeader />
      
    </View>
  );
}
