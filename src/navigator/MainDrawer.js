import React,{ useEffect } from 'react'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Dashboard } from '../screens/Dashboard';
import { Image, Text, TouchableOpacity, useWindowDimensions, View,Alert } from 'react-native';
import { drawerStyles } from '../theme/drawerTheme';
import { GroupsStack } from './GroupsStack';

import Icon from 'react-native-vector-icons/Ionicons';
import { ContactsStack } from './ContactsStack';
import { RegisterCameraScreen } from '../screens/Camera/RegisterCameraScreen';



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
                headerLeftContainerStyle:{ marginLeft: 10 },
                headerRightContainerStyle:{ marginRight: 10 },
                headerRight:()=>( <Icon name="settings-sharp" size={25} color="#fff" /> ),
            }}
            drawerContent = { (props) => <MenuInterno {...props}/> }
            
        >
            <Drawer.Screen name="Dashboard" component={ Dashboard } />
            <Drawer.Screen name="ContactsStack" options={{ title:"Lista de contactos" }} component={ ContactsStack } />
            <Drawer.Screen name="RegisterCameraScreen" options={{ headerShown:false }} component={ RegisterCameraScreen } />
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
                    <Icon name='person-outline' size={25} color='#000' style={{paddingRight:10}} />
                    <Text style={drawerStyles.menuItemText}>
                        Mi perfil
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={drawerStyles.menuItem}
                onPress={()=>navigation.navigate('Dashboard')}
                >
                    <Icon name='home-outline' size={25} color='#000' style={{paddingRight:10}} />
                    <Text style={drawerStyles.menuItemText}>
                        Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={drawerStyles.menuItem}>
                    <Icon name='videocam-outline' size={25} color='#000' style={{paddingRight:10}} />
                    <Text style={drawerStyles.menuItemText}>
                        Camaras</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={drawerStyles.menuItem}
                onPress={()=>navigation.navigate('GroupsStack')}
                >
                    <Icon name='people-outline' size={25} color='#000' style={{paddingRight:10}} />
                    <Text style={drawerStyles.menuItemText}>Grupos</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={drawerStyles.menuItem}
                onPress={()=>navigation.navigate('ContactsStack')}
                >
                    <Icon name='call-outline' size={25} color='#000' style={{paddingRight:10}} />
                    <Text style={drawerStyles.menuItemText}>
                        Mis contactos
                    </Text>
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