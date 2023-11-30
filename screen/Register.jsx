import { StyleSheet, Text, TextInput, View, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getFirestore } from 'firebase/firestore'

const Register = () => {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState({});
  const [apellido, setApellido] = useState('');
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [registrado, setRegistrado] = useState('')

  const handleRegister = async () => {
    if (nombre === '' || apellido === '' || pwd === '' || email === '') {
      setError('No se puede dejar en blanco')
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
          pwd,
          uid,
        });
        setNombre("");
        setApellido("");
        setEmail("");
        setPwd("");
        setError('');
        setRegistrado('Creado');
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1000)
      } catch (error) {
        console.error('Login error: ', error);
        setError('Mail ya existente ');
        setRegistrado('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Delta.png')} style={styles.delta} />
      <Text style={styles.textRegister}>Register</Text>
      <TextInput style={styles.textInput} placeholder="Nombre" onChangeText={(text) => setNombre(text)} />
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
  delta: {
    width: 450,
    height: 200,
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