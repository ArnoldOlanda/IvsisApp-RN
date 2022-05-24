import React,{ useState } from 'react'
import { View,Text,TextInput,TouchableOpacity,ToastAndroid } from 'react-native'
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { colors } from '../../theme/colors'
import { styles } from '../../theme/appTheme'
import { db } from '../../database/firebase'


export const RegisterCameraScreen = () => {

  const [data, setData] = useState({
    nombre:'',
    ip:'',
    direccion:'',
    propietario:''
  })

  const handleChangeText = (name,value) => {
    setData({...data, [name]: value })
  }


  return (
    <View style={{
      backgroundColor:colors.background,
      flex: 1
      }}>
        <Text style={styles.title}>Registrar camara</Text>
        <TextInput 
        style={styles.input}
        value={data.nombre}
        placeholder='nombre' 
        onChangeText={(value)=>handleChangeText('nombre',value)}
        />
        <TextInput 
        style={styles.input}
        value={data.ip}
        placeholder='ip' 
        onChangeText={(value)=>handleChangeText('ip',value)}
        />
        <TextInput 
        style={styles.input}
        value={data.direccion}
        placeholder='direccion' 
        onChangeText={(value)=>handleChangeText('direccion',value)}
        />
        <TextInput 
        style={styles.input}
        value={data.propietario}
        placeholder='propietario' 
        onChangeText={(value)=>handleChangeText('propietario',value)}
        />
        <TouchableOpacity
          style={styles.primaryButton}
         onPress={ async ()=>{
          try {
            const dataCols = collection(db,'Camaras')
            const reg = await addDoc(dataCols,{
              nombre:data.nombre,
              ip:data.ip,
              direccion:data.direccion,
              propietario:data.propietario
            })
            
            ToastAndroid.show('Registrado',ToastAndroid.SHORT)
            setData({
              nombre:'',
              ip:'',
              direccion:'',
              propietario:''
            });
          } catch (error) {
            console.log(error);
          }
        }}
        >
          <Text style={styles.primaryButtonText}>Registrar</Text>
        </TouchableOpacity>
    </View>
  )
}
