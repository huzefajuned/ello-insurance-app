import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import CommonHeader from "../components/CommonHeader";
import CommonDescription from "../components/CommonDescription";
import CustomForm from "../components/CustomForm";

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container, // Add the container class here
        {
          paddingTop: insets.top,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: moderateScale(10),
          height: "100%",
        },
      ]}
    >
      <CommonHeader heading="Login" isBackIcon={false} isCloseIcon={false} />

      <CommonDescription description="Enter your Email and password in the field below to Login Into Your Account." />

      <CustomForm />
    
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  headerContainer: {
    height: "20%",
    width: "100%",
    backgroundColor: "red",
  },
});
