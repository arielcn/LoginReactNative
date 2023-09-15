import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function EditarPerfil({ route }) {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [mail, setMail] = useState("");
  const { usuario } = route.params;

  const handleEdit = () => {
    try {
      const response = axios.post('http://localhost:5000/usuario/update/:id', {
        usuario: {
          Nombre: nombre,
          Apellido: apellido,
          Mail: mail,
        }
      });
      console.log(response);
      setTimeout(() => {
        navigation.navigate('Home');
      }, 1000);

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
      <Button
        style={styles.botonPerfil}
        onPress={() => {
          navigation.navigate("Home");
        }}
        title="Guardar"
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

/*import { View } from "react-native-web";
import { StyleSheet } from 'react-native';

function CompletarPerfil() {

  return(
    <View style={styles.container}>
      <h1>Mi perfil</h1>
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
});

export default CompletarPerfil;*/
