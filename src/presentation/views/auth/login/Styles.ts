import { StyleSheet } from 'react-native';
import { MyColors } from '../../../theme/AppTheme';


const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MyColors.background
    },

    headingText: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 30,
        color: MyColors.background
    },

    controllerImage: {
        height: 230,
        width: 230,
        transform: [{ rotate: "35deg" }],
        alignSelf: "flex-end"
    },

    registerButton: {
        textAlign: "center",
        marginBottom: 50,
        color: MyColors.whiteText
    },

    svgContainer: {
        backgroundColor: MyColors.primary,
        height: "45%",
        paddingTop: 50
    },

    waveSvg: {
        position: "absolute",
        top: 300,
    }
});

export default LoginStyles;