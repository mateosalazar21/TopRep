import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../../navigation/MainStackNavigator';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Dimensions, ToastAndroid, Platform, Alert, ActivityIndicator } from 'react-native';
import { MyColors, MyStyles } from '../../../theme/AppTheme';
import Svg, { Path } from 'react-native-svg';
import { DefaultTextInput } from '../../../components/DefaultTextInput';
import { DefaultButton } from '../../../components/DefaultButton';
import styles from './Styles'
import DI from '../../../../di/ioc'
import { useEffect } from 'react';
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';

interface Props extends StackScreenProps<RootStackParamList, 'LoginScreen'> { };

export const LoginScreen = ({ navigation, route }: Props) => {
    const {
        email,
        password,
        error,
        onChange,
        login,
        setError,
        result,
        loading,
        getUser,
        user
    } = DI.resolve("LoginViewModel");

    useEffect(() => {
        if (error !== null) {
            if (error !== '') {
                Toast.show(error, Toast.LONG);
                setError('');
            }
        }

    }, [error])

    useEffect(() => {
        if (result !== null && result !== undefined) {
            Toast.show('El usuario se ha logeado', Toast.LONG);
            navigation.replace('HomeScreen');//Replace eliminates the history of previous screens, setting HomeScreen to default
        }
    }, [result])


      useEffect(() => {
        const subscriber = auth().onAuthStateChanged( (user) => {
            if (user != null) {
                navigation.replace('TabsNavigator');
            }

        });
        return subscriber; // unsubscribe on unmount
      }, []);

    return (
        <View style={styles.container}>
            <View style={styles.svgContainer}>
                <Svg
                    viewBox="0 0 1440 320"
                    height={250}
                    width={Dimensions.get('screen').width}
                    style={styles.waveSvg}
                >
                    <Path
                        fill={MyColors.primary}
                        fill-opacity="1"
                        d="M0,128L80,106.7C160,85,320,43,480,64C640,85,800,171,960,218.7C1120,267,1280,277,1360,282.7L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
                </Svg>
                <Text style={styles.headingText}>
                    INGRESA
                </Text>
                <Text style={styles.headingText}>
                    PARA EMPEZAR
                </Text>
                <Image
                    style={styles.controllerImage}
                    source={require('../../../../../assets/img/game_con_black.png')}
                />
            </View>

            <View style={{ flex: 1 }}></View>

            <DefaultTextInput
                placeholder='Correo electrónico'
                ionIconName='mail'
                iconColor="white"
                prop='email'
                value={email}
                onChangeText={onChange}
            />

            <DefaultTextInput
                placeholder='Contraseña'
                ionIconName='lock-closed'
                iconColor="white"
                prop='password'
                value={password}
                secureTextEntry={true}
                onChangeText={onChange}
            />

            <View style={{marginVertical: 30}}>
                <DefaultButton
                    text='Inicia Sesión'
                    onPress={() => login()}
                // image={require("./assets/img/add.png")}
                />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={styles.registerButton}>
                    REGISTRATE AHORA
                </Text>
            </TouchableOpacity>
            {
                    loading && 
                    <ActivityIndicator
                        size= 'large'
                        color={MyColors.primary}
                        style={MyStyles.loading}
                
                    />
                }
        </View>

    );
}

