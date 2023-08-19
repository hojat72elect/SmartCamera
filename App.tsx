import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {useState} from "react";
import {Camera, CameraType, PermissionStatus} from "expo-camera";
import {StatusBar} from "expo-status-bar";

export default function App() {

    let camera: Camera | null;
    const [startCamera, setStartCamera] = useState(false);

    const __startCamera = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        if (status === PermissionStatus.GRANTED) {
            setStartCamera(true);
        } else {
            Alert.alert("Access denied");
        }
    }

    /**
     *
     */

    return (startCamera ? (<Camera
        style={{flex: 1, width: '100%'}}
        ref={(r) => {
            camera = r;
        }}
        type={CameraType.front}
    ></Camera>) : (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TouchableOpacity style={{
                    width: 130,
                    borderRadius: 4,
                    backgroundColor: '#14274e',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                }}
                                  onPress={__startCamera}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}>
                        Take Picture
                    </Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto"/>
        </View>
    ));
}

