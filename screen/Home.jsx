import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Home({ route }) {
  const navigation = useNavigation();
  const { usuario } = route.params;

  return (
    <View style={styles.container}>
      <h1>¡BIENVENIDO, {usuario.Nombre}!</h1>
      <Button style={styles.botonPerfil} onPress={() => { navigation.navigate('Perfil') }} title='Mi perfil' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonPerfil: {
    width: "auto",
  },
});

export default Home;
