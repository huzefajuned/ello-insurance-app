import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
// import DocumentPicker from "react-native-document-picker";
import * as DocumentPicker from "expo-document-picker";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { RegisterContext } from "../context/RegisterContext";

const CustomUpload = ({ title, inlineUploadStyles, value, onChangeText }) => {
  const [blobURL, setBlobURL] = React.useState(null);
console.log("blobURL",blobURL)
  // console.log("value", value)
  const {
    isBlank,
    setIsBlank,
    setProfile,
    setAadhaar,
    setPanCard,
    setPassbook,
    setEdu_Proof,
  } = useContext(RegisterContext);
  const pickProfile = async () => {
    const _Photo = await DocumentPicker.getDocumentAsync({
      multiple: false,
      base64: true,
      type: "image/*",
    });

    // console.log(_Photo.uri);

    // Convert the base64 data to a blob
    const response = await fetch(_Photo.uri);
    const blob = await response.blob();
    setBlobURL(URL.createObjectURL(blob));

    // Convert the blob to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      // console.log(base64data);

      // Call the onChangeText function with the base64 data
      onChangeText(base64data);
    };
    reader.readAsDataURL(blob);
  };

  return (
    <View style={styles.container}>
      <Text
        style={
          isBlank && !value ? [styles.labelErrorStyle] : [styles.labelStyle]
        }
      >
        {title + ` ${isBlank && !value ? "Required" : ""}`}
      </Text>
      <TouchableOpacity style={styles.uploadCard} onPress={pickProfile}>
        {}
      </TouchableOpacity>
    </View>
  );
};

export default CustomUpload;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    height: responsiveHeight(10),
  },
  uploadCard: {
    height: responsiveHeight(9),
    backgroundColor: "#DCDCDC",
    borderWidth: 2,
    borderColor: "#EEEEEE",
    borderRadius: 6,
    borderStyle: "dotted",
    color: "#27374D",
    textAlign: "center",
    justifyContent: "center",
  },
  labelStyle: {
    color: "#535353",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
    letterSpacing: 1,
    // backgroundColor: "yellow",
  },
  labelErrorStyle: {
    color: "red",
    fontSize: responsiveFontSize(1.8),
    // backgroundColor: "green",
  },
});
