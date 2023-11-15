import axios from 'axios';
import React, { useEffect, useState } from "react";
import { ImageBackground, Button, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";

const image = { uri: 'https://global-uploads.webflow.com/5ca5fe687e34be0992df1fbe/6235ea7fbaf601e8d3980228_boy-kicking-ball-on-football-field-2021-09-24-03-47-56-utc-min-min.jpg' };

function Home() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState('')

  const baseUrl = 'https://reqres.in';

  useEffect(async () => {
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

    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      params: {date: '2021-01-29'},
      headers: {
        'X-RapidAPI-Key': '8251816370msh5a663ad8dd640b4p1fe4b9jsnf7a487bd8d54',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
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











