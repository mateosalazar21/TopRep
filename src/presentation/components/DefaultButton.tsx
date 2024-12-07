import { TouchableOpacity, StyleSheet, Image, Text, View } from "react-native"
import { MyColors } from "../theme/AppTheme";

interface Props {
    text: string,
    onPress: () => void,
    image?: any,
    color?: string
}

export const DefaultButton = ({
    text, 
    onPress, 
    image = require("../../../assets/img/right-arrow.png"),
    color = MyColors.primary
    }: Props) => {

    return (
        <TouchableOpacity
            style={{ ...styles.loginButton, backgroundColor: color}}
            onPress={() => onPress()}
        >
            <View></View>
            <Text style={styles.buttonText}>
                {text}
            </Text>
            <Image
                source={image}
                style={styles.loginButtonIcon}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    loginButton: {
        //backgroundColor: color,
        marginHorizontal: 30,
        height: 50,
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 25,
        flexDirection: "row"
    },
    loginButtonIcon: {
        height: 30,
        width: 30
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "bold",
        color: MyColors.background,
        marginLeft: 20
    }
})