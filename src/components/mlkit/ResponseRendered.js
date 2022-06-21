import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

export const ResponseRendered = ({ response, scale }) => {
  return (
    <View style={StyleSheet.absoluteFillObject}>
        {
            response.blocks.map((block,i)=>{
                return(
                    <View key={i} style={{
                        position:'absolute', 
                        borderColor:'red',
                        borderWidth:1,
                        width: block.rect.width * scale,
                        height: block.rect.height * scale,
                        left: block.rect.left * scale,
                        top: block.rect.top * scale
                    }}>
                    </View>
                )
            })
        }
    </View>
  )
}
