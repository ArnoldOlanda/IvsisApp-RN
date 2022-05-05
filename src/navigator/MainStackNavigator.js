import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { MainDrawer } from './MainDrawer';

//Definimos los parametros para cada uno de nuestros screen que estan en el stack
// export type RouteStackParams = {
//   LoginScreen:undefined,
//   RegisterScreen:undefined,
//   MainDrawer:{ nombre:string }
// }

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle :{
          elevation : 0,
          //shadowColor : 'transparent' --opcion solo disponible para ios
        },
        cardStyle : { backgroundColor : 'white' },
        headerShown:false //Oculta el header del stack
      }}
    >
      <Stack.Screen name="LoginScreen" component={ LoginScreen } />
      <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
      <Stack.Screen name="MainDrawer" options={{ title:"Dashboard" }} component={ MainDrawer } />
    </Stack.Navigator>
  );
}