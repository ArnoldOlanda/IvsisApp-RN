//@ts-check
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ContactsListScreen } from '../screens/Groups/ContactsListScreen';


const Stack = createStackNavigator();

export const ContactsStack = () => {
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
      <Stack.Screen name="ContactsListScreen" component={ ContactsListScreen } />
      
    </Stack.Navigator>
  );
}