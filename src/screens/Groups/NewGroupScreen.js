import React, { useState,useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput, Dimensions,ToastAndroid } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import { useFetch } from '../../hooks/useFetch'
import { dashBoardScreenStyles, styles } from '../../theme/appTheme'
import { colors } from '../../theme/colors'

import Icon from 'react-native-vector-icons/Ionicons';
import { url_base } from '../../config/variables'

export const NewGroupScreen = ({ navigation }) => {

  const { state,setState } = useContext(AuthContext);

  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [number, setNumber] = useState('')
  
  const windowWidth = Dimensions.get('window').width;

  const onPressRegister = async() => {
    if(password !== confirmPassword) return ToastAndroid.show('Los passwords no coinciden',ToastAndroid.SHORT);
    if(number < 10) return ToastAndroid.show('El numero maximo de usuarios no puede ser menor a 10',ToastAndroid.LONG);

    try {
      const body= {
        nombre,
        password,
        maxUser:parseInt(number),
        idAdmin:parseInt(state.idUser)
      }
      //Guardar el grupo
      await fetch(`${ url_base }/api/grupo/`,{
        method:'POST',
        body:JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }});
      
      //Actualizar la lista de grupos

      const response = await fetch(`${ url_base }/api/grupo/${ state.idUser }`,{
        method:'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }});

      const data = await response.json();
      console.log(data);

      setState(old=>({
        ...old,
        groupList:data.data
      }));
      
      navigation.navigate("GroupListScreen");

      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{...dashBoardScreenStyles.container, paddingTop:0, paddingHorizontal: 5 }}>
      
      <View style={{flexDirection:'row', justifyContent:'center', paddingTop:10}}>       
        <Text style={{color: colors.textPrimary, fontSize:25, marginBottom:40}}>Crear Grupo</Text>
      </View>
      <View>
        <TextInput 
          style={styles.input} 
          placeholder='Nombre del grupo'
          value={nombre}
          onChangeText={setNombre}
          />
          <TextInput 
          style = {styles.input} 
          placeholder='Password' 
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          />
          <TextInput 
          style = {styles.input} 
          placeholder='Confirmar Password' 
          secureTextEntry
          value={confirmPassword}
          onChangeText={setconfirmPassword}
          />
          
          <View style={{ flexDirection:'row',justifyContent: 'space-between', marginHorizontal:30,width:windowWidth * 0.82,marginVertical:12}}>
            <Text style={{color: colors.textPrimary, fontSize:14, height: 50, width: windowWidth * 0.6,paddingVertical:10,paddingLeft:20}}>Numero maximo de usuarios</Text>
            
            <TextInput 
            style={styles.inputNumber} 
            placeholder='0'
            value={number}
            onChangeText={setNumber}
            keyboardType='numeric'

            />
          </View>
          

          <TouchableOpacity
          style={styles.createButton}
          onPress={ onPressRegister }
          >
            <Text style={styles.primaryButtonText} >Crear</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}