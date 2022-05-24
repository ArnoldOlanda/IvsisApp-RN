import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image, ToastAndroid, ScrollView } from 'react-native';
import { styles } from '../theme/appTheme';
import { url_base } from '../config/variables'


export const RegisterScreen = ({ navigation }) => {
    
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [direccion, setDireccion] = useState('')
    const [usuario, setUsuario] = useState('')    
    const [password, setPassword] = useState('')

    const onPressRegister = async () => {
        
        if( nombre.length    < 1 ||
            apellidos.length < 1 ||
            direccion.length < 1 ||
            usuario.length   < 1 ||
            password.length  < 1 ) {
                return ToastAndroid.show('Llene todos los campos',ToastAndroid.SHORT)
            }
        const nombreCompleto =  `${ nombre } ${ apellidos }`;

        const body = {
            nombre:nombreCompleto,
            usuario,
            password,
            direccion
        }

        console.log(body);

        const response = await fetch(`${ url_base }/api/usuarios`,{
            method:'POST',
            body:JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        })

        const data = await response.json()

        if (response.status == 400){
            return console.log( data.err );
        }

        ToastAndroid.show(data.msg,ToastAndroid.SHORT);

        setNombre('');
        setApellidos('');
        setDireccion('');
        setUsuario('');
        setPassword('');

        navigation.navigate('LoginScreen')
    }

    // const onPressRegister = async () => {
    //     auth()
    //         .createUserWithEmailAndPassword(usuario, password)
    //         .then(() => {
    //             console.log('User account created & signed in!');
    //             ToastAndroid.show('User account created & signed in!',ToastAndroid.SHORT)
    //         })
    //         .catch(error => {
    //             if (error.code === 'auth/email-already-in-use') {
    //             console.log('That email address is already in use!');
    //             ToastAndroid.show('That email address is already in use!',ToastAndroid.SHORT)
    //             }

    //             if (error.code === 'auth/invalid-email') {
    //             console.log('That email address is invalid!');
    //             ToastAndroid.show('That email address is invalid!',ToastAndroid.SHORT)
    //             }

    //             console.error(error);
    //         });
    // }
    
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
                <ScrollView>
                    <TextInput
                    style={styles.input} 
                    placeholder='Nombre'
                    value={nombre}
                    onChangeText={setNombre} 
                    />

                    <TextInput
                    style={styles.input} 
                    placeholder='Apellidos'
                    value={apellidos}
                    onChangeText={setApellidos} 
                    />

                    <TextInput
                    style={styles.input} 
                    placeholder='Direccion'
                    value={direccion}
                    onChangeText={setDireccion} 
                    />

                    <TextInput
                    style={styles.input} 
                    placeholder='Usuario'
                    value={usuario}
                    onChangeText={setUsuario} 
                    />

                    <TextInput
                    style={styles.input} 
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword} 
                    secureTextEntry
                    />

                    <TouchableOpacity 
                    style={styles.primaryButton}
                    onPress={onPressRegister}
                    >
                        <Text style={styles.primaryButtonText}>Registrarse</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
           
        </View>
  )
}
