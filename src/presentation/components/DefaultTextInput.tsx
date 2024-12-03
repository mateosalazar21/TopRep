import { Image, KeyboardType, StyleSheet, TextInput, View } from "react-native"
import { MyColors } from "../theme/AppTheme"
import Fontisto from '@expo/vector-icons/Fontisto';


interface Props {
    placeholder: string,
    //image: any,
    value: string,
    prop: string,
    keyboardType?: KeyboardType,
    secureTextEntry?: boolean,
    onChangeText: (prop: string, value: any) => void
}

export const DefaultTextInput = ({
    placeholder,
    //image,
    prop,
    value,
    keyboardType = 'default',
    secureTextEntry = false,
    onChangeText,
    
}: Props) => {
    return (
        <View style={styles.container}>
            {/* <Fontisto 
                name="email" // Cambia "email" por el ícono que desees de Fontisto
                size={24} 
                color={MyColors.grayElements} 
                style={styles.icon} 
            /> */}

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
        flexDirection: 'column',
        marginVertical: 20,   // Espaciado entre componentes
        marginHorizontal: 10, // Márgenes laterales
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: MyColors.grayElements,
        fontSize: 18,
        marginVertical: 20,
        marginRight: 30,
        marginLeft: 30,
        color: MyColors.whiteText
    },
    inputImage: {
        height: 25,
        width: 25,
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: MyColors.primary
    },
    icon: {
        padding: 5, // Espaciado alrededor del ícono
    },
});