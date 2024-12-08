import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { ProfileStackParamList } from "../../../navigation/ProfileStackNavigator";
import { useEffect } from "react";
import { DefaultButton } from "../../../components/DefaultButton";
import styles from './Styles';
import { DefaultTextInput } from "../../../components/DefaultTextInput";
import Ionicons from '@expo/vector-icons/Ionicons';

import DI from "../../../../di/ioc"

interface Props extends StackScreenProps<ProfileStackParamList, 'ProfileUpdateScreen'> { };

export const ProfileUpdateScreen = ({ navigation, route }: Props) => {

    const { user } = route.params;

    const {
        username,
        image,
        file,
        onChange,
        setValues,
        pickImage,
        takePhoto
    } = DI.resolve('ProfileUpdateViewModel');

    useEffect(() => {
        console.log('User param: ', user);
        setValues(user);
    }, [])


    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../../../assets/img/fifa.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.darkBox}></View>
            </ImageBackground>

            <TouchableOpacity
                style={styles.iconBackContainer}
                onPress={() => navigation.pop()}
            >
                <Ionicons
                    name="arrow-back-circle"
                    size={35}
                    color="white" />
            </TouchableOpacity>

            <Text
                style={styles.title}
            >
                Perfil de Usuario
            </Text>

            {/* Edit profile image */}
            <TouchableOpacity
                style={styles.profileImageContainer}
                onPress={() => pickImage()}
            >
                {
                    image == undefined || image == ''
                        ? <Image
                            style={styles.profileImage}
                            source={require('../../../../../assets/img/user_menu.png')}
                        />
                        : <Image
                            style={styles.profileImage}
                            source={{uri: image}}
                        />
                }

            </TouchableOpacity>

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
            {/* Eddit Profile Information */}
            <View style={styles.buttonEditProfile}>
                <DefaultButton
                    text="Actualizar perfil"
                    onPress={() => {
                        navigation.navigate('ProfileUpdateScreen', { user });
                    }}
                />
            </View>

        </View>
    );
}