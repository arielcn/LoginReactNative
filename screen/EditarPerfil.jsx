import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

function EditarPerfil({ route }) {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [mail, setMail] = useState("");
  const { usuario } = route.params;

  const handleEdit = () => {
    try {
      usuario.Nombre = nombre;
      usuario.Apellido = apellido;
      usuario.Mail = mail;
      const response = axios.put(`http://localhost:5000/usuario/update/${usuario.id}`, {
        usuario
      });
      console.log(response);
      navigation.navigate('Perfil', {usuario});
      console.log(apellido, usuario.id);

    } catch (e) {
      console.error('error: ', e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <TextInput
        style={styles.TextInput}
        placeholder={usuario.Nombre}
        onChangeText={(text) => setNombre(text)}
      />
      <TextInput
        style={styles.TextInput}
        placeholder={usuario.Apellido !== null ? usuario.Apellido : "completar"}
        onChangeText={(text) => setApellido(text)}
      />
      <TextInput
        style={styles.TextInput}
        placeholder={usuario.Mail}
        onChangeText={(text) => setMail(text)}
      />
      <Button onPress={handleEdit} title='Guardar' />

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
