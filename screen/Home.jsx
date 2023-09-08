import React, { useState } from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Home({ route }) {
  const { usuario } = route.params;

  return (
    <View>
      <h1>¡BIENVENIDO, {usuario.Nombre}!</h1>
      <Button style={styles.botonPerfil} onPress={() => { navigation.navigate('Perfil') }} title='Mi perfil' />
    </View>
  );
}

const styles = StyleSheet.create({
    botonPerfil:{
        width: "auto",
    },
});

export default Home;
