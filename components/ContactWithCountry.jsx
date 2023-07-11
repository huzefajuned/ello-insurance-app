import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { moderateScale } from "react-native-size-matters";
import { Colors } from "react-native/Libraries/NewAppScreen";

const ContactWithCountry = () => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef();
  return (
    <>
      <View>
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode="DM"
          layout="first"
          onChangeText={(text) => {
            setValue(text);
          }}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
          }}
          withDarkTheme
          containerStyle={[styles.container]}
          textInputStyle={[styles.textInputStyle]}
          codeTextStyle={[styles.codeTextStyle]}
          flagButtonStyle={[styles.flagButtonStyle]}
          textContainerStyle={[styles.textContainerStyle]}
        />
      </View>
    </>
  );
};

export default ContactWithCountry;

const styles = StyleSheet.create({
  container: {
    borderColor: "#DCDCDC",
    borderBottomWidth: 0.3,
    borderRadius: 0,
    paddingHorizontal: 0,
    height: moderateScale(40),
    display: "flex",
    flexDirection: "row",
    width: "100%",
    color:"#DCDCDC"
  },
  textContainerStyle: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    gap: 0,
  },
  flagButtonStyle: {
    borderRightWidth: 1,
    borderRightColor: "#DCDCDC",
    color:"red"
  },
  textInputStyle: {
    borderBottomWidth: 1,
    color: "#DCDCDC",
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
    height: moderateScale(40),
    fontSize: 14,
  },
  codeTextStyle: {
    display: "none",
  },
});
