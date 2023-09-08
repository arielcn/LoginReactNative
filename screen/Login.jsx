import React, { useState } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
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
        const response = await axios.post('http://localhost:5000/usuario/login', {
          email,
          pwd,
        });
        setError('');
        setLogeado('Logeado')
      } catch (e) {
        console.error('Login error: ', e);
        setError('Mail o Contraseña incorrectos');
        setLogeado('')
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput style={styles.TextInput} onChangeText={(text) => setMail(text)} placeholder="Mail" />
      <TextInput style={styles.TextInput} onChangeText={(text) => setPwd(text)} placeholder="Contraseña" />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {logeado ? <Text style={styles.logeadoText}>{logeado}</Text> : null}
      <Button onPress={handleLogin} title='Logearse' />
      <br></br>
      <Button onPress={() => { navigation.navigate('Register') }} title='Registrarse' />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  logeadoText: {
    color: 'green',
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    borderWidth: 1,
    padding: 5,
    marginBottom: 5,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    margin: 10,
  },
});

export default Login;