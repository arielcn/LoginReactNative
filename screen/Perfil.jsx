import { View } from "react-native-web";
import { StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";

function Perfil({ route }) {
  const [userData, setUserData] = useState('')
  const navigation = useNavigation();


  useEffect(() => {
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
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>
      <Text>Nombre:</Text>
      {userData.nombre !== null ? <Text>{userData.nombre}</Text> : <Text>-</Text>}
      <Text>Apellido:</Text>
      {userData.apellido !== null ? <Text>{userData.apellido}</Text> : <Text>-</Text>}
      <Text>Email:</Text>
      {userData.mail !== null ? <Text>{userData.mail}</Text> : <Text>-</Text>}
      <Button
          style={styles.botonPerfil}
          onPress={() => {
            navigation.navigate("EditarPerfil");
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
