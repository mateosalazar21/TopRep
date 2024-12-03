import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/MainStackNavigator';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Dimensions, ToastAndroid, Platform, Alert } from 'react-native';
import { MyColors } from '../../theme/AppTheme';
import Svg, { Path } from 'react-native-svg';
import { DefaultTextInput } from '../../components/DefaultTextInput';
import { DefaultButton } from '../../components/DefaultButton';
import styles from './Styles'
import DI from '../../../di/ioc'
import { useEffect } from 'react';
import LoginViewModel from './ViewModel';

interface Props extends StackScreenProps<RootStackParamList, 'LoginScreen'>{};

export const LoginScreen = ({ navigation, route }: Props) => {
    const {email, password, error, onChange, login, setError } = DI.resolve("LoginViewModel");

    useEffect(() => {
      if (error !== '') {
        if (Platform.OS === 'android') {
            ToastAndroid.show(error, ToastAndroid.LONG);   
        }else{
            Alert.alert(error);
        }
        setError('');
      }
    }, [error])
    

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
                    source={require('../../../../assets/img/game_con_black.png')}
                />
            </View>

            <View style={{ flex: 1 }}></View>

            <DefaultTextInput
                placeholder='Correo electrónico'
                prop='email'
                value={email}
                onChangeText={onChange}
            />

            <DefaultTextInput
                placeholder='Contraseña'
                prop='password'
                value={password}
                secureTextEntry={true}
                onChangeText={onChange}
            />

            <DefaultButton
                text='Inicia Sesión'
                onPress={() => login()}
            // image={require("./assets/img/add.png")}
            />

            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.registerButton}>
                REGISTRATE AHORA
            </Text>
            </TouchableOpacity>
        </View>

    );
}

