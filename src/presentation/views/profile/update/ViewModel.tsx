import { useState } from "react"
import * as ImagePicker from 'expo-image-picker';
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ImagePickerAsset } from "expo-image-picker";

const ProfileUpdateViewModel = ({ GetUserUseCase, UpdateUserUseCase, UpdateWithImageUserUseCase }) => {

    const [values, setValues] = useState({
        username: '',
        image: ''
    })

    const [file, setFile] = useState<ImagePickerAsset | null>(null);
    const [response, setResponse] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const getUser = () => {
        const { result, error } = GetUserUseCase.run();
        const myUser = result as FirebaseAuthTypes.User;
        return myUser;
    }

    const update = () => {
        if (file === null || file === undefined) {
            updateWithoutImage();
        }
        else {
            updateWithImage();
        }
    }

    const updateWithoutImage = async () => {
        setLoading(true);
        const { result, error } = await UpdateUserUseCase.run(getUser().uid, values);
        setResponse(result);
        setError(error);
        setLoading(false);
    }

    const updateWithImage = async () => {
        setLoading(true);
        console.log("File state before calling updateWithImage:", file);
        const { result, error } = await UpdateWithImageUserUseCase.run(getUser().uid, values, file);
        setResponse(result);
        setError(error);
        setLoading(false);
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images', // Use the library's predefined enum
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log("ImagePicker result in pickImage:", result);

        if (!result.canceled) {
            const selectedFile = result.assets[0];
            console.log("Setting file state in pickImage:", selectedFile);
            onChange('image', selectedFile.uri);
            setFile(selectedFile); // Save the full asset, not just the URI
        }
    };


    const onChange = (prop: string, value: any) => {
        setValues({ ...values, [prop]: value });
    }

    return {
        ...values,
        file,
        response,
        error,
        loading,
        getUser,
        update,
        updateWithImage,
        onChange,
        setValues,
        pickImage,
        setError
    }
}

export default ProfileUpdateViewModel;
