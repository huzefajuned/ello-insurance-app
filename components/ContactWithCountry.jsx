import React, { useState, useRef, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { moderateScale } from "react-native-size-matters";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { RegisterContext } from "../context/RegisterContext";


const ContactWithCountry = ({ onChangeText, required }) => {
  const { isBlank, setIsBlank } = useContext(RegisterContext);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef();
  const handleValueChange = (number) => {
    setValue(number);
    onChangeText(value);
  };

  return (
    <View
      style={{
        paddingBottom: 2,
        borderBottomColor: "#EEEEEE",
        borderBottomWidth: responsiveFontSize(0.2),
      }}
    >
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="IN"
        layout="first"
        onChangeText={(number) => handleValueChange(number)}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
        }}
        containerStyle={styles.container}
        textInputStyle={styles.textInputStyle}
        codeTextStyle={styles.codeTextStyle}
        flagButtonStyle={styles.flagButtonStyle}
        textContainerStyle={styles.textContainerStyle}
        
      />
      {!value && isBlank && (
        <Text style={styles.labelErrorStyle}>Contact is required</Text>
      )}
    </View>
  );
};

export default ContactWithCountry;

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
    paddingHorizontal: 0,
    height: responsiveHeight(5),
    width: responsiveWidth(85),
    display: "flex",
    flexDirection: "row",
    color: "#DCDCDC",
  },
  textContainerStyle: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
    gap: 0,
  },
  flagButtonStyle: {
    borderRightWidth: 1,
    borderRightColor: "#DCDCDC",
    color: "red",
  },
  textInputStyle: {
    borderBottomWidth: 1,
    color: "black",
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
    height: moderateScale(40),
    fontSize: responsiveFontSize(1.9),
  },
  codeTextStyle: {
    display: "none",
  },
  labelErrorStyle: {
    color: "red",
    fontSize: responsiveFontSize(1.5),
  },
});
