import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CarritoContext from '../context/CarritoContext';

function Carrito() {
    const { listCarrito, setListCarrito } = useContext(CarritoContext);
    const navigation = useNavigation();

    const eliminarProducto = (productoId) => {
        setListCarrito(
            listCarrito.filter((producto) => producto.id !== productoId),
        );
    };

    const renderItem = ({ item }) => (
        <View key={item.id} style={{ marginVertical: 10 }}>
            {item.images[0] && (
                <Image
                    style={{ width: '100%', height: 150 }}
                    source={{ uri: item.images[0] }}
                    resizeMode="cover"
                />
            )}
            <Text>{item.title}</Text>
            <TouchableOpacity onPress={() => eliminarProducto(item.id)}>
                <Text style={{ color: 'red' }}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    // Implement your buy logic here
                }}
            >
                <Text style={{ color: 'green' }}>Comprar</Text>
            </TouchableOpacity>
            <Text>U$D{item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={listCarrito}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Checkout')}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Finalizar compra</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={styles.button2}
                >
                    <Text style={styles.buttonText}>Seguir comprando</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff', // Set your desired background color
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    button2: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
  })

export default Carrito;

