//@ts-check
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ContactsListScreen } from '../screens/Groups/ContactsListScreen';
import { ContactsList } from '../screens/Contacts/ContactsList';
import { ListContacts } from '../screens/Contacts/ListContacts';


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
      <Stack.Screen name="ContactsList"  component={ ListContacts } />
      
    </Stack.Navigator>
  );
}