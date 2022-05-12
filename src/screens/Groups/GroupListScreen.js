
import React,{ useEffect,useContext,useState } from 'react'
import { View, Text, TouchableOpacity, TextInput,ScrollView,RefreshControl } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import Icon from 'react-native-vector-icons/Ionicons';

import { useFetch } from '../../hooks/useFetch'
import { GroupListItem } from '../../components/groupList/GroupListItem'
import { dashBoardScreenStyles, styles } from '../../theme/appTheme'
import { colors } from '../../theme/colors'
import { groupListStyles } from '../../theme/groupListTheme'
import { url_base } from '../../config/variables'


export const GroupListScreen = ({ navigation }) => {

  const { state,setState } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false)
  
  // const { data } = useFetch(`http://192.168.1.34:5000/api/grupo/${ state.idUser }`,undefined,undefined)

  const fetchData = async () => {
    const response = await fetch(`${ url_base }/api/grupo/${ state.idUser }`,{
      method:'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }});
      
    const data = await response.json();

    setState(old=>({
      ...old,
      groupList:data.data
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

  return (
    <View style={{...dashBoardScreenStyles.container, paddingTop:0, paddingHorizontal: 5 }}>
      
      <View style={{flexDirection:'row', justifyContent:'center', paddingTop:10}}>
        <TouchableOpacity
        style={{position:'absolute',left:10,top:10}}
        onPress={()=> navigation.goBack()}
        >
          <Icon name='arrow-back-sharp' size={30} color='#fff' />
        </TouchableOpacity>
        <Text style={{color: colors.textPrimary, fontSize:25 }}>Mis grupos</Text>
      </View>

      <View style={groupListStyles.searchGroupContainer}>
        <TextInput 
        placeholder='Buscar grupos' 
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
          //console.log(state.groupList)
          state.groupList.map((e,i)=>( <GroupListItem key={i} data={e} /> ))
          // (<Text style={{color:colors.textPrimary}}>Loading...</Text>)
        }
      </ScrollView>

      <TouchableOpacity
      style={styles.fabBtn}
      // onPress={()=>navigation.navigate('CreateGroupTabs')}
      onPress={()=>navigation.navigate('CreateGroupTabs')}
      >
        <Icon name='enter' size={35} color='#fff' />
      </TouchableOpacity>
    </View>
  )
}
//TODO: Soluccionar bug referente al goback() confirmar cierre de sesion