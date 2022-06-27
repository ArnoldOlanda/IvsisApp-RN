import React, { useState,useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput, Dimensions,ToastAndroid } from 'react-native'
import { url_base } from '../../config/variables'
import { AuthContext } from '../../context/AuthContext'
import { dashBoardScreenStyles, styles } from '../../theme/appTheme'
import { colors } from '../../theme/colors'

export const JoinGroupScreen = ({ navigation }) => {

  const { state, setState } = useContext(AuthContext)

  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
 

  
  const windowWidth = Dimensions.get('window').width;

  const onPressRegister = async () => {
    if(nombre.length<1 || password.length < 1) return ToastAndroid.show('Llene todos los campos',ToastAndroid.SHORT);

    try {
      const response = await fetch(`${ url_base }/api/usuarios/joinGroup`,{
        method:'PUT',
        body:JSON.stringify({
          usuario:state.idUser,
          grupo:nombre,
          password
        }),
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        }});

      if (response.status===400) {
        const {err} = await response.json()
        console.log(err);
        return;
      }
      const { msg } = await response.json();
      console.log(msg);

      setState(old=>({
        ...old,
        groupList:[...old.groupList,{
          id:1000,
          nombre,
          usuarios_max:50
        }]
      }))

      setNombre('')
      setPassword('')

      navigation.goBack()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{...dashBoardScreenStyles.container, paddingTop:0, paddingHorizontal: 5 }}>
      
      <View style={{flexDirection:'row', justifyContent:'center', paddingTop:10}}>
        <Text style={{color: colors.textPrimary, fontSize:25, marginVertical:20}}>Unirse a un Grupo</Text>
      </View>
      <View>
        <TextInput 
          style={styles.input} 
          placeholder='Nombre del Grupo'
          placeholderTextColor="#BFBFBF" 
          value={nombre}
          onChangeText={setNombre}
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
          style={styles.createButton}
          onPress={ onPressRegister }
          >
            <Text style={styles.primaryButtonText} >Unirse</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}
