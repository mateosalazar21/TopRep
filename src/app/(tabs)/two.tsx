import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useRouter, router } from 'expo-router';

export default function TabTwoScreen() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session?.user?.email) {
        setUserEmail(data.session.user.email);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/');
    router.reload(); // Fuerza el reload visual
  };

  return (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="text-white text-2xl font-poppinsBold mb-6">
        Perfil del Usuario
      </Text>

      {userEmail ? (
        <>
          <Text className="text-stone-300 text-base mb-4">
            Sesión activa: {userEmail}
          </Text>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-orange-600 px-6 py-3 rounded-full"
          >
            <Text className="text-white font-poppinsMedium text-base">
              Cerrar sesión
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text className="text-stone-300">No hay sesión activa.</Text>
      )}
    </View>
  );
}
