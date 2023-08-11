import { StyleSheet, Text, TextInput, View } from 'react-native';
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

/*static checkExistingUser = async (Mail) => {
  let pool = await sql.connect(config);
  let result = await pool.request()
    .input('Mail', sql.VarChar(150), Mail)
    .query('SELECT * FROM Usuarios WHERE Mail = @Mail');
  // Comprueba si el correo electrónico existe
  console.log(result);
  if (result.recordset.length > 0) {
    return true;
    // El correo electrónico ya existe
  } else {
    console.log("creado :)")
    return false; // El correo electrónico no existe
  }
}

  static insertUsuario = async (Usuario) => {
  let returnEntity = null;
  console.log("INSERT", Usuario)
  const { Username, Password, Mail, } = Usuario;
  let pool = await sql.connect(config);
  try {
    const exists = await this.checkExistingUser(Mail);
    if (exists == true) {
      return false;
    }
    else {
      const request = new sql.Request(pool);

      returnEntity = request
        .input('Username', sql.NVarChar(150), Username)
        .input('Password', sql.NVarChar(150), Password)
        .input('Mail', sql.NVarChar(150), Mail)
        .query('INSERT INTO Usuarios (Username, Password, Mail) VALUES (@Username, @Password, @Mail)')
    }
  } catch (error) {
    console.log(error);
  }
  return returnEntity;
}*/



return (
  <View style={styles.container}>
    <Text>Register</Text>
    <TextInput placeholder="Username" />
    <TextInput placeholder="Email" />
    <TextInput placeholder="Contraseña" />
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