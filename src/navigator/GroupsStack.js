//@ts-check
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GroupListScreen } from '../screens/Groups/GroupListScreen';
import { NewGroupScreen } from '../screens/Groups/NewGroupScreen';



const Stack = createStackNavigator();

export const GroupsStack = () => {
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
      <Stack.Screen name="GroupListScreen" component={ GroupListScreen } />
      <Stack.Screen name="NewGroupScreen" component={ NewGroupScreen } />
    </Stack.Navigator>
  );
}