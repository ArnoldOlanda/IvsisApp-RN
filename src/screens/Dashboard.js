import React, { useEffect,useContext } from 'react'
import { Text, TouchableOpacity, View,Dimensions, Image, Linking,Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { dashBoardScreenStyles, styles } from '../theme/appTheme';

export const Dashboard = ({ navigation }) => {

    const { state,setState } = useContext(AuthContext);
    const windowWitdth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        navigation.setOptions({
            title:state.nombre
        })  
    },[])

    useEffect(() => {
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

                    setState(old=>({
                        ...old,
                        contactList:[]
                    }))
                    
                    return navigation.dispatch(e.data.action)
                },
                },
            ]);
        });
    },[navigation]);

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
                
                <TouchableOpacity 
                style={dashBoardScreenStyles.categoryButton}
                onPress={()=>navigation.navigate('LiveCameraDeteccion')}
                >
                    <Image source={require('../assets/images/Vector-1.png')}/>
                    <Text style={dashBoardScreenStyles.categoryButtonText}>Ver camaras (BETA)</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                style={dashBoardScreenStyles.categoryButton}
                onPress={()=>navigation.navigate('RegisterCameraScreen')}
                >
                    <Image source={require('../assets/images/camera.png')}/>
                    <Text style={dashBoardScreenStyles.categoryButtonText}>Registrar camara</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                style={dashBoardScreenStyles.categoryButton}
                onPress={()=>navigation.navigate('ContactsStack')}
                >
                    <Image source={require('../assets/images/Phone.png')}/>
                    <Text style={dashBoardScreenStyles.categoryButtonText}>Contactos</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                flex: 1,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'flex-end',
                bottom: 20
            }}>
                <TouchableOpacity 
                style={{
                    backgroundColor:'red',
                    borderRadius:20,
                    width: windowWitdth * 0.8,
                    height: windowHeight * 0.06,
                    justifyContent:'center',
                    alignItems:'center'
                }}
                onPress={()=>{
                    Linking.openURL('https://forms.gle/nESF61BQNi5hg4Po9')
                }}
                >
                    <Text style={{fontSize:18,color:'#fff'}}>¡Dinos lo que piensas!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
