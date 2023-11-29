import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/Login';
import Register from './screen/Register';
import EditarPerfil from "./screen/EditarPerfil";
import DetalleProducto from "./screen/DetalleProducto";
import Carrito from "./screen/Carrito";
import Checkout from "./screen/Checkout";
import CarritoContext from "./context/CarritoContext";
import BottomTab from "./src/navigation/BottomTab";


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
  }, [listCarrito]);

  useEffect(() => {
    let cart = localStorage.getItem("carrito");

    if (cart) {
      setListCarrito(JSON.parse(cart));
    }
  }, []);

  return (
    <NavigationContainer>
      <CarritoContext.Provider value={{ listCarrito, setListCarrito }}>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='DetalleProducto' component={DetalleProducto} />
            <Stack.Screen name='Carrito' component={Carrito} />
            <Stack.Screen name='EditarPerfil' component={EditarPerfil} />
            <Stack.Screen name='Checkout' component={Checkout} />
            <Stack.Screen name='BottomTab' component={BottomTab}/>
          </Stack.Navigator>
      </CarritoContext.Provider>
    </NavigationContainer>
  );
}