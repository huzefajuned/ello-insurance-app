import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import CustomTextInput from "../components/CustomTextInput";
import CommonHeader from "../components/CommonHeader";
import CommonDescription from "../components/CommonDescription";
import { AuthContext } from "../context/AuthContext";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BACKEND_BASE_URL } from "../CONSTANTS";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const ChangePassword = () => {
  const { accessToken, isLoading, removeToken } = useContext(AuthContext);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisibleCurrentPassword, setIsVisibleCurrentPassword] =
    useState(true);
  const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(true);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(true);
  const [passwordMatchError, setPasswordMatchError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    try {
      const payload = {
        old_password: current,
        new_password: password,
        confirm_password: confirmPassword,
      };
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_BASE_URL}auth/user/change/password`,
        payload,
        {
          headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: response?.data?.msg,
          text2:"Login to continue..."
        });
        await removeToken();
      } else {
        console.error("Failed to change password");
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.msg?.password) {
        setPasswordMatchError(error.response?.data?.msg?.password);
      } else {
        Toast.show({
          type: "error",
          text1:
            error.response.data?.msg?.confirm_password ||
            error.response.data?.msg?.new_password ||
            error.response.data?.msg?.old_password,
        });
      }
    }
  };

  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CommonHeader
        heading="Change Password"
        isBackIcon={true}
        // isCloseIcon={true}
      />

      <CommonDescription
        description="Enter your new password in the field below to change your password."
        inlineStyles={styles.descriptionStyles}
      />
      <View style={styles.container}>
        <CustomTextInput
          label="Current Password"
          placeholder="Enter your Current Password"
          inputIcon={false}
          value={current}
          secureTextEntry={isVisibleCurrentPassword}
          onChangeText={setCurrent}
        />
        <CustomTextInput
          label="New Password"
          placeholder="Enter New Password"
          inputIcon={true}
          secureTextEntry={isVisibleNewPassword}
          onVisiblePassword={() =>
            setIsVisibleNewPassword(!isVisibleNewPassword)
          }
          isVisible={isVisibleNewPassword}
          value={password}
          onChangeText={setPassword}
        />
        <CustomTextInput
          label="Confirm New Password"
          placeholder="Enter Confirm New Password"
          inputIcon={true}
          secureTextEntry={isVisibleConfirmPassword}
          onVisiblePassword={() =>
            setIsVisibleConfirmPassword(!isVisibleConfirmPassword)
          }
          isVisible={isVisibleConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          // onBlur={validatePasswordMatch} // Call the validation function onBlur
        />
        <TouchableOpacity>
          <View style={styles.button}>
            {loading || isLoading ? (
              <ActivityIndicator size="large" color="#37CFEE" />
            ) : (
              <Button
                title="Change Password"
                color="#37CFEE"
                onPress={handlePasswordChange}
              />
            )}
            {/* {loading ? (
              <Button title="Please Wait ...." color="#37CFEE" disabled />
            ) : (
              
            )} */}
          </View>
        </TouchableOpacity>
        {passwordMatchError && (
          <Text style={styles.errorText}>{passwordMatchError}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    // width: "100%",
    width: responsiveWidth(90),
    height: "auto",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    gap: moderateScale(20),
    borderWidth: 1,
    borderColor: "#DDDDDD8F",
    padding: moderateScale(12),
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 6,
  },
  errorText: {
    color: "red",
    fontSize: 10,
  },
  descriptionStyles: {
    width: responsiveWidth(90),
    paddingTop: responsiveWidth(5),
    paddingBottom: responsiveWidth(5),

    marginLeft: responsiveWidth(5),
  },
});

export default ChangePassword;
