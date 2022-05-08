//@ts-check
import React,{ useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput,ScrollView } from 'react-native'
import { GroupListItem } from '../../components/groupList/GroupListItem'
import { dashBoardScreenStyles, styles } from '../../theme/appTheme'
import { colors } from '../../theme/colors'
import { groupListStyles } from '../../theme/groupListTheme'


export const GroupListScreen = ({ navigation }) => {

  return (
    <View style={{...dashBoardScreenStyles.container, paddingTop:0, paddingHorizontal: 5 }}>
      
      <View style={{flexDirection:'row', justifyContent:'center', paddingTop:10}}>
        <Text style={{color: colors.textPrimary, fontSize:20, position:'absolute',left:10,top:10}}>IC</Text>
        <Text style={{color: colors.textPrimary, fontSize:25 }}>Grupos</Text>
      </View>

      <View style={groupListStyles.searchGroupContainer}>
        <TextInput 
        placeholder='Buscar grupos' 
        style={{...groupListStyles.input,marginHorizontal:5}}
        />
        <Text style={{color: colors.textPrimary,paddingLeft:20}}>IC</Text>
      </View>
      <ScrollView>
        {[1,2,3,4,5,6,7,8,9,0].map((e)=>(
          <GroupListItem key={e}/>
        ))}
      </ScrollView>

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