import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Home({ route }) {
  const navigation = useNavigation();
  console.log("HOME", route);
  const { usuario } = route.params;

  const tieneApellido = usuario.Apellido !== null;

  return (
    <View style={styles.container}>
      <h1>¡BIENVENIDO, {usuario.Nombre}!</h1>
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
        <p>Te faltan algunos datos!</p>
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
});

export default Home;











