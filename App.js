import 'react-native-gesture-handler';

import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator} from './src/navigator/MainStackNavigator';
// import { MenuLateralBase } from './src/navigator/MenuLateralBase';


const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  )
}


export default App;
