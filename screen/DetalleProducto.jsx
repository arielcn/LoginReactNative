import axios from 'axios';
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import CarritoContext from '../context/CarritoContext';
import { useNavigation } from '@react-navigation/native';


function DetalleProducto({ route }) {
  const id = route.params.prod.id;
  const [producto, setProducto] = useState(null);
  const navigation = useNavigation();
  const context = useContext(CarritoContext);

  useEffect(() => {
    console.log("producto seleccionado:", id);
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => {
        console.log("sus", response)
        setProducto(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

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
        data={[producto]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Image source={{ uri: item.images[0] }} style={styles.productImage} />
            <Text style={styles.productRating}>Rating: {item.rating}</Text>
            <TouchableOpacity style={styles.detailButton} onPress={agregarAlCarrito}>
              <Text style={styles.buttonText}>Agregar al carrito</Text>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  productItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 5,
  },
  productRating: {
    fontSize: 16,
    color: "green",
    marginBottom: 5,
  },
  detailButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
})
export default DetalleProducto;
