import React from 'react';
import { Tabs } from 'expo-router';
import { House, Goal, ChartColumn } from 'lucide-react-native';
import HeaderProfileButton from '@/components/HeaderProfileButton';



export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ea580c',
        tabBarInactiveTintColor: '#cbd5e1',
        tabBarIconStyle: {
          //marginTop: 6, // 👈 baja el ícono
        },
        tabBarStyle: {
          backgroundColor: '#1c1917',
          borderTopWidth: 0,
          //height: 70, // (opcional) más alto si quieres más espacio
          //paddingBottom: 8,
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Inicio', // ✅ Se muestra debajo del ícono
          headerTitle: '',       // ❌ No muestra nada en el header
          tabBarIcon: ({ color }) => <House color={color} size={28} />,
          headerShown: true,
          headerTransparent: true,
          headerRight: () => <HeaderProfileButton />,
        }}
      />
      {/* METAS SMART */}
      <Tabs.Screen
        name="goals"
        options={{
          tabBarLabel: 'Metas', // ✅ Se muestra debajo del ícono
          headerTitle: '',       // ❌ No muestra nada en el header
          tabBarIcon: ({ color }) => <Goal color={color} size={28} />,
          headerTransparent: true,
          headerShown: true,
        }}
      />
      {/* ESTADÍSTICAS */}
      <Tabs.Screen
        name="stats"
        options={{
          tabBarLabel: 'Estadísticas', // ✅ Se muestra debajo del ícono
          headerTitle: '',       // ❌ No muestra nada en el header
          tabBarIcon: ({ color }) => <ChartColumn color={color} size={28} />,
          headerShown: true,
          headerTransparent: true,
        }}
      />
    </Tabs>
  );
}
