import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { BACKEND_BASE_URL } from "../env";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import { extract_UserId } from "../services/apiServices";

const Header = () => {
  const navigation = useNavigation();
  const [userProfle, setUserProfile] = useState({});
  const [companyLogo, setCompnayLogo] = useState({});

  const { accessToken } = useContext(AuthContext);
  const id = extract_UserId(accessToken); // extract user id

  const url = `${BACKEND_BASE_URL}pos/${id}`;
  const handleProfile = async () => {
    const headers = { Authorization: `${accessToken}` };
    try {
      const response = await axios.get(url, { headers });
      setUserProfile(response?.data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const logo_url = `${BACKEND_BASE_URL}company-settings/${userProfle?.org_id}`;

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
          {companyLogo || companyLogo.name ? (
            <>
              <Image
                style={{
                  width: responsiveWidth(12),
                  height: responsiveHeight(6),
                  marginTop: responsiveFontSize(1),
                  resizeMode: "contain",
                }}
                source={{ uri: companyLogo?.logo }}
                resizeMethod="scale"
              />
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  letterSpacing: 1,
                  marginTop: responsiveFontSize(1),
                }}
              >
                {companyLogo?.name}
              </Text>
            </>
          ) : (
            <ActivityIndicator size="small" color="#37CFEE" />
          )}
        </View>

        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={{
                uri:
                  userProfle?.image ||
                  "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg",
              }}
              style={{
                width: responsiveWidth(16),
                height: responsiveHeight(8),
                borderRadius: 50,
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
