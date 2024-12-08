import { useState } from "react"
import * as ImagePicker from 'expo-image-picker';

const ProfileUpdateViewModel = () => {

    const [values, setValues] = useState({
        username: '',
        image: ''
    })

    const [file, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            onChange('image', result.assets[0].uri);
            setImage(result.assets[0].uri);
        }
    };
    
    const takePhoto = async () => {
        // No permissions request is necessary for launching the camera
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            onChange('image', result.assets[0].uri);
            setImage(result.assets[0].uri);
        }
    };

    const onChange = (prop: string, value: any) => {
        setValues({ ...values, [prop]: value });
    }

    return {
        ...values,
        file,
        onChange,
        setValues,
        pickImage,
        takePhoto
    }
}

export default ProfileUpdateViewModel;
