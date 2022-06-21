import { StyleSheet, Dimensions } from 'react-native'
import { colors } from './colors';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const contactStyles = StyleSheet.create({
    box:{
        //backgroundColor:colors.buttonSecondary,
        height: 60,
        borderRadius:20,
        marginVertical:8,
        flexDirection:'row',
        flex: 1,
        
        //alignItems: "space",
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    text:{
        marginHorizontal:20,
        color: "#fff",
        //height: 20,
        //borderColor:"white",
        //borderWidth:1,
        
    }
})