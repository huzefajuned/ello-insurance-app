import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import CustomTextInput from "./CustomTextInput";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { moderateScale } from "react-native-size-matters";
import { RegisterContext } from "../context/RegisterContext";

const BankDetailsForm = ({ currentPosition, setCurrentPosition }) => {
  const {
    isBlank,
    setIsBlank,
    bankName,
    setBankName,
    account_No,
    setAccount_No,
    ifsc_Code,
    setIfsc_Code,
  } = useContext(RegisterContext);

  const gotoNext = () => {
    if (!bankName || !account_No || !ifsc_Code) {
      setIsBlank(true);
    } else {
      setCurrentPosition(currentPosition + 1);
    }
  };
  return (
    <View>
      <View style={styles.textInputContainer}>
        <CustomTextInput
          label="Bank Name"
          placeholder="Enter Bank Name"
          inputIcon={false}
          value={bankName}
          onChangeText={setBankName}
          inlineStyles={styles.inlineCommonStyles}
          placeholderTextColor="#A8A196"
        />
        <CustomTextInput
          label="Account Number"
          placeholder=" Enter Account Number"
          inputIcon={false}
          value={account_No}
          onChangeText={setAccount_No}
          inlineStyles={styles.inlineCommonStyles}
          placeholderTextColor="#A8A196"
        />
        <CustomTextInput
          label="IFSC Code"
          placeholder=" Enter IFSC Code"
          inputIcon={false}
          value={ifsc_Code}
          onChangeText={setIfsc_Code}
          inlineStyles={styles.inlineCommonStyles}
          placeholderTextColor="#A8A196"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={gotoNext}>
        <Text style={styles.buttonText}>Save & Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BankDetailsForm;
const styles = StyleSheet.create({
  textInputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: responsiveFontSize(2),
    // backgroundColor:"gray
  },
  inlineCommonStyles: {
    borderWidth: 2,
    borderColor: "#EEEEEE",
    height: responsiveHeight(6.5),
    // flex: 1,
    width: "100%",
    paddingLeft: responsiveFontSize(2),
    borderRadius: 6,
    color: "#27374D",
  },
  button: {
    backgroundColor: "#044291",
    height: responsiveHeight(6),
    borderRadius: moderateScale(6),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    top: responsiveFontSize(4),
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: responsiveFontSize(2),
  },
});
