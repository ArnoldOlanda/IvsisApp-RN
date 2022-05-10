import 'react-native-gesture-handler';

import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './src/navigator/MainStackNavigator';
import { AuthProvider } from './src/context/AuthContext';
// import { MenuLateralBase } from './src/navigator/MenuLateralBase';


const App = () => {
  return (
    <NavigationContainer>

      <AuthProvider>

        <MainStackNavigator />
        
      </AuthProvider>

    </NavigationContainer>
  )
}


export default App;
