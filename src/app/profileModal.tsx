import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function ProfileModal() {
  const router = useRouter();
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error al cerrar sesión', error.message || 'Algo salió mal');
    }
  };


  return (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="text-white text-2xl font-poppinsBold mb-6">
        Perfil del Usuario
      </Text>

      {user?.email ? (
        <>
          <Text className="text-stone-300 text-base mb-4">
            Sesión activa: {user.email}
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
