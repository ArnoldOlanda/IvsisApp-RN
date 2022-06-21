import React,{ useEffect,useContext,useState } from 'react'
import { View, Text, TouchableOpacity, TextInput,ScrollView,RefreshControl,Dimensions,PermissionsAndroid,ToastAndroid } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal'
import { GroupListItem } from '../../components/groupList/GroupListItem'
import { dashBoardScreenStyles, styles } from '../../theme/appTheme'
import { colors } from '../../theme/colors'
import { groupListStyles } from '../../theme/groupListTheme'
import { url_base } from '../../config/variables'
import IconAnt from 'react-native-vector-icons/AntDesign';
import Contacts from 'react-native-contacts';
import { contactStyles } from '../../theme/contactTheme'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ContactListItem } from '../../components/groupList/ContactListItem';

var contactList = []

export const ListContacts = ({ navigation }) => {
  
  const [contacts, setContacts] = useState({});
  const { state,setState } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false)
  const windowWidth = Dimensions.get('window').width;
  
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
  
  const requestAccessContacts= async() => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Contacts.getAll()
          .then((contacts) =>{
            //console.log(contacts)
            setContacts(old=>({
              ...old,
              contacts
          }));
          })
          .catch(console.log)
        }
        
    } catch (error) {
      console.log(error);
    }
    
   
  }
  
  useEffect(() => {
    fetchData();   
    requestAccessContacts();
  }, [])


  const BuildContacs = () => {
    
    //contacts lista de telefono
    //state.contacts lista de bd
    if (contacts["contacts"].length < 1){
      return <Text style={{ color: 'gray', fontSize: 16 }}> No tiene contactos </Text>
              
    }else
      if (state.contactList.length < 1){
        return contacts["contacts"].map((e,i)=>( <Contact key={i} data={e} /> ))

      }else {
        let numeros =[]
        state.contactList.forEach((e)=>{
          numeros.push(e.numero)
        });

        
        let temp2 = contacts["contacts"].filter(el => {
          if(el.phoneNumbers.length > 1){
            return !numeros.includes(el["phoneNumbers"][0]["number"])
          } else {
            return false
          }
        });
          
        return temp2.map((e,i)=>( <Contact key={i} data={e} /> ))
        }
   }
  
  
  


  const BuildContacsItem = () => {
    
    
    if (state.contactList.length < 1){
      return <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}> No tiene contactos </Text>
              
    }else
     
      return state.contactList.map((e,i)=>( <ContactListItem key={i} data={e} /> ))
  }

  const onPressRegister = async() => {
    if(contactList.length < 1) return ToastAndroid.show('Debe escoger almenos una opcion',ToastAndroid.SHORT);
    try {
      
      const body= {
        contactos:contactList
      }
      //Guardar el contacto

      
      await fetch(`${ url_base }/api/usuarios/addContact/${ state.idUser }`,{
        method:'PUT',
        body:JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }});
      
      //Actualizar la lista de contactos
      fetchData();

      
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <View style={{...dashBoardScreenStyles.container, paddingTop:0, paddingHorizontal: 5 }}>
      <View style={groupListStyles.searchGroupContainer}>
        <TextInput 
        placeholder='Buscar contactos' 
        style={{...groupListStyles.input,marginHorizontal:5}}
        />
        <Icon style={{ paddingLeft: 10 }} name='search-sharp' size={30} color='#fff' />
      </View>
      <ScrollView
      refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={handleRefreshData}
        />
      }
      >
        { 
          <BuildContacsItem/>
          
        }
      </ScrollView>

      <TouchableOpacity
      style={styles.fabBtn}
      onPress={()=>{
        setIsModalVisible(true)
        requestAccessContacts() 
        contactList =[]
        
      }}
      >
        <Icon name='enter' size={35} color='#fff' />
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
                  <Text style={{fontSize:20,width:windowWidth*0.85,textAlign:"center"}}>Agregar contactos de emergencia</Text>
                  <TouchableOpacity
                  onPress={()=> {setIsModalVisible(false)}
                  
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
                    <ScrollView>
                        { 
                          <BuildContacs/>
                        }
                    </ScrollView>
                    <View style={{alignItems:"center"}}>
                    <TouchableOpacity
                      style={styles.fabBtn2}
                      onPress={()=> {
                        if(contactList.length >= 1) setIsModalVisible(false)
                        onPressRegister()
                        }
                        }
                      >
                        <IconAnt name='check' size={35} color='#fff' />
                      </TouchableOpacity>
                    </View>
                </View> 
            </View>       
          </Modal>
    </View>
  )
}



const Contact = ({data}) => {
  const { state,setState } = useContext(AuthContext);
  const [isSelected, setSelection] = useState(false)
  const handleChange = () => {
    
    if(!isSelected){
        contactList.push({
          "nombre": data["givenName"],
          "numero": data["phoneNumbers"][0]["number"]
        })
        setSelection(!isSelected);
        
    }else{
        
        const newArray= contactList.filter(e=>{return (e.number !=data.number)})
        contactList=newArray
        setSelection(!isSelected);
    }
    console.log(contactList)
    
  };
  
  return (
    

    <View style={contactStyles.box}>
            <View style={{flexDirection:'row', alignItems:"center"}}>
                <IconAnt name='user' size={30} style={{color:"gray"}}/>
                <View >
                    <Text style={{...contactStyles.text,fontSize:20}}>{data["givenName"]}</Text>
                    <Text style={contactStyles.text}> { data.phoneNumbers.length > 1 && data["phoneNumbers"][0]["number"] }</Text>
                </View>
                
            </View>
            <BouncyCheckbox
            size={25}
            fillColor="red"
            unfillColor="#FFFFFF"
            text=""
            iconStyle={{ borderColor: "red" }}
            textStyle={{ fontFamily: "JosefinSans-Regular" }}
            onPress={handleChange}
            isChecked = {isSelected}
            style={{}}
            />
        </View>
  );


};