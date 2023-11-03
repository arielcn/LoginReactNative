import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const Register = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBmT4KkrBuOTRcDHowKa--bBBFA-9B4gQ0",
    authDomain: "loginreact-da6c0.firebaseapp.com",
    projectId: "loginreact-da6c0",
    storageBucket: "loginreact-da6c0.appspot.com",
    messagingSenderId: "703708462774",
    appId: "1:703708462774:web:1a3bd5cd3916b0ff1cf017",
    measurementId: "G-HLDTHL2QQG"
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [apellido, setApellido] = useState('');
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [registrado, setRegistrado] = useState('')

  const handleRegister = async () => {
    if (user === '' || apellido === '' || pwd === '' || email === '') {
      setError('no se puede dejar en blanco')
    }
    else {
      try {
        const auth = getAuth();
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          pwd
        );
        const { uid } = user;
        const db = getFirestore();
        await setDoc(doc(db, "users", uid), {
          nombre,
          apellido,
          email,
          uid,
        });
        setUser("");
        setApellido("");
        setEmail("");
        setPwd("");
        Toast.show({
          type: "success",
          text1: "Registro exitoso",
          text2: "El usuario ha sido creado correctamente.",
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Ha ocurrido un error al crear el usuario.",
        });
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textRegister}>Register</Text>
      <TextInput style={styles.textInput} placeholder="Nombre" onChangeText={(text) => setUser(text)} />
      <TextInput style={styles.textInput} placeholder="Apellido" onChangeText={(text) => setApellido(text)} />
      <TextInput style={styles.textInput} placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <TextInput style={styles.textInput} placeholder="Contraseña" onChangeText={(text) => setPwd(text)} />
      <Pressable style={styles.buttonRg} onPress={handleRegister}>
        <Text style={styles.text}>Registrarse</Text>
      </Pressable>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {registrado ? <Text style={styles.registradoText}>{registrado}</Text> : null}
      <Pressable style={styles.buttonVolver} onPress={() => { navigation.navigate('Login') }}>
        <Text style={styles.textVolver}>Volver atrás</Text>
      </Pressable>
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
  textRegister: {
    marginBottom: 25,
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  textVolver: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },

  textInput: {
    width: 200,
    borderWidth: 1,
    padding: 5,
    marginBottom: 15,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    margin: 10,
  },
  registradoText: {
    color: 'green',
    margin: 10,
  },
  buttonRg: {
    width: 130,
    borderRadius: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: 'black',
  },
  buttonVolver: {
    width: 100,
    height: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
    backgroundColor: 'black'
  }
});

export default Register;