import { StyleSheet, Text, TextInput, View } from 'react-native';


const Register = ({ navigation }) => {
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
    TextInput: {
        borderWidth: 1,
        padding: 5,
        marginBottom: 5,
        borderRadius: 10,
      }
});

export default Register;