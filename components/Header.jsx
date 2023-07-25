import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
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
import { ActivityIndicator } from "react-native";

const Header = () => {
  const navigation = useNavigation();
  const [userProfle, setUserProfile] = useState({});
  const [companyLogo, setCompnayLogo] = useState({});

  const { accessToken } = useContext(AuthContext);

  const tokenParts = accessToken?.split(".");
  const payload = tokenParts?.[1];
  // Check if payload is available before attempting to decode
  const decodedPayload = payload ? base64?.decode(payload) : null;

  let id;
  try {
    // Check if decodedPayload is available before parsing
    id = decodedPayload ? JSON?.parse(decodedPayload)?.id : null;
  } catch (error) {
    // Handle the error if parsing fails (invalid JSON payload)
    console.error("Error parsing payload:", error);
  }

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
  const logo_url = `${BACKEND_BASE_URL}/api/v1/company-settings/${userProfle?.org_id}`;

  const handleCompanyLogo = async () => {
    // const headers = { Authorization: `${accessToken}` };
    try {
      const response = await axios.get(logo_url);
      setCompnayLogo(response?.data?.data);
      // console.log("res in handleCompanyLogo",response?.data?.data)
    } catch (error) {
      // console.log("error in handleCompanyLogo", error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);
  useEffect(() => {
    handleCompanyLogo();
  }, [userProfle]);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: companyLogo?.logo }}
            style={{ width: responsiveWidth(12), height: responsiveHeight(6) }}
          />
          <Text
            style={{
              fontSize: responsiveFontSize(1.5),
              letterSpacing: 1,
              marginTop: responsiveFontSize(1),
            }}
          >
            {companyLogo?.name ? (
              companyLogo?.name
            ) : (
              <ActivityIndicator size="small" color="#37CFEE" />
            )}
          </Text>
        </View>

        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={{ uri: userProfle?.image }}
              style={{
                width: responsiveWidth(16),
                height: responsiveHeight(8),
                borderRadius: 25,
              }}
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
