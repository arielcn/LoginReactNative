import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { TextInput, TouchableOpacity, FlatList, Image } from 'react-native';


function Home() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState('')
  const [productos, setProductos] = useState([]);
  const [buscador, setBuscador] = useState('');
  useEffect(() => {
    fetchProductos();
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
  }, []);

  const limit = 10;
  const fetchProductos = () => {
    axios.get(`https://dummyjson.com/products?limit=${limit}`)
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
        navigation.navigate('DetalleProducto', { prod: producto });
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

export default Home;











