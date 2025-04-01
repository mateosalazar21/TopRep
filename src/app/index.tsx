import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      

      <Text style={styles.title}>Bienvenido a la app!</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/(auth)/signin')}
      >
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/(auth)/signup')}
      >
        <Text style={styles.buttonText}>Empieza Ahora</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  title: {
    fontSize: 24, marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff', padding: 12, margin: 10, borderRadius: 10,
    width: '80%', alignItems: 'center',
  },
  buttonText: {
    color: 'white', fontSize: 16,
  },
});
