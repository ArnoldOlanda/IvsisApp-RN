import { NativeModules } from 'react-native';

const { FaceDetection } = NativeModules;

export const faceDetection = async ( url = "") => {

   try {
        const response = await FaceDetection.detectarRostro(url)
        return response
   } catch (error) {
        console.log(error);
   }
}