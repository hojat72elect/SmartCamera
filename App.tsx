import {StatusBar} from 'expo-status-bar'
import {useState} from 'react'
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native'
import {Camera, CameraCapturedPicture, CameraType, FlashMode} from 'expo-camera'
import {StartCameraUseCase} from "./src/usecases/StartCameraUseCase";


export default function App() {

    let camera: Camera | null;

    const [startCamera, setStartCamera] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | null>(null)
    const [cameraType, setCameraType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(FlashMode.off);

    const __takePicture = async () => {
        const photo = await camera?.takePictureAsync();
        console.log(photo);
        setPreviewVisible(true);
        setCapturedImage(photo ?? null);
    }

    const __savePhoto = () => {
    }


    const __retakePicture = () => {
        setCapturedImage(null);
        setPreviewVisible(false);
        StartCameraUseCase.execute().then((result) => {
            setStartCamera(result);
        });
    }


    const __handleFlashMode = () => {
        if (flashMode === 'on') {
            setFlashMode(FlashMode.off);
        } else if (flashMode === 'off') {
            setFlashMode(FlashMode.on);
        } else {
            setFlashMode(FlashMode.auto);
        }
    }


    const __switchCamera = () => {
        if (cameraType === 'back') {
            setCameraType(CameraType.front);
        } else {
            setCameraType(CameraType.back);
        }
    }


    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {startCamera ? (
                <View
                    style={{
                        flex: 1,
                        width: '100%'
                    }}
                >
                    {previewVisible && capturedImage ? (
                        <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture}/>
                    ) : (
                        <Camera
                            type={cameraType}
                            flashMode={flashMode}
                            style={{flex: 1}}
                            ref={(r) => {
                                camera = r
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row'
                                }}
                            >
                                <View
                                    style={{
                                        position: 'absolute',
                                        left: '5%',
                                        top: '10%',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={__handleFlashMode}
                                        style={{
                                            backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                                            borderRadius: 50,
                                            height: 25,
                                            width: 25
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 20
                                            }}
                                        >
                                            ⚡️
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={__switchCamera}
                                        style={{
                                            marginTop: 20,
                                            borderRadius: 50,
                                            height: 25,
                                            width: 25
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 20
                                            }}
                                        >
                                            {cameraType === 'front' ? '🤳' : '📷'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        flexDirection: 'row',
                                        flex: 1,
                                        width: '100%',
                                        padding: 20,
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <View
                                        style={{
                                            alignSelf: 'center',
                                            flex: 1,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={__takePicture}
                                            style={{
                                                width: 70,
                                                height: 70,
                                                bottom: 0,
                                                borderRadius: 50,
                                                backgroundColor: '#fff'
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </Camera>
                    )}
                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            StartCameraUseCase.execute().then((result) => {
                                setStartCamera(result);
                            });
                        }}
                        style={{
                            width: 130,
                            borderRadius: 4,
                            backgroundColor: '#14274e',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >
                            Take picture
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <StatusBar style="auto"/>
        </View>
    )
}

const CameraPreview = ({photo, retakePicture, savePhoto}: any) => {
    console.log(photo);
    return (
        <View
            style={{
                backgroundColor: 'transparent',
                flex: 1,
                width: '100%',
                height: '100%'
            }}
        >
            <ImageBackground
                source={{uri: photo && photo.uri}}
                style={{
                    flex: 1
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        padding: 15,
                        justifyContent: 'flex-end'
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <TouchableOpacity
                            onPress={retakePicture}
                            style={{
                                width: 130,
                                height: 40,

                                alignItems: 'center',
                                borderRadius: 4
                            }}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 20
                                }}
                            >
                                Re-take
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={savePhoto}
                            style={{
                                width: 130,
                                height: 40,

                                alignItems: 'center',
                                borderRadius: 4
                            }}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 20
                                }}
                            >
                                save photo
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
