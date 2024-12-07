import React, { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { View, Text } from "react-native";
import styles from './Styles'
import { TabParamList } from "../../../navigation/TabsNavigator";

interface Props extends StackScreenProps<TabParamList, 'ProfileInfoScreen'> { };

export const ProfileInfoScreen = ({ navigation, route }: Props) => {


    return (
        <View style={styles.container}>
            <Text
                style={{ color:'white', justifyContent:'center', alignContent:'center', top:80}}
            >
                Perfil
            </Text>
        </View>
    );
}