import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;


export const groupListStyles = StyleSheet.create({
    input : {
        marginHorizontal:30,
        borderRadius:20,
        paddingHorizontal:20,
        marginVertical:20,
        backgroundColor:colors.inputBackground,
        height: 50,
        width: windowWidth * 0.8,
        color: 'black'
        
    },
    searchGroupContainer:{
        marginLeft:10,
        flexDirection:'row',
        alignItems:'center'
    },
    groupListItemContainer:{
        marginVertical:10,
        paddingHorizontal:15,
        flexDirection:'row'
    },
    itemMainContent:{
        width: windowWidth * 0.85
    },
    lineBottom:{
        width: windowWidth * 0.9,
        marginHorizontal:10,
        backgroundColor:'gray',
        height: 0.5,
        justifyContent:'center'
    },
    modalContainer:{
        width: windowWidth,
        height: windowHeight * 0.3,
        backgroundColor:'white',
        borderRadius:20,
        bottom: -20,
        padding: 10
    },
    modalContainer2:{
        width: windowWidth,
        height: windowHeight * 0.7,
        backgroundColor:'white',
        borderRadius:20,
    
        padding: 10
    },
    modalEditContainer:{
        backgroundColor:'#fff',
        height:windowHeight * 0.4,
        borderRadius:20,
        bottom: -20,
        width: windowWidth,
        padding: 10
    },
    inputModalStyle:{
        borderWidth:2,
        borderRadius:20,
        borderColor:colors.buttonPrimary,
        marginVertical:5,
        paddingHorizontal:10
    }   
})