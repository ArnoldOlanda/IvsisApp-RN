import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { JoinGroupScreen } from '../screens/Groups/JoinGroupScreen';
import {NewGroupScreen} from '../screens/Groups/NewGroupScreen'
import { colors } from '../theme/colors';


const Tab = createMaterialTopTabNavigator();

export const CreateGroupTabs = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      
      tabBarActiveTintColor: 'white',
      tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold'},
      tabBarItemStyle: { },
      tabBarStyle: { backgroundColor: colors.background, elevation: 0 },
      tabBarIndicatorStyle:{
        backgroundColor:'#F33030'
      }
    }}>
      
      <Tab.Screen name="JoinGroupScreen" options={{ title:"Unirse"}} component={JoinGroupScreen} />
      <Tab.Screen name="NewGroupScreen" options={{ title:"Crear"}} component={NewGroupScreen} />
      
    </Tab.Navigator>
  );
}
