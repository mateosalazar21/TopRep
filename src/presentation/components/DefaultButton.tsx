import { TouchableOpacity, StyleSheet, Image, Text, View } from "react-native"
import { MyColors } from "../theme/AppTheme";

interface Props {
    text: string,
    onPress: () => void,
    image?: any
}

export const DefaultButton = ({text, onPress, image = require("../../../assets/img/right-arrow.png")}: Props) => {
    return (
        <TouchableOpacity
            style={styles.loginButton}
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
        backgroundColor: MyColors.primary,
        marginTop: 50,
        marginBottom: 40,
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