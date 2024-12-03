import { StyleSheet } from "react-native";
import container from "../../../di/ioc";
import { MyColors } from "../../theme/AppTheme";

const HomeStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: MyColors.background
    }
})

export default HomeStyles;