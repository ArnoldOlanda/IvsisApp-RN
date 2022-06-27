import 'react-native-gesture-handler';

import React from 'react'
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './src/navigator/MainStackNavigator';
import { AuthProvider } from './src/context/AuthContext';


const App = () => {


  return (
    <NavigationContainer theme= {DarkTheme}>

      <AuthProvider>

        <MainStackNavigator />
        
      </AuthProvider>

    </NavigationContainer>
  )
}


export default App;
