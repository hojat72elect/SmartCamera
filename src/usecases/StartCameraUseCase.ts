import {Camera, PermissionStatus} from "expo-camera";
import {Alert} from "react-native";

export class StartCameraUseCase {

    static async execute(): Promise<boolean> {

        const {status} = await Camera.requestCameraPermissionsAsync();
        console.log(status);
        if (status === PermissionStatus.GRANTED) {
            return true;
        } else {
            Alert.alert('Access denied');
            return false;
        }

    }
}
