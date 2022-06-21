import React, { useState,useRef } from 'react'
import {StyleSheet,Text,View,Dimensions} from 'react-native'
import { RNCamera } from 'react-native-camera'


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const LiveCameraDeteccionScreen = () => {

  const [type, setType] = useState(RNCamera.Constants.Type.front);
  const [box, setBox] = useState(null);
  const cameraRef = useRef(null);

  const handleFace = ( data ) => {
    // console.log(faces);
    if(data.faces){
      setBox({
        boxs:{
          width: data.faces[0].bounds.size.width,
          height: data.faces[0].bounds.size.height,
          x: data.faces[0].bounds.origin.x,
          y: data.faces[0].bounds.origin.y,
          yawAngle: data.faces[0].yawAngle,
          rollAngle: data.faces[0].rollAngle,
        },
        rightEyePosition: data.faces.rightEyePosition, 
        leftEyePosition: data.faces.leftEyePosition,
        bottomMounthPostion: data.faces.bottomMounthPostion,
      })
    }else{
      setBox(null);
    }
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ cameraRef }
        style = {styles.camera}
        type = {type}
        captureAudio={false}
        onFacesDetected={handleFace}
      />
      {
        box && (
          <>
            <View
            style={styles.bound({
              width: box.boxs.width,
              height: box.boxs.height,
              x: box.boxs.x,
              y: box.boxs.y,
            })}
            ></View>
          </>
        )
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'gray'
  },
  camera:{
    flexGrow:1,
  },
  bound:({width,height,x,y})=>{
    return{
      position : 'absolute',
      top: y,
      left: x,
      width,
      height,
      borderWidth:5,
      borderColor:'red',
      zIndex:3000
    }
  }
})