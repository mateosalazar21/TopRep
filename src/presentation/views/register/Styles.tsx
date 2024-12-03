import { StyleSheet } from "react-native";
import { MyColors } from "../../theme/AppTheme";

const RegisterStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MyColors.background
    },
    headingText: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft:70,
        marginTop: 10,
        color: MyColors.background
    },

    controllerImage: {
        height: 130,
        width: 130,
        transform: [{ rotate: "35deg" }],
        alignSelf: "flex-end"
    },
    svgContainer: {
        backgroundColor: MyColors.primary,
        height: "25%",
        paddingTop: 50
    },

    waveSvg: {
        position: "absolute",
        top: 120,
    },
    iconBackContainer: {
        position: "absolute",
        top: 60,
        left: 20
    },
});

export default RegisterStyles;