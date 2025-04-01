import { StyleSheet, Text, View, Image } from 'react-native';




export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Hola, Usuario</Text>
        <Text>Es hora de desafiar tus límites.</Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  img: {
    width: 10,
    height: 10,
  }
});
