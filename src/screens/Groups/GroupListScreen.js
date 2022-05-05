//@ts-check
import React,{ useEffect } from 'react'
import { View,Text,TouchableOpacity,Button,BackHandler } from 'react-native'
import { dashBoardScreenStyles, styles } from '../../theme/appTheme'
import { colors } from '../../theme/colors'


export const GroupListScreen = ({ navigation }) => {

  return (
    <View style={{...dashBoardScreenStyles.container,paddingTop:0}}>
        <Text style={{color: colors.textPrimary}}>GroupListScreen</Text>
        <TouchableOpacity
        style={styles.fabBtn}
        onPress={()=>navigation.navigate('NewGroupScreen')}
        >
          <Text style={{color:colors.textPrimary,fontSize:40}}>+</Text>
        </TouchableOpacity>
    </View>
  )
}
//TODO: Soluccionar bug referente al goback() confirmar cierre de sesion