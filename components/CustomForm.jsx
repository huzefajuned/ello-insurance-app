import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "./CustomTextInput";
import { AuthContext } from "../context/AuthContext";
import { BACKEND_BASE_URL } from "../env";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomModal from "./CustomModal";
import { CustomModalContext } from "../context/CustomModalContext";
import ForgetPassword from "./ForgetPassword";
import { loginUserApi } from "../services/apiServices";

const CustomForm = ({ companyLogo }) => {
  const url = `${BACKEND_BASE_URL}auth/user/login`;
  const navigation = useNavigation();
  const { setToken, isLoading } = useContext(AuthContext);
  const { isModalVisible, setIsModalVisible } = useContext(CustomModalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleAfterLogin = async () => {
    setLoading(true);
    try {
      const data = await loginUserApi(email, password, (pos_agent = true)); // api function for loginUser is calling here----
      setLoading(false);

      if (data?.status === 200) {
        const token = data?.data["tokens"]["access_token"];
        AsyncStorage.setItem("access_token", token);
        setToken(token); // Save the access token in the context

        Toast.show({
          type: "success",
          text1: "Logged In Successfully",
          text2: "welcome back",
        });
        await navigation.navigate("Tabs");
      }

      if (data?.response?.status === 400) {
        Toast.show({
          type: "error",
          text1:
            data.response?.data.msg?.email || data.response?.data.msg?.password,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            padding: 1,
            alignSelf: "center",
            justifyContent: "center",
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            width: responsiveWidth(70),
          }}
        >
          {companyLogo ? (
            <Image
              style={{
                width: responsiveWidth(20),
                height: responsiveWidth(20),
                resizeMode: "contain",
              }}
              source={{ uri: companyLogo }}
              resizeMethod="scale"
            />
          ) : (
            <Text>
              <ActivityIndicator size="large" color="#37CFEE" />
            </Text>
          )}
        </View>

        <View
          style={{
            width: responsiveWidth(70),
            gap: responsiveFontSize(0.5),
          }}
        >
          <Text
            style={{
              color: "#044291",
              textAlign: "center",
              fontSize: responsiveFontSize(3),
            }}
          >
            Log In Now
          </Text>
          <Text
            style={{
              color: "#071952",
              fontSize: responsiveFontSize(1.7),
              textAlign: "center",
            }}
          >
            Please login to continue using our app
          </Text>
        </View>
        <View style={styles.textInputContainer}>
          <CustomTextInput
            label=""
            placeholder="Email"
            inputIcon={false}
            value={email}
            onChangeText={setEmail}
            inlineStyles={styles.inlineCommonStyles}
            placeholderTextColor="#A8A196"
          />
          <CustomTextInput
            label=""
            placeholder="Password"
            inputIcon={true}
            secureTextEntry={isVisible}
            onVisiblePassword={() => setIsVisible(!isVisible)}
            isVisible={isVisible}
            value={password}
            onChangeText={setPassword}
            inlineStyles={styles.inlineCommonStyles}
            placeholderTextColor="#A8A196"
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Text
              style={{
                color: "black",
                textAlign: "right",
                fontSize: responsiveFontSize(2),
              }}
            >
              Forget Password?
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity>
            <View>
              {loading || isLoading ? (
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
                  onPress={handleAfterLogin}
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
                    Log In
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: responsiveFontSize(1.8),
              }}
            >
              Dont have an Account ? Create New
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomModal>
        <ForgetPassword setIsModalVisible={setIsModalVisible} />
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    padding: responsiveWidth(15),
    alignSelf: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    gap: responsiveHeight(4),
  },
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
});

export default CustomForm;
