import { StyleSheet, TextInput } from "react-native";
import { PRIMARY_COLOR } from "../../constants/globalStyles";

const styleFormulario = StyleSheet.create({
    card:{
      flex:1,
      margin:15,
      flexDirection: 'column',
      borderRadius:5,
      borderWidth:1,
      justifyContent: "space-between"
    },
    containerTextInput:{
      margin:5,
    },
    textInput:{
      borderWidth:1,
      color:"gray",
      marginBottom:15
    },
    header:{
      color:PRIMARY_COLOR,
      fontSize:22,
      textAlign:"center"
    },
    label:{
      margin:4
    }
});

export default styleFormulario;