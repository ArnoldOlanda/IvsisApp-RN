import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react'
import { Text, View, Button, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { styles } from '../theme/appTheme';


export const RegisterScreen = ({ navigation }) => {
    
    const [data, setData] = useState({
        nombre:'',
        apellidos:'',
        direccion:'',
        usuario:'',
        password:''
    })

    const onPressRegister = () => {
        
        let element //Especificar que elementos va a manejar el iterador

        for (element in data) {   
            if(data[element].length<1) return ToastAndroid.show('Llene todos los campos',ToastAndroid.SHORT)
        }

        navigation.navigate('LoginScreen')
    }
    
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.logoContainer}>
                    <Image 
                    style={styles.logo}
                    source={require('../assets/images/logoivsis.png')}
                    />
                </View>

                <Text style={styles.title}>Registrate</Text>
                <TextInput
                style={styles.input} 
                placeholder='Nombre' 
                />

                <TextInput
                style={styles.input} 
                placeholder='Apellidos' 
                />

                <TextInput
                style={styles.input} 
                placeholder='Direccion' 
                />

                <TextInput
                style={styles.input} 
                placeholder='Usuario' 
                />

                <TextInput
                style={styles.input} 
                placeholder='Password' 
                secureTextEntry
                />

                 <TouchableOpacity 
                style={styles.primaryButton}
                onPress={onPressRegister}
                >
                    <Text style={styles.primaryButtonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
           
        </View>
  )
}
