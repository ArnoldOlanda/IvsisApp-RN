import React, { useEffect, useState } from 'react'
import { View, Text, Image, useWindowDimensions, TouchableOpacity, ScrollView, BackHandler } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { colors } from '../../theme/colors';
import { styles } from '../../theme/appTheme'
import { faceDetection } from '../../mlkit/faceDetection'
import { ResponseRendered } from '../../components/mlkit/ResponseRendered';



export const ViewCamerasScreen = ({navigation}) => {
  const { width: windowWidth } = useWindowDimensions()

  const [uriImage, setUriImage] = useState("")
  const [response, setResponse] = useState(undefined)
  const [aspectRatio, setAspectRatio] = useState(1)


  const onLaunchGallery = () => {
    launchImageLibrary({ mediaType: 'mixed' }, async (response) => {

      const uri = response.assets[0].uri
      setUriImage(uri);
      const response_ = await faceDetection(uri)
      if (response_?.blocks?.length > 0) {
        setResponse(response_)
        setAspectRatio(response_.height / response_.width)
      }
    })
  }

  const onLaunchCamera = () => {
    launchCamera({ saveToPhotos: true, cameraType: 'front' }, async (response) => {

      const uri = response.assets[0].uri
      setUriImage(uri);
      const response_ = await faceDetection(uri)
      if (response_?.blocks?.length > 0) {
        setResponse(response_)
        setAspectRatio(response_.height / response_.width)
      }

    })
  }

  useEffect(() => {
    navigation.setOptions({
        title:"Camaras"
    })  
  },[])

  // useEffect(() => {
  //   function handleBackButton() {
  //     setUriImage("")
  //     setResponse(undefined)
  //     setAspectRatio(1)
  //     navigation.navigate('Dashboard');
  //     return true;
  //   }
  //   handleBackButton()
  //   console.log("La navegacion cambio");
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

  //   return () => backHandler.remove();
  // }, [navigation]);

  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1
      }}>
      <ScrollView>
        {
          uriImage !== "" ? (
            <Image
              resizeMode="cover"
              resizeMethod="scale"
              style={{ width: windowWidth, height: windowWidth * aspectRatio }}
              source={{ uri: uriImage }}
            />
          ):(<View style={{ width: windowWidth, height: windowWidth * aspectRatio }}></View>)
        }
        {
          !!response && (<ResponseRendered response={response} scale={windowWidth / response.width} />)
        }
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            style={{
              ...styles.primaryButton,
              marginVertical: 10,
              marginHorizontal: 10,
              width: 120
            }}
            onPress={onLaunchGallery}
          >
            <Text style={styles.primaryButtonText} >Abrir galeria</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.primaryButton,
              marginVertical: 10,
              marginHorizontal: 10,
              width: 120
            }}
            onPress={onLaunchCamera}
          >
            <Text style={styles.primaryButtonText}>Capturar foto</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  )
}

