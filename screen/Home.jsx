import React, { useEffect, useState } from "react";
import { ImageBackground, Button, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";

const image = { uri: 'https://i.pinimg.com/originals/fa/25/ef/fa25ef6cc85d2ea64278c7c09887943f.jpg' };

function Home() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState('')

  useEffect(() => {
    console.log('entrasT?')
    const fetchDataFirestore = async () => {
      const auth = getAuth();
      const db = getFirestore();

      const userRef = doc(collection(db, 'users'), auth.currentUser.uid)
      const userDoc = await getDoc(userRef);
      console.log(userDoc.data());

      if (userDoc.exists) {
        setUserData(userDoc.data());
      } else {
        setUserData(null);
      }
    }
    fetchDataFirestore();
  }, [])


  return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Text style={styles.title}>¡BIENVENIDO, {userData.nombre}!</Text>
          <Button
            style={styles.botonPerfil}
            onPress={() => {
              navigation.navigate("EditarPerfil");
            }}
            title="Editar perfil"
          />
        </ImageBackground>
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
    width: 50,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 20,
  },
});

export default Home;











