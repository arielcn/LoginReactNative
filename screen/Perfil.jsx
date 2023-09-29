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
  const { usuario } = route.Textarams;


  useEffect(() => {
    try {
      const res = axios.get(`httText://localhost:5000/usuario/${usuario.id}`);
      setNombre(res.nombre)
      setApellido(res.apellido)
      setMail(res.mail)
    } catch (e) {
      console.error('get error: ', e);
    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>
      <Text>Nombre:</Text>
      {nombre !== null ? <Text>{nombre}</Text> : <Text>-</Text>}
      <Text>Apellido:</Text>
      {apellido !== null ? <Text>{apellido}</Text> : <Text>-</Text>}
      <Text>Email:</Text>
      {mail !== null ? <Text>{mail}</Text> : <Text>-</Text>}
      <Button
          style={styles.botonPerfil}
          onPress={() => {
            navigation.navigate("EditarPerfil", {usuario});
          }}
          title="Editar Perfil"
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
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Perfil;
