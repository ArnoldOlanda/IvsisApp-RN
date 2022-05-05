import { StyleSheet, Dimensions } from 'react-native'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const drawerStyles = StyleSheet.create({
    avatarContainer:{
        paddingVertical:10,
        alignItems:'center'
    },
    avatar :{
        width : 120,
        height : 120
    },
    menuContainer:{
        paddingLeft:20,
        height: height * 0.6,
        justifyContent:'flex-start'
    },
    menuItem:{
        marginVertical:5
    },  
    menuItemText:{
        fontSize:18
    },
    btnLogout:{
        alignSelf:'center',
        backgroundColor:'red',
        width: width * 0.4,
        height: height * 0.05,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center'   
    },
    logoutText:{
        color:'#fff'
    }
})