import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const navigation = useNavigation();
  const [error, setError] = useState('');

    const handleRegister = async () => {
        if (user === '' || pwd === '') {
          setError('no se puede dejar en blanco')
        }
        else {
          try {
            const response = await axios.post('http://localhost:5000/register', {
              user,
              pwd,
            });
            console.log(response);
            setError('');
            setLogeado('Logeado')
          } catch (e) {
            console.error('Login error: ', e);
            setError('User o Pwd incorrecto');
            setLogeado('')
          }
        }
      }

return (
  <View style={styles.container}>
    <Text>Register</Text>
    <TextInput placeholder="Username" />
    <TextInput placeholder="Email" />
    <TextInput placeholder="Contraseña" />
    <Button onPress={handleRegister} title='Logearse' />
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