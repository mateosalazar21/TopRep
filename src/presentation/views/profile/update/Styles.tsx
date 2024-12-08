import { StyleSheet } from "react-native";
import { MyColors } from "../../../theme/AppTheme";

const ProfileUpdateStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: MyColors.background
    },
    backgroundImage:{
        width: 'auto',
        height: 300
    },
    darkBox:{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 'auto',
        height: 300
    },
    title:{
        color: 'white',
        fontSize: 28,
        position: 'absolute',
        justifyContent: 'center',
        alignSelf:'center',
        top: 70
    },
    profileImageContainer:{
        position: 'absolute',
        top: 220,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    profileImage:{
        width: 150,
        height: 150,
    },
    usernameText:{
        justifyContent:'center',
        alignSelf:'center',
        color:'white',
        fontSize: 20,
        marginTop: 100,
        fontStyle:'italic'
    },
    emailText:{
        justifyContent:'center',
        alignSelf:'center',
        color:'white',
        fontSize: 17,
    },
    buttonEditProfile:{
        marginBottom: 15
    },
    buttonLogOut:{
        marginBottom: 25
    },
    iconBackContainer: {
        position: "absolute",
        top: 60,
        left: 20
    },
})

export default ProfileUpdateStyles;