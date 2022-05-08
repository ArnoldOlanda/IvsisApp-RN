import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent:'space-around',
    },
    logoContainer:{
        alignItems:'center'
    },
    logo:{
        width: windowWidth * 0.6,
        height: windowHeight * 0.15
    },
    footerLoginContainer:{
        alignItems:'center',
        justifyContent:'center'
    },
    title : {
        fontSize : 30,
        marginBottom : 10,
        color: colors.textPrimary,
        textAlign:'center'
    },
    input : {
        marginHorizontal:30,
        marginVertical:12,
        borderRadius:20,
        paddingHorizontal:20,
        backgroundColor:colors.inputBackground,
        height: 50
    },
    primaryButton:{
        backgroundColor:colors.buttonPrimary,
        marginHorizontal:70,
        marginVertical:12,
        borderRadius:20,
        height: 40,
        justifyContent:'center',
        alignItems:'center'
    },
    primaryButtonText:{
        color : colors.textPrimary,
        fontSize : 18,
        fontWeight : 'bold'
    },
    secondaryButton:{
        backgroundColor: colors.backgroundLight,
        width:120,
        height: 30,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:10
    },
    fabBtn:{
        width: 72,
        height: 72,
        borderRadius:50,
        backgroundColor:colors.buttonPrimary,
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        bottom: 20,
        right: 20

    }
});

export const dashBoardScreenStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: windowHeight * 0.1 
    },
    categoriesContainer:{
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'wrap'
    },
    categoryButton:{
        marginVertical:10,
        marginHorizontal:10,
        width: windowWidth * 0.4,
        height: windowHeight * 0.22,
        backgroundColor: colors.backgroundLight,
        borderRadius:20,
        padding: 5,
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    categoryButtonText:{
        color: colors.textPrimary,
        fontSize:14,
        textAlign:'center'
    }
})

