import { View, Text, ImageBackground, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { ProfileStackParamList } from "../../../navigation/ProfileStackNavigator";
import { useEffect } from "react";
import { DefaultButton } from "../../../components/DefaultButton";
import styles from './Styles';
import { DefaultTextInput } from "../../../components/DefaultTextInput";
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';

import DI from "../../../../di/ioc"
import { MyColors, MyStyles } from "../../../theme/AppTheme";

interface Props extends StackScreenProps<ProfileStackParamList, 'ProfileUpdateScreen'> { };

export const ProfileUpdateScreen = ({ navigation, route }: Props) => {

    const { user } = route.params;

    const {
        username,
        image,
        file,
        loading,
        error,
        response,
        onChange,
        setValues,
        pickImage,
        takePhoto,
        update,
        updateWithImage,
        setError
    } = DI.resolve('ProfileUpdateViewModel');

    useEffect(() => {
        console.log('User param: ', user);
        setValues(user);
    }, [])

    useEffect(() => {
        if (error !== null) {
            if (error !== '') {
                Toast.show(error, Toast.LONG);
                setError('');
            }
        }

    }, [error])

    useEffect(() => {
        if (response) {
            Toast.show('Usuario actualizado correctamente', Toast.LONG);
        }

    }, [response])


    return (
        <View style={styles.container}>

            {/* Background Image */}
            <ImageBackground
                source={require('../../../../../assets/img/fifa.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.darkBox}></View>
            </ImageBackground>

            {/* Back Arrow Icon Button */}
            <TouchableOpacity
                style={styles.iconBackContainer}
                onPress={() => navigation.pop()}
            >
                <Ionicons
                    name="arrow-back-circle"
                    size={35}
                    color="white" />
            </TouchableOpacity>

            {/* Page Title */}
            <Text style={styles.title}> Editar Perfil </Text>

            {/* Edit profile image */}
            <TouchableOpacity
                style={styles.profileImageContainer}
                onPress={() => pickImage()}
            >
                {
                    image == undefined || image == ''
                        ? <Image
                            source={require('../../../../../assets/img/user_menu.png')}
                            style={styles.profileImage}
                        />
                        : <Image
                            source={{ uri: image }}
                            style={styles.profileImage}
                        />
                }
            </TouchableOpacity>


            {/* Text Input - Profile Update */}
            <View style={{ marginTop: 80 }}>
                <DefaultTextInput
                    placeholder="Nombre de usuario"
                    ionIconName="person-circle-outline"
                    iconColor="white"
                    prop="username"
                    onChangeText={onChange}
                    value={username}
                />
            </View>

            <View style={{ flex: 1 }}></View>
            {/* Update Profile Information Button */}
            <View style={styles.buttonEditProfile}>
                <DefaultButton
                    text="Actualizar perfil"
                    onPress={() => update()}
                />
            </View>

            {
                loading &&
                <ActivityIndicator
                    size='large'
                    color={MyColors.primary}
                    style={MyStyles.loading}

                />
            }

        </View>
    );
}