import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
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
  const [blobURL, setBlobURL] = useState("");
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
      type: "image/*",
    });


    // Convert the base64 data to a blob
    const response = await fetch(_Photo.uri);

    const blob = await response.blob();
    const fileName = response?._bodyBlob?._data.name;
    // setBlobURL(URL.createObjectURL(blob));

    // Convert the blob to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      // console.log(base64data);

      // Call the onChangeText function with the base64 data
      onChangeText(`${fileName},${base64data}`);
      setBlobURL(base64data);
    };

    reader.readAsDataURL(blob);
  };

  return (
    <View style={styles.container}>
      {title && !isBlank && <Text style={styles.labelStyle}>{title}</Text>}
      <TouchableOpacity style={styles.uploadCard} onPress={pickProfile}>
        {blobURL ? (
          <View style={styles.profileReview}>
            <MaterialIcons
              name="cloud-upload"
              color="#044291"
              size={responsiveFontSize(5)}
              style={{ marginRight: responsiveWidth(20) }}
            />
            <Image
              source={{
                uri: blobURL,
                width: responsiveHeight(10),
                height: responsiveHeight(10),
              }}
              style={{ borderRadius: 50 }}
            />
          </View>
        ) : (
          <MaterialIcons
            name="cloud-upload"
            color="#044291"
            size={responsiveFontSize(5)}
            style={{ justifyContent: "center", textAlign: "center" }}
          />
        )}
      </TouchableOpacity>
      {isBlank && !value && (
        <Text style={styles.labelErrorStyle}>{title} is required</Text>
      )}
    </View>
  );
};

export default CustomUpload;
const styles = StyleSheet.create({
  container: {},
  uploadCard: {
    height: responsiveHeight(8),
    backgroundColor: "#DCDCDC",
    borderWidth: 2,
    borderColor: "#EEEEEE",
    borderRadius: 6,
    borderStyle: "dotted",
    color: "#27374D",
    textAlign: "center",
    justifyContent: "center",
  },
  profileReview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  labelStyle: {
    color: "#535353",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "bold",
    letterSpacing: 1,
  },
  labelErrorStyle: {
    color: "red",
    fontSize: responsiveFontSize(1.5),
  },
});
