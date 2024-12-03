import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from '../views/login/Login';
import { RegisterScreen } from '../views/register/Register';
import { HomeScreen } from '../views/home/Home';

export type RootStackParamList = {
    LoginScreen: undefined,
    RegisterScreen: undefined,
    HomeScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='LoginScreen'
                component={LoginScreen}
            />

            <Stack.Screen
                name='RegisterScreen'
                component={RegisterScreen}

            />

            <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}

            />
        </Stack.Navigator>
    );

}