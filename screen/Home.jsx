import axios from 'axios';
import React, { useEffect, useState } from "react";
import { ImageBackground, Button, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import {  TextInput, TouchableOpacity, FlatList, Image } from 'react-native';


const image = { uri: 'https://global-uploads.webflow.com/5ca5fe687e34be0992df1fbe/6235ea7fbaf601e8d3980228_boy-kicking-ball-on-football-field-2021-09-24-03-47-56-utc-min-min.jpg' };

function Home() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState('')
  const [productos, setProductos] = useState([]);
  const [buscador, setBuscador] = useState('');
  useEffect(() => {
      fetchProductos();
  }, []);

  const baseUrl = 'https://reqres.in';

  useEffect(async () => {
    console.log('entrasT?')
    const fetchDataFirestore = async () => {
      const auth = getAuth();
      const db = getFirestore();

      const userRef = doc(collection(db, 'users'), auth.currentUser.uid)
      const userDoc = await getDoc(userRef);
      console.log(userDoc.data());

      if (userDoc.exists) {
        setUserData(userDoc.data());
      } else {
        setUserData(null);
      }
    }
    fetchDataFirestore();
  }, [])

  const fetchProductos = () => {
    axios.get('https://dummyjson.com/products')
        .then(response => {
            setProductos(response.data.products);
        })
        .catch(error => {
            console.error(error);
        });
        console.log(productos);
  };

  const fetchProductoInfo = (id) => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => {
        const producto = response.data;
        console.log(producto);
        navigation.navigate('DetalleProducto', { producto: producto });
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handleSearch = () => {
    axios.get(`https://dummyjson.com/products/search?q=${buscador}`)
        .then(response => {
            setProductos(response.data.products);
        })
        .catch(error => {
            console.error(error);
        });
  };


  return (
    <View style={styles.container}> 
        <Button
          style={styles.botonPerfil}
          onPress={() => {
            navigation.navigate('EditarPerfil');
          }}
          title="Editar perfil"
        />
        <Text style={styles.title}>Productos</Text>
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
            <Image source={{ uri: producto.images[0] }} style={styles.productImage} />
            <Text style={styles.productRating}>Rating: {producto.rating}</Text>
            <TouchableOpacity style={styles.detailButton} onPress={() => fetchProductoInfo(producto.id)}>
              <Text>Ver Detalle</Text>
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
  botonPerfil: {
    width: 50,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
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
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
});

export default Home;











