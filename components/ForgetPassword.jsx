import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomTextInput from "./CustomTextInput";
import { moderateScale } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";

const ForgetPassword = ({ setIsModalVisible }) => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text
          style={{
            color: "#044291",
            textAlign: "center",
            fontSize: responsiveFontSize(3),
          }}
        >
          Enter Email
        </Text>
        <Text
          style={{
            color: "#071952",
            fontSize: responsiveFontSize(2),
            textAlign: "center",
          }}
        >
          Please enter your valid email.
        </Text>
      </View>

      <View style={styles.textInputContainer}>
        <CustomTextInput
          label=""
          placeholder="Email"
          inputIcon={false}
          // value={email}
          // onChangeText={setEmail}
          inlineStyles={styles.inlineCommonStyles}
          placeholderTextColor="#A8A196"
        />
      </View>

      <View>
        <TouchableOpacity>
          <View>
            {loading ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#044291",
                  height: responsiveHeight(6),
                  borderRadius: moderateScale(6),
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
                onPress={() => {}}
              >
                <ActivityIndicator size="large" color="#37CFEE" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "#044291",
                  height: responsiveHeight(6),
                  borderRadius: moderateScale(6),
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
                onPress={() => alert("Otp Sent")}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    fontSize: responsiveFontSize(2),
                  }}
                >
                  Forget password
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          // color: "red",
          textAlign: "center",
          alignSelf: "center",
          justifyContent: "center",
          fontSize: responsiveFontSize(2),
          position: "absolute",
          right: 1,
          top: 1,
        }}
        onPress={() => setIsModalVisible(false)}
      >
        <AntDesign name="closecircle" size={35} color="#044291" />
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: responsiveWidth(90),
    height: responsiveWidth(90),
    padding: responsiveWidth(5),
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: responsiveHeight(5),
    borderRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
  },
  containerHeader: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  textInputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: responsiveFontSize(3),
  },
  inlineCommonStyles: {
    borderWidth: 2,
    borderColor: "#EEEEEE",
    height: responsiveHeight(6.5),
    paddingLeft: responsiveFontSize(2),
    borderRadius: 6,
    color: "#27374D",
  },
});
