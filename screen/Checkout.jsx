import React from 'react';
import { View, Text, TextInput, TouchableOpacity, CheckBox, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Checkout() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su mail"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Dirección de entrega</Text>
        <TextInput
          style={styles.input}
          placeholder="Dirección"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Código postal</Text>
        <TextInput
          style={styles.input}
          placeholder="Código postal"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Número de teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
        />
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox />
        <Text style={styles.checkboxLabel}>Guardar información</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.confirmButton}
      >
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    maxWidth: 400,
    margin: 'auto',
    marginTop: 150,
  },
  formGroup: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  confirmButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
  },
});

export default Checkout;
