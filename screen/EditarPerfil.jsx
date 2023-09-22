import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

function EditarPerfil({ route }) {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [mail, setMail] = useState("");
  const [id, setId] = useState();
  const { usuario } = route.params;

  useEffect(() => {
    setId(usuario.id)
    setNombre(usuario.Nombre  || "");
    setApellido(usuario.Apellido || "");
    setMail(usuario.Mail || "");
  }, []);


  const handleEdit = () => {
    try {
      const response = axios.put(`http://localhost:5000/usuario/update/${usuario.id}`, {
        usuario: {
          Id: id,
          Nombre: nombre,
          Apellido: apellido,
          Mail: mail,
        }
      });
      navigation.navigate('Perfil', {usuario});

    } catch (e) {
      console.error('error: ', e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <TextInput
        style={styles.TextInput}
        value={nombre}
        placeholder="Nombre"
        onChangeText={(text) => {setNombre(text), console.log("aaaaa", nombre)}}
      />
      <TextInput
        style={styles.TextInput}
        value={apellido}
        placeholder="Apellido"
        onChangeText={(text) => setApellido(text)}
      />
      <TextInput
        style={styles.TextInput}
        value={mail}
        placeholder="Mail"
        onChangeText={(text) => setMail(text)}
      />
      <Button onPress={handleEdit} title='Guardar' type="submit" />

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
  TextInput: {
    borderWidth: 2,
    padding: 5,
    marginBottom: 5,
    borderRadius: 10,
  },
  botonPerfil: {
    width: "auto",
  },
});

export default EditarPerfil;
