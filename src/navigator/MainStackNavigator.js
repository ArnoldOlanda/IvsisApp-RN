import React,{useState, useContext, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { MainDrawer } from './MainDrawer';

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