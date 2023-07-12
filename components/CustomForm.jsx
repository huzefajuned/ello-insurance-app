import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "./CustomTextInput";
import { AuthContext } from "../context/AuthContext";
import { BACKEND_BASE_URL } from "../CONSTANTS";

const CustomForm = () => {
  const url = `${BACKEND_BASE_URL}/api/v1/auth/user/login`;
  const navigation = useNavigation();
  const { setToken, isLoading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleAfterLogin = async () => {
    try {
      const payload = {
        email: email,
        password: password,
        pos_agent: true,
      };
      setLoading(true);
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (response.status === 200) {
        console.log("response", JSON.stringify(response));

        const token = response.data["tokens"]["access_token"];
        AsyncStorage.setItem("access_token", token);
        setToken(token); // Save the access token in the context

        Toast.show({
          type: "success",
          text1: "Logged In Successfully",
        });
        await navigation.navigate("Tabs");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log("Error status:", error.response.status);
        Toast.show({
          type: "error",
          text1:
            error.response?.data.msg?.email ||
            error.response?.data.msg?.password,
        });
        console.log("Error data:", error.response.data);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        label="Email"
        placeholder="Enter Your Email"
        inputIcon={false}
        value={email}
        onChangeText={setEmail}
      />
      <CustomTextInput
        label="Password"
        placeholder="Enter Your Password"
        inputIcon={true}
        secureTextEntry={isVisible}
        onVisiblePassword={() => setIsVisible(!isVisible)}
        isVisible={isVisible}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")}>
        <Text style={{ color: "#37CFEE" }}>Change Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.button}>
          {loading || isLoading ? (
            <ActivityIndicator size="large" color="#37CFEE" />
          ) : (
            <Button title="Login" color="#37CFEE" onPress={handleAfterLogin} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    width: "100%",
    height: "auto",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    gap: moderateScale(24),
    borderWidth: 1,
    borderColor: "#DDDDDD8F",
    padding: moderateScale(12),
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 6,
  },
  button: {
    borderRadius: 10,
    fontSize: 12,
    backgroundColor: "white",
  },
});

export default CustomForm;
