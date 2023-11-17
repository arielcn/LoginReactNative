import axios from 'axios';
import React, { useEffect, useState } from "react";
import { ImageBackground, Button, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import {  TextInput, TouchableOpacity, FlatList, Image } from 'react-native';



function DetalleProducto(){
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const navigate = useNavigate();
    const context = useContext(CarritoContext);

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${id}`)
          .then(response => {
            setProducto(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, [id]);
    
      if (producto === null) {
        return <div>Cargando...</div>;
      }
    
      const agregarAlCarrito = ()=>{
    
        context.setListCarrito([...context.listCarrito, producto])
        navigate(`/Carrito`);
    
    }
    
    
    return(
        <View style={styles.container}>
            <FlatList
            data={producto}
            keyExtractor={(producto) => producto.id.toString()}
            renderItem={({ item: producto }) => (
            <View style={styles.productItem} key={producto.id}>
                <Text style={styles.productTitle}>{producto.title}</Text>
                <Image source={{ uri: producto.images[0] }} style={styles.productImage} />
                <Text style={styles.productRating}>Rating: {producto.rating}</Text>
                <TouchableOpacity style={styles.detailButton} onPress={() => agregarAlCarrito(producto.id)}>
                <Text>Agregar al carrito</Text>
                </TouchableOpacity>
            </View>
            )}
        />
      </View>

    )

}
export default DetalleProducto;