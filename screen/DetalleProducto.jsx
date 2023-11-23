import axios from 'axios';
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import CarritoContext from '../context/CarritoContext';
import { useNavigation } from '@react-navigation/native';

function DetalleProducto({ route }) {
  const  id  = route.params;
  const [producto, setProducto] = useState(null);
  const navigation = useNavigation();
  const context = useContext(CarritoContext);

  useEffect(() => {
    console.log("producto seleccionado:", id)
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => {
        setProducto(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (producto === null) {
    return <View style={styles.container}><Text>Cargando...</Text></View>;
  }

  const agregarAlCarrito = () => {
    context.setListCarrito([...context.listCarrito, producto]);
    navigation.navigate('Carrito');
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={[producto]} // Debes proporcionar un array a FlatList
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Image source={{ uri: item.images[0] }} style={styles.productImage} />
            <Text style={styles.productRating}>Rating: {item.rating}</Text>
            <TouchableOpacity style={styles.detailButton} onPress={agregarAlCarrito}>
              <Text>Agregar al carrito</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  productItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  productRating: {
    fontSize: 14,
    marginBottom: 10,
  },
  detailButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default DetalleProducto;
