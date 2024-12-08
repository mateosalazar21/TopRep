import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileInfoScreen } from '../views/profile/info/ProfileInfo';
import { ProfileUpdateScreen } from '../views/profile/update/ProfileUpdate';
import { User } from '../../domain/models/User';

export type ProfileStackParamList = {
    ProfileInfoScreen: undefined,
    ProfileUpdateScreen: {user: User},
}

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='ProfileInfoScreen'
                component={ProfileInfoScreen}
            />

            <Stack.Screen
                name='ProfileUpdateScreen'
                component={ProfileUpdateScreen}

            />
        </Stack.Navigator>
    );

}