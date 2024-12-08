import { Image, KeyboardType, StyleSheet, TextInput, View } from "react-native"
import { MyColors } from "../theme/AppTheme"
import Ionicons from '@expo/vector-icons/Ionicons';


interface Props {
    placeholder: string,
    ionIconName: keyof typeof Ionicons.glyphMap;
    iconColor: string,
    value: string,
    prop: string,
    keyboardType?: KeyboardType,
    secureTextEntry?: boolean,
    onChangeText: (prop: string, value: any) => void
}

export const DefaultTextInput = ({
    placeholder,
    ionIconName,
    iconColor,
    prop,
    value,
    keyboardType = 'default',
    secureTextEntry = false,
    onChangeText,
    
}: Props) => {
    return (
        <View style={styles.container}>
            <Ionicons 
                name={ionIconName}
                color={iconColor}
                style={styles.icon}
            />

            <TextInput
                placeholder={placeholder}
                style={styles.textInput}
                placeholderTextColor={MyColors.grayElements}
                value={value}
                keyboardType = {keyboardType}
                secureTextEntry ={secureTextEntry }
                autoCapitalize="none"
                onChangeText={text => onChangeText(prop, text)}
            />

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: MyColors.grayElements,
        fontSize: 18,
        margin: 20,
        marginLeft: 30,
        marginRight: 30,   
        color: MyColors.whiteText,
        flex: 1
    },
    icon: {
        padding: 5, // Espaciado alrededor del ícono
        fontSize: 30,
        marginTop: 20,
        marginLeft: 20
    },
});