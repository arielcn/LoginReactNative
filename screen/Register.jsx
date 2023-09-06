import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [register, setRegister] = useState('')


    const handleRegister = async () => {
        if (user === '' || pwd === '' || email === '') {
          setError('no se puede dejar en blanco')
        }
        else {
          try {
            const response = await axios.post('http://localhost:5000/usuario/register', {
              user,
              pwd,
              email
            });
            console.log(response);
            setError('');
            setRegister('Registrado')
          } catch (e) {
            console.error('Login error: ', e);
            setError('Mail ya existente ');
            setRegister('')
          }
        }
      }

return (
  <View style={styles.container}>
    <Text>Register</Text>
    <TextInput placeholder="Usuario" onChangeText={(e) => setUser(user + e)}/>
    <TextInput placeholder="Email" onChangeText={(e) => setPwd(pwd + e)} />
    <TextInput placeholder="Contraseña" onChangeText={(e) => setEmail(email + e)}/>
    <Button onPress={handleRegister} title='Registrarse' />
    <br></br>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
    <Button onPress={() => { navigation.navigate('Login') }} title='Volver atras' />
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

export default Register;