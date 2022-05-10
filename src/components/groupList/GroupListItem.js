import React,{ useState,useContext } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../context/AuthContext'
import { groupListStyles } from '../../theme/groupListTheme'
import { colors } from '../../theme/colors'
import { url_base } from '../../config/variables';

export const GroupListItem = ({ data }) => {

    const { state,setState } = useContext(AuthContext);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handlePressModalOptions = (id) => {
        
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

                    setState(old=>({
                    ...old,
                    groupList:old.groupList.filter((e)=>e.id!==id)
                    }));
                },
                },
                
            ]
        );
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
                    onPress={()=>handlePressModalOptions( data.id )}>
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
                                    alignItems:'center'
                                }}
                                onPress={ () => handlePressDeleteGroup(data.id) }
                                >
                                    <Icon name='trash-sharp' size={25} />
                                    <Text style={{ paddingHorizontal:10 }}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

            </View>
            <View style={groupListStyles.lineBottom}></View>
        </View>
    )
}
