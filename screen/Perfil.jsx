import { View } from "react-native-web";
import { StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";

function Perfil({ route }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [mail, setMail] = useState("");
  const navigation = useNavigation();
  const { usuario } = route.params;


  useEffect(() => {
    try {
      const res = axios.get(`http://localhost:5000/usuario/${usuario.id}`);
      setNombre(res.nombre)
      setApellido(res.apellido)
      setMail(res.mail)
    } catch (e) {
      console.error('get error: ', e);
    }
  })

  return (
    <View style={styles.container}>
      <h1>Mi perfil</h1>
      <p>Nombre:</p>
      {nombre !== null ? <p>{nombre}</p> : <p>-</p>}
      <p>Apellido:</p>
      {apellido !== null ? <p>{apellido}</p> : <p>-</p>}
      <p>Email:</p>
      {mail !== null ? <p>{mail}</p> : <p>-</p>}
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
