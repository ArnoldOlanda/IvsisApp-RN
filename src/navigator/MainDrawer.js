import React,{ useEffect } from 'react'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Dashboard } from '../screens/Dashboard';
import { Image, Text, TouchableOpacity, useWindowDimensions, View,Alert } from 'react-native';
import { drawerStyles } from '../theme/drawerTheme';
import { GroupsStack } from './GroupsStack';

import Icon from 'react-native-vector-icons/Ionicons';



const Drawer = createDrawerNavigator();

export const MainDrawer = ( ) => {


    const { width } =useWindowDimensions();

    return (
        <Drawer.Navigator
            screenOptions={{
                //headerShown : false,
                drawerType: width >= 568 ? 'permanent' : 'front', //No ocultar cuando este el telefono en posicion horizontal
                headerStyle:{ backgroundColor:'#101025', elevation: 0 },
                headerTitleAlign:'center',
                headerTitleStyle:{ color:'#fff' },
                headerTintColor:'#fff',
                headerLeftContainerStyle:{ marginLeft:10, },
                headerRightContainerStyle:{ marginRight:20 },
                headerRight:()=>( <Icon name="settings-sharp" size={30} color="#fff" /> ),
            }}
            drawerContent = { (props) => <MenuInterno {...props}/> }
            
        >
            <Drawer.Screen name="Dashboard" component={ Dashboard } />
            <Drawer.Screen 
            name="GroupsStack" 
            component={ GroupsStack } 
            options={{headerShown:false}}
            />
        </Drawer.Navigator>
    );
}

const MenuInterno = ({ navigation }) => {
    return (
        <DrawerContentScrollView>
            <View style={drawerStyles.avatarContainer}>
                <Image 
                    source={{
                        uri : 'https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?b=1&k=20&m=1131164548&s=612x612&w=0&h=GKB8fshWs-xI9s5cvTDCuVqEBL7Mdn-yxz7gReaw4fY='
                    }}
                    style = {drawerStyles.avatar}
                />
            </View>
            <View style={drawerStyles.menuContainer}>
                <TouchableOpacity style={drawerStyles.menuItem}>
                    <Text style={drawerStyles.menuItemText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={drawerStyles.menuItem}>
                    <Text style={drawerStyles.menuItemText}>Camaras</Text>
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity
            onPress={()=>navigation.navigate("LoginScreen")} 
            style={drawerStyles.btnLogout}
            >
                <Text style={drawerStyles.logoutText}>Cerrar sesion</Text>
            </TouchableOpacity>
    
        </DrawerContentScrollView>
    )
}