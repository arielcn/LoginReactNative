import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/Login';
import Register from './screen/Register';
import Home from "./screen/Home";
import Perfil from "./screen/Perfil";
import EditarPerfil from "./screen/EditarPerfil";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='EditarPerfil' component={EditarPerfil} />
        <Stack.Screen name='Perfil' component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}