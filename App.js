import 'react-native-gesture-handler';

import React,{ useEffect,useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './src/navigator/MainStackNavigator';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
// import { MenuLateralBase } from './src/navigator/MenuLateralBase';
// import messaging from '@react-native-firebase/messaging';


const App = () => {


  // //Push notifications
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log("Notificacion recibida", remoteMessage);
  //   });

  //   const backgroundSuscriber = messaging().setBackgroundMessageHandler(async (remoteMessage)=> {
  //     console.log('Notificacion en background', remoteMessage);
  //   })

  //   return ()=>{
  //     unsubscribe();
  //     backgroundSuscriber();
  //   };
  // }, []);

 

  return (
    <NavigationContainer>

      <AuthProvider>

        <MainStackNavigator />
        
      </AuthProvider>

    </NavigationContainer>
  )
}


export default App;
