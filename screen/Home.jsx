import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Home({ route }) {
  const navigation = useNavigation();
  console.log("HOME", route);
  const { usuario } = route.params;

  const tieneApellido = usuario.Apellido !== null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡BIENVENIDO, {usuario.Nombre}!</Text>
      {tieneApellido ? (
        <Button
          style={styles.botonPerfil}
          onPress={() => {
            navigation.navigate("EditarPerfil", {usuario});
          }}
          title="Editar perfil"
        />
      ) : (
        <div>
        <Text>Te faltan algunos datos!</Text>
        <Button
          style={styles.botonPerfil}
          onPress={() => {
            navigation.navigate("Perfil", {usuario});
          }}
          title="Completar mi perfil"
        /></div>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  botonPerfil: {
    width: "auto",
  }, 
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 20,
  },
});

export default Home;











