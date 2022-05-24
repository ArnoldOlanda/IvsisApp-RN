import React, { useEffect,useState,useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput, Dimensions,ToastAndroid,ScrollView} from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import { useFetch } from '../../hooks/useFetch'
import { dashBoardScreenStyles, styles } from '../../theme/appTheme'
import { colors } from '../../theme/colors'
import { Contact} from '../../components/groupList/Contact'
import Icon from 'react-native-vector-icons/AntDesign';
import { url_base } from '../../config/variables'
import Modal from 'react-native-modal'
import { groupListStyles } from '../../theme/groupListTheme'

export const NewGroupScreen = ({ navigation }) => {

  const { state,setState } = useContext(AuthContext);

  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [number, setNumber] = useState('')
  
  const windowWidth = Dimensions.get('window').width;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false)

  //recuperar lista de contactos
  const fetchData = async () => {
    const response = await fetch(`${ url_base }/api/usuarios/contactos/${ state.idUser }`,{
      method:'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }});
      
    const data = await response.json();
   

    setState(old=>({
      ...old,
      contactList:data.data
    }));
    
  }

  const handleRefreshData = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }
  
  useEffect(()=>{

    fetchData();


  },[])
  
  const onPressRegister = async() => {
    if(password !== confirmPassword) return ToastAndroid.show('Los passwords no coinciden',ToastAndroid.SHORT);
    if(number < 10) return ToastAndroid.show('El numero maximo de usuarios no puede ser menor a 10',ToastAndroid.LONG);

    try {
      console.log(state.groupContactList);
      const body= {
        nombre,
        password,
        maxUser:parseInt(number),
        idAdmin:parseInt(state.idUser),
        contactos:state.groupContactList
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
  const BuildContacs = () => {

    
    
    
    if (state.contactList.length < 1){
      return <Text style={{ color: 'gray', fontSize: 16 }}> No tiene contactos </Text>
              
    }else
      return state.contactList.map((e,i)=>( <Contact key={i} data={e} /> ))

  }

  const onPressAddContacts = async() => {
    setIsModalVisible(true)
    fetchData();
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
          style={styles.addContactsButton}
          onPress={ onPressAddContacts }
          >
            <Text style={styles.primaryButtonText} >Agregar numeros de contacto</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.createButton}
          onPress={ onPressRegister }
          >
            <Text style={styles.primaryButtonText} >Crear</Text>
          </TouchableOpacity>
          <Modal
            isVisible = { isModalVisible }
            animationIn={'slideInUp'}
            //onBackdropPress={()=>setIsModalVisible(false)}
            onBackButtonPress={()=>setIsModalVisible(false)}
            style={{margin:0}}
            >
              <View style={groupListStyles.modalContainer2}>
                <View style={{flexDirection:'row',justifyContent:"space-evenly"}}>
                  <Text style={{fontSize:20,width:windowWidth*0.85,textAlign:"center"}}>Lista de contactos</Text>
                  <TouchableOpacity
                  onPress={()=> {setIsModalVisible(false)
                  state.groupContactList=[]}
                  
                  }
                  >
                   <Icon name='close' size={30} color='gray' />
                  </TouchableOpacity>
                </View>
                
                <View style={{
                    paddingTop: 20,
                    paddingHorizontal:10,
                    flex: 1
                }}>
                    <ScrollView
                      
                      >
                        { 
                        
                          //console.log(state.groupList)
                          <BuildContacs/>
                          
                          
                          
                          //(<Text style={{color:colors.textPrimary}}>Loading...</Text>)*/
                          //<Contact></Contact>
                        }

                    </ScrollView>
                    <View style={{alignItems:"center"}}>
                    <TouchableOpacity
                      style={styles.fabBtn2}
                      onPress={()=> {
                        setIsModalVisible(false)}
                        }
                      
                      >
                        <Icon name='check' size={35} color='#fff' />
                      </TouchableOpacity>
                    </View>
                </View>
            </View>       
          </Modal>
      </View>
    </View>
  )
}