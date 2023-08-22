import {ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {CameraCapturedPicture} from "expo-camera";

type CapturedPhotoPreviewProps = {
    photo: CameraCapturedPicture;
    retakePicture: () => void;
    savePhoto: () => void;
};

/**
 * When user takes a picture, they will see a preview of
 * it in this page and will be allowed to either save or
 * re-take the picture.
 *
 * @param photo The picture that was taken by user, and we show in here.
 * @param retakePicture The function that will be called when user clicks on "Re-take".
 * @param savePhoto The function that will be called when user clicks on "Save Photo".
 *
 */
export const CapturedPhotoPreview = ({photo, retakePicture, savePhoto}: CapturedPhotoPreviewProps) => {

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
