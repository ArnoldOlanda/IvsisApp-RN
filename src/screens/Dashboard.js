import React, { useEffect,useContext } from 'react'
import { Text, TouchableOpacity, View,Dimensions, Image, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { dashBoardScreenStyles, styles } from '../theme/appTheme';

export const Dashboard = ({ navigation }) => {

    const { state,setState } = useContext(AuthContext);


    useEffect(() => {
        navigation.setOptions({
            title:state.nombre
        })  
    },[])

    useEffect(() =>{
        navigation.addListener('beforeRemove', (e) => {
            
            e.preventDefault();
            
            // Prompt the user before leaving the screen
            Alert.alert(
            'Salir',
            '¿Realmente desea cerrar la sesion?',
            [
                { text: "No, cancelar", style: 'cancel', onPress: () => {} },
                {
                text: 'Si, aceptar',
                style: 'destructive',
                onPress: () => {
                    setState({
                        idUser:undefined,
                        nombre:undefined,
                        token:undefined,
                        groupList:[]
                    })
                    console.log("se ejecuta");
                    return navigation.dispatch(e.data.action)
                },
                },
            ]
            );
        }),
        []
    });

    return (
        <View style={dashBoardScreenStyles.container}>
            <View style={dashBoardScreenStyles.categoriesContainer}>
                <TouchableOpacity 
                style={dashBoardScreenStyles.categoryButton}
                onPress={()=>navigation.navigate('GroupsStack')}
                >
                    <Image source={require('../assets/images/Vector.png')}/>
                    <Text style={dashBoardScreenStyles.categoryButtonText}>Grupos</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={dashBoardScreenStyles.categoryButton}>
                    <Image source={require('../assets/images/Vector-1.png')}/>
                    <Text style={dashBoardScreenStyles.categoryButtonText}>Ver camaras</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={dashBoardScreenStyles.categoryButton}>
                    <Image source={require('../assets/images/camera.png')}/>
                    <Text style={dashBoardScreenStyles.categoryButtonText}>Registrar camara</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={dashBoardScreenStyles.categoryButton}>
                    <Image source={require('../assets/images/Phone.png')}/>
                    <Text style={dashBoardScreenStyles.categoryButtonText}>Contactos</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
