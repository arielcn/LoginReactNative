import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { FlatList, Image } from "react-native";
import axios from "axios";

const Buscador = () => {
  const [buscador, setBuscador] = useState('');
  const [productos, setProductos] = useState()

  const handleSearch = () => {
    axios.get(`https://dummyjson.com/products/search?q=${buscador}`)
      .then(response => {
        setProductos(response.data.products);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchProductoInfo = (id) => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => {
        const producto = response.data;
        console.log(producto);
        navigation.navigate('DetalleProducto', { prod: producto });
      })
      .catch(error => {
        console.error(error);
      });
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={buscador}
          onChangeText={(text) => setBuscador(text)}
          placeholder="Buscar"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text>Buscar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={productos}
        keyExtractor={(producto) => producto.id.toString()}
        renderItem={({ item: producto }) => (
          <View style={styles.productItem} key={producto.id}>
            <Text style={styles.productTitle}>{producto.title}</Text>
            <TouchableOpacity style={styles.detailButton} onPress={() => fetchProductoInfo(producto.id)}>
              <Image source={{ uri: producto.images[0] }} style={styles.productImage} />
              <Text style={styles.textDetailButton}>Comprar</Text>
            </TouchableOpacity>
            <Text style={styles.productRating}>Rating: {producto.rating}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default Buscador;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  botonPerfil: {
    width: 50,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  productItem: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productImage: {
    width: 200,
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
    backgroundColor: 'white',
    borderRadius: 5,
    fontWeight: 'bold',
  },
  textDetailButton: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});