import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CarritoContext from '../context/CarritoContext';
import { Button } from '@rneui/base';

function Carrito() {
    const { listCarrito, setListCarrito } = useContext(CarritoContext);
    const navigation = useNavigation();

    const eliminarProducto = (productoId) => {
        setListCarrito(
            listCarrito.filter((producto) => producto.id !== productoId),
        );
    };

    const renderItem = ({ item }) => (
        <View key={item.id} style={styles.productItem}>
            {item.images[0] && (
                <Image
                    style={styles.productImage}
                    source={{ uri: item.images[0] }}
                    resizeMode="cover"
                />
            )}
                <TouchableOpacity onPress={() => eliminarProducto(item.id)}>
                    <Button style={styles.buttonEliminar}>Eliminar</Button>
                </TouchableOpacity>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style>Precio: U$D{item.price}</Text>
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
        backgroundColor: '#ffffff',
    },
    productItem: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
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
        marginBottom: 5,
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
    buttonEliminar: {
        color: 'red',
        padding: 10,
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
});

export default Carrito;
