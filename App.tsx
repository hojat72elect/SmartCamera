import {StatusBar} from 'expo-status-bar'
import {useState} from 'react'
import {Alert, ImageBackground, Text, TouchableOpacity, View} from 'react-native'
import {Camera, CameraCapturedPicture, CameraType, FlashMode, PermissionStatus} from 'expo-camera'
import {RootSiblingParent} from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';

export default function App() {

    let camera: Camera | null;

    const [isCameraPermissionGranted, setCameraPermission] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | null>(null)
    const [cameraType, setCameraType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(FlashMode.off);

    function askForCameraPermission() {
        Camera.requestCameraPermissionsAsync().then(permission => {
            console.log(`The permission status is :${permission.status}`);
            if (permission.status === PermissionStatus.GRANTED) {
                setCameraPermission(true);
            } else {
                setCameraPermission(false);
                Alert.alert('Access denied');
            }
        });
    }

    function takePicture() {
        camera?.takePictureAsync().then(photo => {
            console.log(photo);
            setPreviewVisible(true);
            setCapturedImage(photo);
        });
    }

    function savePhotoToDevice() {
        // Todo: to be implemented later.
        Toast.show('This feature has not been implemented yet!', {
            duration: Toast.durations.SHORT,
        });
    }

    function retakePicture() {
        setCapturedImage(null);
        setPreviewVisible(false);
        askForCameraPermission();
    }

    function toggleFlashMode() {
        if (flashMode === FlashMode.on) {
            setFlashMode(FlashMode.off);
        } else {
            setFlashMode(FlashMode.on);
        }
    }

    function switchCamera() {
        if (cameraType === CameraType.back) {
            setCameraType(CameraType.front);
        } else {
            setCameraType(CameraType.back);
        }
    }

    return (
        <RootSiblingParent>
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {isCameraPermissionGranted ? (
                    <View
                        style={{
                            flex: 1,
                            width: '100%'
                        }}
                    >
                        {previewVisible && capturedImage ? (
                            <CapturedPhotoPreview photo={capturedImage} savePhoto={savePhotoToDevice}
                                                  retakePicture={retakePicture}/>
                        ) : (
                            <Camera
                                type={cameraType}
                                flashMode={flashMode}
                                style={{flex: 1}}
                                ref={(r) => {
                                    camera = r;
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
                                            onPress={toggleFlashMode}
                                            style={{
                                                backgroundColor: flashMode === FlashMode.off ? '#000' : '#fff',
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
                                            onPress={switchCamera}
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
                                                {cameraType === CameraType.front ? '🤳' : '📷'}
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
                                                onPress={takePicture}
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
                            onPress={askForCameraPermission}
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
        </RootSiblingParent>
    );
}

type CapturedPhotoPreviewProps = {
    photo: CameraCapturedPicture;
    retakePicture: () => void;
    savePhoto: () => void;
};

const CapturedPhotoPreview = ({photo, retakePicture, savePhoto}: CapturedPhotoPreviewProps) => {
    console.log('the captured photo is this:', photo);
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
                                    color: 'black',
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
                                    color: 'black',
                                    fontSize: 20
                                }}
                            >
                                Save Photo
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
