import React, { useEffect } from "react";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { View, Text, Image, ImageBackground } from "react-native";
import styles from './Styles'
import { TabParamList } from "../../../navigation/TabsNavigator";
import { DefaultButton } from "../../../components/DefaultButton";
import DI from '../../../../di/ioc';
import Toast from 'react-native-simple-toast';
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/MainStackNavigator";
import { ProfileStackParamList } from "../../../navigation/ProfileStackNavigator";

interface Props extends StackScreenProps<ProfileStackParamList, 'ProfileInfoScreen'> { };
export const ProfileInfoScreen = ({ navigation, route }: Props) => {

    const {
        result,
        user,
        error,
        logout,
        getUserSession,
        setError
    } = DI.resolve('ProfileInfoViewModel');

    const nav = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        // Display errors using Toast
        if (error !== null && error !== "") {
            Toast.show(error, Toast.LONG);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getUserSession();
    }, [])


    useEffect(() => {
        if (result === true) {
            nav.replace('LoginScreen');
            Toast.show('Has cerrado sesión exitosamente.', Toast.LONG);
        }
    }, [result])

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../../../assets/img/fifa.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.darkBox}></View>
            </ImageBackground>

            <Text
                style={styles.title}
            >
                Perfil de Usuario
            </Text>

             {/* Display profile image */}
            <Image
                style={styles.profileImage}
                source={require('../../../../../assets/img/user_menu.png')}
            />

            {/* Display username and email */}
            <Text style={styles.usernameText}>{user?.username || "Username not available"}</Text>
            <Text style={styles.emailText}>{user?.email || "Email not available"}</Text>

            <View style={{ flex: 1 }}></View>

            {/* Eddit Profile Information */}
            <View style={styles.buttonEditProfile}>
                <DefaultButton
                    text="Editar perfil"
                    onPress={() => {
                        navigation.navigate('ProfileUpdateScreen', { user });
                     }}
                />
            </View>

            <View style={styles.buttonLogOut}>
                <DefaultButton
                    text="Cerrar sesión"
                    onPress={() => logout()}
                    color='white'
                    image={require('../../../../../assets/img/shutdown.png')}
                />
            </View>

        </View>
    );
}