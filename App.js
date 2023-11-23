import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/Login';
import Register from './screen/Register';
import Home from "./screen/Home";
import Perfil from "./screen/Perfil";
import EditarPerfil from "./screen/EditarPerfil";
import DetalleProducto from "./screen/DetalleProducto";
import CarritoContext from "./context/CarritoContext";


const Stack = createStackNavigator();

// Your web app's Firebase configuration

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBUDWMNl16fbXfMZ371Ckoat3nhdp2sHNw",
  authDomain: "loginrn-177ce.firebaseapp.com",
  projectId: "loginrn-177ce",
  storageBucket: "loginrn-177ce.appspot.com",
  messagingSenderId: "491863168306",
  appId: "1:491863168306:web:c991c6923cefb82113f32b"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



export default function App() {

  const [listCarrito, setListCarrito] = useState([]);
  
  useEffect(() => {
      localStorage.setItem("carrito", JSON.stringify(listCarrito));
  },[listCarrito]);

  useEffect(() => {
    let cart = localStorage.getItem("carrito");

    if (cart) {
      setListCarrito(JSON.parse(cart));
    }
  },[]);

  return (
    <NavigationContainer>
      <CarritoContext.Provider value={{listCarrito, setListCarrito}}>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='DetalleProducto' component={DetalleProducto} />
          <Stack.Screen name='EditarPerfil' component={EditarPerfil} />
          <Stack.Screen name='Perfil' component={Perfil} />
        </Stack.Navigator>
      </CarritoContext.Provider>
    </NavigationContainer>
  );
}