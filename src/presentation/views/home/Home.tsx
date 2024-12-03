import React, { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/MainStackNavigator";
import { View } from "react-native";
import styles from './Styles'
import { DefaultButton } from "../../components/DefaultButton";
import DI from "../../../di/ioc"
import Toast from 'react-native-simple-toast';

interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'> { };

export const HomeScreen = ({ navigation, route }: Props) => {

    const {

        result,
        error,
        setError, 
        logout 

    } = DI.resolve('HomeViewModel');

    useEffect(() => {
        if (error !== null) {
            if (error !== '') {
                Toast.show(error, Toast.LONG);
                setError('');
            }
        }

    }, [error])

    useEffect(() => {
      if (result === true) {
        navigation.replace('LoginScreen');
        Toast.show('Has cerrado sesión exitosamente.', Toast.LONG);
      }
    }, [result])
    

    return (
        <View style={styles.container}>
            <DefaultButton
                onPress={() => logout()}
                text="Cerrar sesión"
            />
        </View>
    );
}