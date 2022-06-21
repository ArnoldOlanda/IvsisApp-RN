package com.ivsisappjs.mlkit;


import android.graphics.PointF;
import android.graphics.Rect;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.face.Face;
import com.google.mlkit.vision.face.FaceContour;
import com.google.mlkit.vision.face.FaceDetection;
import com.google.mlkit.vision.face.FaceDetector;
import com.google.mlkit.vision.face.FaceDetectorOptions;
import com.google.mlkit.vision.face.FaceLandmark;

import java.io.IOException;
import java.util.List;

public class FaceDetectionModule extends ReactContextBaseJavaModule {

    FaceDetectionModule(ReactApplicationContext context){
        super(context);
    }

    @Override
    public String getName() {
        return "FaceDetection";
    }
    public WritableMap getRectMap(Rect rect){
        WritableMap rectObject = Arguments.createMap();
        rectObject.putInt("left",rect.left);
        rectObject.putInt("top",rect.top);
        rectObject.putInt("width",rect.right - rect.left);
        rectObject.putInt("height",rect.bottom - rect.top);

        return rectObject;
    }

    @ReactMethod
    public void detectarRostro(String url, Promise promise) {
        Log.d("FaceDetectionModule", "Se ha detectado el rostro");

        InputImage image;
        Uri uri = Uri.parse(url);
        try {
            image = InputImage.fromFilePath(getReactApplicationContext(), uri);

            FaceDetector detector =  FaceDetection.getClient();
            Task<List<Face>> result =
                    detector.process(image)
                            .addOnSuccessListener(
                                    new OnSuccessListener<List<Face>>() {
                                        @Override
                                        public void onSuccess(List<Face> faces) {
                                            // Task completed successfully
                                            // ...
                                            WritableMap response = Arguments.createMap();
                                            response.putInt("width",image.getWidth());
                                            response.putInt("height",image.getHeight());

                                            WritableArray blocks = Arguments.createArray();
                                            for (Face face : faces) {
                                                WritableMap blockObject = Arguments.createMap();
                                                blockObject.putMap("rect",getRectMap(face.getBoundingBox()));

                                                Rect bounds = face.getBoundingBox();
                                                Log.d("FaceDetectionModule", "Se ha detectado el rostro" + bounds);
                                                //float rotY = face.getHeadEulerAngleY();  // Head is rotated to the right rotY degrees
                                                //float rotZ = face.getHeadEulerAngleZ();  // Head is tilted sideways rotZ degrees

                                                // If landmark detection was enabled (mouth, ears, eyes, cheeks, and
                                                // nose available):
                                                /*FaceLandmark leftEar = face.getLandmark(FaceLandmark.LEFT_EAR);
                                                if (leftEar != null) {
                                                    PointF leftEarPos = leftEar.getPosition();
                                                }

                                                // If contour detection was enabled:
                                                List<PointF> leftEyeContour =
                                                        face.getContour(FaceContour.LEFT_EYE).getPoints();
                                                List<PointF> upperLipBottomContour =
                                                        face.getContour(FaceContour.UPPER_LIP_BOTTOM).getPoints();

                                                // If classification was enabled:
                                                if (face.getSmilingProbability() != null) {
                                                    float smileProb = face.getSmilingProbability();
                                                }
                                                if (face.getRightEyeOpenProbability() != null) {
                                                    float rightEyeOpenProb = face.getRightEyeOpenProbability();
                                                }

                                                // If face tracking was enabled:
                                                if (face.getTrackingId() != null) {
                                                    int id = face.getTrackingId();
                                                }*/
                                                blocks.pushMap(blockObject);
                                            }
                                            response.putArray("blocks",blocks);
                                            promise.resolve(response);
                                        }
                                    })
                            .addOnFailureListener(
                                    new OnFailureListener() {
                                        @Override
                                        public void onFailure(@NonNull Exception e) {
                                            // Task failed with an exception
                                            // ...

                                            promise.reject("Create Event Error", e);
                                        }
                                    });
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
