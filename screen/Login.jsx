import React, { useState } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

function Login() {

  const navigation = useNavigation();
  const [pwd, setPwd] = useState('');
  const [mail, setMail] = useState('');
  const [error, setError] = useState('');
  const [logeado, setLogeado] = useState('');

  const handleLogin = async () => {
    if (mail === '' || pwd === '') {
      setError('no se puede dejar en blanco')
    }
    else {
      try {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, mail, pwd)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
        setError('');
        setLogeado('Logeado');
        setTimeout(() => {
          navigation.navigate('Home');
        }, 1000);
      } catch (e) {
        console.error('Login error: ', e);
        setError('Mail o Contraseña incorrectos');
        setLogeado('');
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textLogin}>Login</Text>
      <TextInput style={styles.textInput} placeholder="Mail" onChangeText={(text) => setMail(text)} />
      <TextInput style={styles.textInput} placeholder="Contraseña" onChangeText={(text) => setPwd(text)} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>Logearse</Text>
      </Pressable>
      {logeado ? <Text style={styles.logeadoText}>{logeado}</Text> : null}
        <Text>¿No tienes cuenta? <Text style={styles.texto2} onPress={() => { navigation.navigate('Register') }}>Registrarse</Text></Text>
      <StatusBar style="auto" />
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
  textLogin: {
    marginBottom: 25,
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
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
  logeadoText: {
    color: 'green',
    margin: 10,
  },
  button: {
    width: 130,
    borderRadius: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  texto2: {
    textDecorationLine: 'underline',
  }
});

export default Login;