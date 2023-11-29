import React from "react";
import Home from "../../screen/Home";
import Perfil from "../../screen/Perfil";
import Buscador from "../../screen/Buscador";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator style={styles.container}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name='Buscador' component={Buscador} />
            <Tab.Screen name="Perfil" component={Perfil} />
        </Tab.Navigator>
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
})

export default BottomTab;
