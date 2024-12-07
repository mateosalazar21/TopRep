import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/MainStackNavigator";
import { View, Text, Image, Dimensions, TouchableOpacity, Platform, ToastAndroid, Alert, ActivityIndicator } from "react-native";
import styles from './Styles'
import { Svg, Path } from "react-native-svg";
import { MyColors, MyStyles } from "../../../theme/AppTheme";
import { DefaultTextInput } from "../../../components/DefaultTextInput";
import { DefaultButton } from "../../../components/DefaultButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import DI from '../../../../di/ioc'
import { useEffect } from "react";
import Toast from 'react-native-simple-toast';

interface Props extends StackScreenProps<RootStackParamList, 'RegisterScreen'> { };

export const RegisterScreen = ({ navigation, route }: Props) => {
    const {
        username,
        email,
        password,
        confirmPassword,
        error,
        onChange,
        register,
        setError,
        result,
        loading
    } = DI.resolve("RegisterViewModel");

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
        Toast.show('Usuario registrado', Toast.LONG);
        navigation.replace('HomeScreen');//Replace eliminates the history of previous screens, setting HomeScreen to default
      }
    }, [result])
    
    

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
                    REGISTRATE
                </Text>
                <Text style={styles.headingText}>
                    EN LA APP
                </Text>
                <Image
                    style={styles.controllerImage}
                    source={require('../../../../../assets/img/game_con_black.png')}
                />

                <TouchableOpacity 
                    style={styles.iconBackContainer}
                    onPress={() => navigation.pop()}
                >
                <AntDesign
                    name="leftcircle"
                    size={30} 
                    color={MyColors.secondary}
                />
                </TouchableOpacity>


            </View>

            <View style={{ flex: 1 }}></View>
                <DefaultTextInput
                    placeholder='Nombre de usuario'
                    prop='username'
                    value={username}
                    onChangeText={onChange}
                />

                <DefaultTextInput
                    placeholder='Email'
                    prop='email'
                    value={email}
                    onChangeText={onChange}
                />

                <DefaultTextInput
                    placeholder='Contraseña'
                    prop='password'
                    value={password}
                    onChangeText={onChange}
                />

                <DefaultTextInput
                    placeholder='Confirmar contraseña'
                    prop='confirmPassword'
                    value={confirmPassword}
                    onChangeText={onChange}
                />
                
                <View style={{ marginVertical: 30}}>
                    <DefaultButton
                        text="REGISTRATE"
                        onPress={() => register()}

                    />
                </View>
                {
                    loading &&
                    <ActivityIndicator
                        size= 'large'
                        color={MyColors.primary}
                        style={MyStyles.loading}

                    />
                }
        </View>
    )
}