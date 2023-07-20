import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import CustomTextInput from "./CustomTextInput";
import { moderateScale } from "react-native-size-matters";
import CustomUpload from "./CustomUpload";
import { RegisterContext } from "../context/RegisterContext";

const PersonalDetailsForm = ({ setCurrentPosition, currentPosition }) => {
  const {
    isBlank,
    setIsBlank,
    profile,
    setProfile,
    name,
    setName,
    age,
    setAge,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    experience,
    setExperience,
    workDetails,
    setWorkDetails,
  } = useContext(RegisterContext);

  const gotoNext = () => {
    if (
      !profile ||
      !name ||
      !age ||
      !email ||
      !phone ||
      !address ||
      !experience ||
      !workDetails
    ) {
      setIsBlank(true);
    } else {
      setCurrentPosition(currentPosition + 1);
    }
  };

  return (
    <View>
      <KeyboardAvoidingView style={styles.textInputContainer}>
        <CustomUpload
          title="Upload Profile"
          inlineStyles={styles.inlineUploadStyles}
          value={profile}
          onChangeText={setProfile}
          
          
        />
        <CustomTextInput
          label="Name"
          placeholder="Name"
          inputIcon={false}
          value={name}
          onChangeText={setName}
          inlineStyles={styles.inlineCommonStyles}
          placeholderTextColor="#A8A196"
        />
        <CustomTextInput
          label="Age"
          placeholder="Age"
          inputIcon={false}
          value={age}
          onChangeText={setAge}
          inlineStyles={styles.inlineCommonStyles}
          placeholderTextColor="#A8A196"
          inputMode="numeric"
        />

        <CustomTextInput
          label="Email"
          placeholder="Email"
          inputIcon={false}
          value={email}
          onChangeText={setEmail}
          inlineStyles={styles.inlineCommonStyles}
          placeholderTextColor="#A8A196"
          inputMode="email"
        />
        <CustomTextInput
          label="Phone"
          placeholder="Phone"
          inputIcon={false}
          value={phone}
          onChangeText={setPhone}
          inlineStyles={styles.inlineCommonStyles}
          placeholderTextColor="#A8A196"
          inputMode="tel"
        />
        <CustomTextInput
          label="Address"
          placeholder="Address"
          inputIcon={false}
          value={address}
          onChangeText={setAddress}
          inlineStyles={styles.inlineCommonStyles}
          placeholderTextColor="#A8A196"
        />
        <CustomTextInput
          label="Working Experience [in months]"
          placeholder="Working Experience [in months]"
          inputIcon={false}
          value={experience}
          onChangeText={setExperience}
          inlineStyles={styles.inlineCommonStyles}
          placeholderTextColor="#A8A196"
          inputMode="numeric"
        />
        <CustomTextInput
          label="Previous Work Details"
          placeholder="Previous Work Details"
          inputIcon={false}
          value={workDetails}
          onChangeText={setWorkDetails}
          inlineStyles={styles.inlineCommonStyles}
          placeholderTextColor="#A8A196"
        />
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.button} onPress={gotoNext}>
        <Text style={styles.buttonText}>Save & Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PersonalDetailsForm;

const styles = StyleSheet.create({
  textInputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: responsiveFontSize(1),
    // backgroundColor:"gray",
    // justifyContent:"space-between"
  },
  inlineCommonStyles: {
    borderWidth: 2,
    borderColor: "#EEEEEE",
    height: responsiveHeight(6),
    // flex: 1,
    // width: "100%",
    paddingLeft: responsiveFontSize(2),
    borderRadius: 6,
    color: "#27374D",
    // backgroundColor:"red",
    // height:responsiveHeight(6)
  },
  button: {
    backgroundColor: "#044291",
    height: responsiveHeight(6),
    borderRadius: moderateScale(6),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    top: responsiveFontSize(2),
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: responsiveFontSize(2),
  },
});
