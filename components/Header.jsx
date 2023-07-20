import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Logo from "../assets/images/logo.png";
import { moderateScale } from "react-native-size-matters";
import base64 from "react-native-base64";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { BACKEND_BASE_URL } from "../CONSTANTS";
import axios from "axios";

const Header = () => {
  const navigation = useNavigation();
  const [userProfle, setUserProfile] = useState({});
  const { accessToken } = useContext(AuthContext);
  const tokenParts = accessToken?.split(".");
  const payload = tokenParts?.[1];
  const decodedPayload = base64?.decode(payload);
  const { id } = JSON?.parse(decodedPayload) || {};

  const url = `${BACKEND_BASE_URL}/api/v1/pos/${id}`;
  const handleProfile = async () => {
    const headers = { Authorization: `${accessToken}` };
    try {
      const response = await axios.get(url, { headers });
      setUserProfile(response?.data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={Logo}
            style={{
              height: responsiveHeight(4),
              width: responsiveWidth(12),
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              fontSize: 10,
              letterSpacing: 1,
            }}
          >
            Insurance
          </Text>
        </View>

        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={{ uri: userProfle?.image }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    textAlign: "center",
    alignItems: "center",
    width: responsiveWidth(100),
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: responsiveWidth(90),
    margin: "auto",
    justifyContent: "space-between",
    // backgroundColor: "gray",
  },
  logoContainer: {
    // backgroundColor: "green",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    // backgroundColor: "blue",
    alignItems: "center",
    padding: responsiveFontSize(1),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // earningContainer
  earningContainer: {
    // backgroundColor: "brown",
    width: responsiveWidth(100),
    display: "flex",
    margin: "auto",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // gap: moderateScale(5),
  },
  earningContainerHeader: {
    width: responsiveWidth(95),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: moderateScale(40),
  },
  earningContainerCard: {
    display: "flex",
    flexDirection: "column",
    gap: responsiveFontSize(0.5),
    width: responsiveWidth(90),
    justifyContent: "center",
    height: responsiveHeight(12),
    backgroundColor: "#FFFFFF",
    padding: responsiveFontSize(2),
    shadowColor: "#DDDDDD8F",
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 11,
  },
  modal: {
    backgroundColor: "#FFFFFF",
    padding: moderateScale(0),
    shadowColor: "#DDDDDD8F",
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 6,
    width: "30%",
    marginRight: "3%",
  },
});
