import React,{ useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, PermissionsAndroid,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Contacts from 'react-native-contacts';
import { colors } from '../../theme/colors';
import { styles } from '../../theme/appTheme';


export const ContactsList = () => {

    const [state, setState] = useState({
        contacts:null
    })

    
    useEffect(() => {

        try {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    'title': 'Contacts',
                    'message': 'This app would like to view your contacts.',
                    'buttonPositive': 'Please accept bare mortal'
                }
                )
            .then(Contacts.getAll()
                .then((contacts) => {
                    // work with contacts
                    console.log(JSON.stringify(contacts,null,2))
                    setState(old=>({
                        ...old,
                        contacts
                    }));
                    })
                    .catch((e) => {
                        console.log(e)
                        throw e
                    }))
        } catch (error) {
            console.log(error);
        }
       
    }, [])

    const keyExtractor = (item, idx) => {
        return item?.recordID?.toString() || idx.toString();
      };
      const renderItem = ({item, index}) => {
        return <Contact contact={item} />;
      };
    
      const Contact = ({contact}) => {
        return (
          <View style={stylesContact.contactCon}>
            <View style={stylesContact.imgCon}>
              <View style={stylesContact.placeholder}>
                <Text style={stylesContact.txt}>{contact?.givenName[0]}</Text>
              </View>
            </View>
            <View style={stylesContact.contactDat}>
              <Text style={stylesContact.name}>
                {contact?.givenName} {contact?.middleName && contact.middleName + ' '}
                {contact?.familyName}
              </Text>
              <Text style={stylesContact.phoneNumber}>
                {contact?.phoneNumbers[0]?.number}
              </Text>
            </View>
          </View>
        );
      };

    return (
      <View>
        <FlatList
            data={state.contacts}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={styles.list}
        />
        <TouchableOpacity
        style={styles.fabBtn}
        // onPress={()=>navigation.navigate('CreateGroupTabs')}
        onPress={()=>{}}
        >
          <Icon name='enter' size={35} color='#fff' />
        </TouchableOpacity>
      </View>
    );        

}

const stylesList =StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
    },
    phones:{
        fontSize:15 ,
    }
})

const stylesContact = StyleSheet.create({
    contactCon: {
      flex: 1,
      flexDirection: 'row',
      padding: 5,
      borderBottomWidth: 0.5,
      backgroundColor:colors.background,
      borderBottomColor: '#d9d9d9',
    },
    imgCon: {},
    placeholder: {
      width: 55,
      height: 55,
      borderRadius: 30,
      overflow: 'hidden',
      backgroundColor: colors.backgroundLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contactDat: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 5,
    },
    txt: {
      color: '#fff',
      fontSize: 18,
    },
    name: {
      color: '#fff',
      fontSize: 16,
    },
    phoneNumber: {
      color: '#888',
    },
  });