import React, { useState,useContext,useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,ToastAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen'

import { styles } from '../theme/appTheme';
import { AuthContext } from '../context/AuthContext';
import { url_base } from '../config/variables';
import AppLoader from '../components/AppLoader';


export const LoginScreen = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loginPending, setloginPending] = useState(false);
  const { state,setState } = useContext(AuthContext);

  const onPressLogin = async () => {
    setloginPending(true)
    if(user.length < 1 || password.length < 1 ){
      return ToastAndroid.show('Llene todos los campos',ToastAndroid.SHORT)
    }

    try {
      const body = JSON.stringify({
        usuario:user,
        password
      })
  
      const response = await fetch(`${url_base}/api/auth/login`,{
        method:'POST',
        body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      })
  
      if(response.status == 400){
        const dat = await response.json()
        console.log(dat);
        return ToastAndroid.show('Datos incorrectos intente de nuevo',ToastAndroid.SHORT);
      }
  
      setUser('')
      setPassword('')
      
      const data = await response.json();
      const { usuario } = data;
      const nombre = data.usuario.nombre_completo;

      
      setState(old=>({
        ...old,
        idUser: usuario.id,
        nombre: usuario.nombre_completo,
        //token: data.token
      }));

      //saveTokenToDatabase(state.token)
  
      ToastAndroid.show(`Loggin as ${ nombre }`,ToastAndroid.SHORT);
      navigation.navigate('MainDrawer')
    } catch (error) {
      console.log(error);
    }
    setloginPending(false)
    ///////////////////////// Auth //////////////////////////////////////////////
    // try {
    //   await auth().signInWithEmailAndPassword(user,password)
    //   console.log("Login exitoso");
    //   ToastAndroid.show(`Loggin as ${ state.nombre }`,ToastAndroid.SHORT);
    //   console.log(state.nombre);
    // } catch (error) {
    //   console.log(error);
    // }

  }

  const saveTokenToDatabase = async (token) =>{

   try {
    if(state.idUser!==undefined){
      const response = await fetch(`${ url_base }/api/usuarios/updateNotificationToken`,{
        method:'PUT',
          body:JSON.stringify({
            id:state.idUser,
            token
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
      })
  
      if(response.status===400){
        const {err} = await response.json();
        console.log(err);
        return;
      }
      const data = await response.json();
      console.log(data);
  
      setState(old=>({
        ...old,
        token
      }))
    }
   } catch (error) {
     console.log(error);
   }
  }

  useEffect(()=>{
    messaging().getToken().then(token => {
      console.log(token);
      return saveTokenToDatabase( token );
    })

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });

  },[state.idUser])

    //Push notifications
    useEffect(() => {
      SplashScreen.hide();

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log("Notificacion recibida", remoteMessage);
      });
  
      const backgroundSuscriber = messaging().setBackgroundMessageHandler(async (remoteMessage)=> {
        console.log('Notificacion en background', remoteMessage);
      })


  
      return ()=>{
        unsubscribe();
        backgroundSuscriber();
      };
    }, []);

  return (
    <>
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
        placeholderTextColor="#BFBFBF" 
        value={user}
        onChangeText={setUser}
        autoFocus
        />
        <TextInput 
        style = {styles.input} 
        placeholder='Password' 
        placeholderTextColor="#BFBFBF" 
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
    {loginPending ? <AppLoader/>: null}
    </>
  )
}
