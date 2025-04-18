import { View, Text, ActivityIndicator } from 'react-native';

interface FullScreenLoaderProps {
  message?: string;
  opaque?: boolean; // <-- NUEVO: controla si el fondo es sólido
}

export default function FullScreenLoader({ message = 'Cargando...', opaque = false }: FullScreenLoaderProps) {
  return (
    <View
      className={`absolute inset-0 z-50 flex-1 justify-center items-center ${
        opaque ? 'bg-black' : 'bg-black/50'
      }`}
    >
      <ActivityIndicator size="large" color="#fff" />
      <Text className="text-white text-base mt-4 font-poppinsMedium">{message}</Text>
    </View>
  );
}
