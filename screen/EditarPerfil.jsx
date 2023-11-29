import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

function EditarPerfil() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const handleEdit = async () =>{
    const auth = getAuth();
    let id = auth.currentUser.uid;
    const db = getFirestore();
    await updateDoc(doc(db, "users", id), {
      nombre,
      apellido
    });
    navigation.navigate('Home');
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
