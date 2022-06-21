import React,{ useState,useContext } from 'react'
import { View, Text, TouchableOpacity, Alert,TextInput, Linking,Button,ToastAndroid } from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../context/AuthContext'
import { groupListStyles } from '../../theme/groupListTheme'
import { colors } from '../../theme/colors'
import { url_base } from '../../config/variables';
import { styles } from '../../theme/appTheme';

export const GroupListItem = ({ data }) => {

    
    const { state,setState } = useContext(AuthContext);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalEditVisible, setModalEditVisible] = useState(false);

    const [nombre, setNombre] = useState(data.nombre)

    const handlePressModalOptions = () => {
        
        setIsModalVisible(true)
    }

    const handlePressDeleteGroup = (id) => {
        Alert.alert(
            'Eliminar',
            `¿Realmente desea eliminar el grupo ${ data.nombre } ?`,
            [
                { text: "No, cancelar", style: 'cancel', onPress: () => {setIsModalVisible(false)} },
                {
                text: 'Si, eliminar',
                style: 'destructive',
                onPress: async () => {
                    console.log('Grupo eliminado')
                    const response = await fetch(`${ url_base }/api/grupo/${ id }`,{
                        method:'DELETE',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                    }});

                    const data = await response.json();
                    console.log(data);

                    setIsModalVisible(false)

                    setState(old=>({
                    ...old,
                    groupList:old.groupList.filter((e)=>e.id!==id)
                    }));
                },
                },
                
            ]
        );
    }

    const handlePressUpdateGroup = async (id) => {


        const response = await fetch(`${url_base}/api/grupo/${id}`,{
            method:'PUT',
            body:JSON.stringify({nombre}),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        
        if (response.status === 400) {
            const {err} = await response.json();
            console.log(err);
            return;
        }
        const { msg } = await response.json();
        // console.log(data);
        setState(old=>({
            ...old,
            groupList:old.groupList.map(e=>{
                if(e.id===id){
                    e.nombre = nombre
                }
                return e;
            })
        }))
        ToastAndroid.show(msg,ToastAndroid.SHORT);
        setModalEditVisible(false);   
        setNombre(data.nombre)
    }

    return (
        <View>
            <View style={groupListStyles.groupListItemContainer}>
                <View style={groupListStyles.itemMainContent}>
                    <Text style={{ color: colors.textPrimary, fontSize: 20 }}>{ data.nombre }</Text>
                    <Text style={{ color: 'gray', fontSize: 16 }}>{ data.usuarios_max } miembros</Text>
                </View>
                <View style={{ alignItems: 'center',flexDirection:'row' }}>
                    <TouchableOpacity
                    onPress={handlePressModalOptions}>
                        <Icon name='ellipsis-vertical-sharp' size={25} color='#fff'/>
                    </TouchableOpacity>
                    <Modal
                    isVisible = { isModalVisible }
                    animationIn={'slideInUp'}
                    onBackdropPress={()=>setIsModalVisible(false)}
                    onBackButtonPress={()=>setIsModalVisible(false)}
                    style={{margin:0,justifyContent:'flex-end'}}
                    >
                        <View style={groupListStyles.modalContainer}>
                            <Text style={{textAlign:'center',fontSize:20}}>{ data.nombre }</Text>
                            <View style={{
                                paddingTop: 20,
                                paddingHorizontal:10,
                                flex: 1
                            }}>
                                <TouchableOpacity
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    marginBottom:10
                                }}
                                onPress={ () => handlePressDeleteGroup(data.id) }
                                >
                                    <Icon name='trash-sharp' size={25} />
                                    <Text style={{ paddingHorizontal:10,fontSize: 18 }}>Eliminar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center'
                                }}
                                onPress={ () => {
                                    setIsModalVisible(false)
                                    setModalEditVisible(true)
                                } }
                                >
                                    <Icon name='create-sharp' size={25} />
                                    <Text style={{ paddingHorizontal:10,fontSize: 18 }}>Editar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
                <Modal
                isVisible={ modalEditVisible }
                animationIn={ 'slideInUp' }
                onBackButtonPress={()=>{
                    setModalEditVisible(false)
                    setNombre(data.nombre)
                    //setIsModalVisible(true)
                }}
                style={{margin:0,justifyContent:'flex-end'}}
                >
                    <View style={groupListStyles.modalEditContainer}>
                        <Text style={{textAlign:'center',fontSize:20}}>Editar info de grupo</Text>
                        <TextInput 
                        style={groupListStyles.inputModalStyle}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder='Nombre'
                        autoFocus
                        />
                        {/* <Button 
                        title="open wsp" 
                        onPress={ async ()=>{
                            await Linking.openURL('https://www.google.com')
                        }}
                        /> */}
                        <TouchableOpacity 
                        style={styles.primaryButton}
                        onPress={()=>handlePressUpdateGroup(data.id)}
                        >
                            <Text style={styles.primaryButtonText} > Actualizar  </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            <View style={groupListStyles.lineBottom}></View>
        </View>
    )
}
