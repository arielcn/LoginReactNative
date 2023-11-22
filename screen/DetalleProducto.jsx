import React from "react";
import { StyleSheet, View, Text } from "react-native" 


function DetalleProducto({route, prod}) {

  const { producto } = route.params;

  JSON.stringify(producto);
  return (
    <View style={styles.container}>
      <Text>{producto.nombre}</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
export default DetalleProducto;