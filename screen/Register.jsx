import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <TextInput placeholder="Nombre" />
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