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
  const [registrado, setRegistrado] = useState('')
 
    const handleRegister = async () => {
        if (user === '' || pwd === '' || email === '') {
          setError('no se puede dejar en blanco')
        }
        else {
          try {
            const response = await axios.post('http://localhost:5000/usuario/register', {
              usuario: {
                Nombre: user,
                Mail: email,
                Contraseña: pwd
              }
            });
            console.log(response);
            setError('');
            setRegistrado('Creado');
            setTimeout(() => {
              navigation.navigate('Login');
            }, 1000);

          } catch (e) {
            console.error('Login error: ', e);
            setError('Mail ya existente ');
            setRegistrado('');
          }
        }
      }

return (
  <View style={styles.container}>
    <Text>Register</Text>
    <TextInput style={styles.TextInput} placeholder="Nombre" onChangeText={(text) => setUser(text)}/>
    <TextInput style={styles.TextInput} placeholder="Email" onChangeText={(text) => setEmail(text)} />
    <TextInput style={styles.TextInput} placeholder="Contraseña" onChangeText={(text) => setPwd(text)}/>
    <Button onPress={handleRegister} title='Registrarse' />
    <br></br>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
    {registrado ? <Text style={styles.registradoText}>{registrado}</Text> : null}
    <Button onPress={() => { navigation.navigate('Login') }} title='Volver atras' />
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
  TextInput: {
    borderWidth: 2,
    padding: 5,
    marginBottom: 5,
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
});

export default Register;