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

interface Props extends StackScreenProps<TabParamList, 'ProfileInfoScreen'> { };
export const ProfileInfoScreen = ({ navigation, route }: Props) => {

    const { result, logout, getUserSession } = DI.resolve('ProfileInfoViewModel');
    const nav = useNavigation<StackNavigationProp<RootStackParamList>>();

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
                Nombre de Usuario
            </Text>

            <Image
                style={styles.profileImage}
                source={require('../../../../../assets/img/user_menu.png')}
            />

            <Text style={styles.usernameText}>Nombre de usuario</Text>
            <Text style={styles.emailText}>Correo electrónico</Text>

            <View style={{ flex: 1 }}></View>

            <View style={styles.buttonEditProfile}>
                <DefaultButton
                    text="Editar perfil"
                    onPress={() => { }}
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