import React,{useState,useContext,label } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Text,View} from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/AntDesign';

import { AuthContext } from '../../context/AuthContext'
import { groupListStyles } from '../../theme/groupListTheme'
import { colors } from '../../theme/colors'
import { url_base } from '../../config/variables';
import { contactStyles } from '../../theme/contactTheme'
import { createIconSetFromFontello } from 'react-native-vector-icons';



export const ContactListItem = ({ data }) => {
    //const { state,setState } = useContext(AuthContext);

    return (
        <View style={contactStyles.box}>
            <View style={{flexDirection:'row', alignItems:"center"}}>
                <Icon name='user' size={30} style={{color:"#fff"}}/>
                <View >
                    <Text style={{...contactStyles.text,fontSize:20,color:"white"}}>{data.alias}</Text>
                    <Text style={{...contactStyles.text,color:"white"}}> {data.numero}</Text>
                </View>        
            </View>
        </View>
    )
}