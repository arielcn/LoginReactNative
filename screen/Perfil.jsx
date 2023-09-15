import { View } from "react-native-web";
import { StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Perfil({ route }) {
  const navigation = useNavigation();
  const { usuario } = route.params;

  return (
    <View style={styles.container}>
      <h1>Mi perfil</h1>
      <p>Nombre:</p>
      {usuario.Nombre !== null ? <p>{usuario.Nombre}</p> : <p>-</p>}
      <p>Apellido:</p>
      {usuario.Apellido !== null ? <p>{usuario.Apellido}</p> : <p>-</p>}
      <p>Email:</p>
      {usuario.Mail !== null ? <p>{usuario.Mail}</p> : <p>-</p>}
      <Button
          style={styles.botonPerfil}
          onPress={() => {
            navigation.navigate("EditarPerfil", {usuario});
          }}
          title="Editar perfil"
        />
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

export default Perfil;
