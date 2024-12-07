import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PostListScreen } from '../views/post/list/PostList';
import { Image } from 'react-native';
import { MyPostListScreen } from '../views/post/myList/MyPostList';
import { ProfileInfoScreen } from '../views/profile/info/ProfileInfo';
import { MyColors } from '../theme/AppTheme';
import Ionicons from '@expo/vector-icons/Ionicons';

export type TabParamList = {
    PostListScreen: undefined,
    MyPostListScreen: undefined,
    ProfileInfoScreen: undefined
}

const Tab = createBottomTabNavigator<TabParamList>();

export const TabsNavigator = () => (
    <Tab.Navigator
    screenOptions={{
        headerShown: false,
        tabBarStyle:{
            backgroundColor: MyColors.background
        }
    }}>

        <Tab.Screen
            name='PostListScreen'
            component={PostListScreen}
            options={{
                title: 'Posts',
                tabBarLabel: 'Posts',

                tabBarIcon: () => (
                    <Ionicons
                        name='list'
                        size={24}
                        color={'white'}
                    />
                    
                )
            }}

        />

        <Tab.Screen
            name='MyPostListScreen'
            component={MyPostListScreen}
            options={{
                title: 'Mis Posts',
                tabBarLabel: 'Mis Posts',

                tabBarIcon: () => (
                    <Ionicons
                        name='albums'
                        size={24}
                        color={'white'}
                    />
                )
            }}

        />


        <Tab.Screen
            name='ProfileInfoScreen'
            component={ProfileInfoScreen}
            options={{
                title: 'Perfil',   
                tabBarLabel: 'Perfil',

                tabBarIcon: () => (
                    <Ionicons
                        name='person'
                        size={24}
                        color={'white'}
                    />
                )
            }}

        />

    </Tab.Navigator>
)