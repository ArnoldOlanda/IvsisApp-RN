import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,ToastAndroid } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { styles } from '../theme/appTheme';

// interface Props extends StackScreenProps<any,any>{};

export const LoginScreen = ({ navigation }) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const onPressLogin = async () => {
    if(user.length < 1 || password.length < 1 ){
      return ToastAndroid.show('Llene todos los campos',ToastAndroid.SHORT)
    }

    const body = JSON.stringify({
      usuario:user,
      password
    })

    const response = await fetch('https://ivsis-api.herokuapp.com/api/auth/login',{
      method:'POST',
      body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })

    if(response.status == 400){
      return ToastAndroid.show('Datos incorrectos intente de nuevo',ToastAndroid.SHORT);
    }

    setUser('')
    setPassword('')
    
    const data = await response.json();
    const nombre = data.usuario.nombre_completo;

    ToastAndroid.show(`Loggin as ${ nombre }`,ToastAndroid.SHORT);
    navigation.navigate('MainDrawer',{ nombre })
  }

  return (
    <View style={styles.container} >

       <View>
         <View style={styles.logoContainer}>
          <Image 
          style={styles.logo}
          source={require('../assets/images/logoivsis.png')}
          />
        </View>
        <Text style={styles.title}>Iniciar Sesion</Text>
        <TextInput 
        style={styles.input} 
        placeholder='Usuario'
        value={user}
        onChangeText={setUser}
        />
        <TextInput 
        style = {styles.input} 
        placeholder='Password' 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        />

        <TouchableOpacity
        style={styles.primaryButton}
        onPress={ onPressLogin }
        >
          <Text style={styles.primaryButtonText} >INGRESAR</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footerLoginContainer}>
        <Text style={{color:'#fff'}}>¿Eres nuevo?</Text>
        <TouchableOpacity
        style={styles.secondaryButton}
        onPress={()=> navigation.navigate('RegisterScreen') }
        >
          <Text style={{color:'#fff',fontSize:16}} >Registrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
