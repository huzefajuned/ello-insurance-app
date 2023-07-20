import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CommonHeader from "../components/CommonHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import base64 from "react-native-base64";
import { BACKEND_BASE_URL } from "../CONSTANTS";
import axios from "axios";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Menu from "../components/Menu";
import { moderateScale } from "react-native-size-matters";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { accessToken, removeToken } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(new Animated.Value(0));
  const [userProfle, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const tokenParts = accessToken?.split(".");
  const payload = tokenParts?.[1];
  const decodedPayload = base64?.decode(payload);
  const { id } = JSON?.parse(decodedPayload) || {};

  const url = `${BACKEND_BASE_URL}/api/v1/pos/${id}`;

  const handleProfile = async () => {
    const headers = { Authorization: `${accessToken}` };
    setLoading(true);
    try {
      const response = await axios.get(url, { headers });
      setUserProfile(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  const handleLogout = () => {
    removeToken();
    navigation.navigate("Home");
  };

  const infoRows = [
    {
      title: "Name",
      text: userProfle?.name,
      icon: "user",
      color: "#26CBED",
    },
    {
      title: "Email",
      text: userProfle?.email,
      icon: "mail",
      color: "#26CBED",
    },
    {
      title: "Address",
      text: userProfle?.address,
      icon: "map-pin",
      color: "#26CBED",
    },
    {
      title: "Mobile",
      text: userProfle?.phone,
      icon: "phone",
      color: "#26CBED",
    },
    {
      title: "Gender",
      text: userProfle?.gender,
      icon: "user",
      color: "#26CBED",
    },

  ];

  return (
    <SafeAreaView style={[styles.container, { marginTop: insets.top }]}>
      <CommonHeader
        heading="My Profile"
        isBackIcon={true}
        onPressBack={handleGoBack}
      />
      {loading ? (
        <View
          style={{
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}>
            <ActivityIndicator size="large" color="#37CFEE" />
          </Text>
        </View>
      ) : (
        <View>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: userProfle?.image }}
              style={styles.profileImage}
            />
            <TouchableOpacity onPress={handleLogout}>
              <Feather name="settings" size={30} color="#26CBED" />
            </TouchableOpacity>
          </View>
          {/* {modalOpen && (
            <Animated.View
              style={[
                styles.modal,
                {
                  top: insets.top,
                },
                {
                  transform: [
                    {
                      translateX: modalAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                          responsiveWidth(100),
                          responsiveWidth(70),
                        ],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Menu />
            </Animated.View>
          )} */}

          <View style={styles.infoContainer}>
            {infoRows.map((row, index) => (
              <View style={styles.infoRow} key={index}>
                <View style={styles.iconContainer}>
                  <Feather
                    name={row.icon}
                    size={20}
                    color={row.color}
                    style={styles.icon}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.infoTitle}>{row.title}:</Text>
                  <Text style={styles.infoText}>{row.text}</Text>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    textAlign: "center",
  },
  profileContainer: {
    alignItems: "center",
    width: responsiveWidth(50),
    height: responsiveHeight(20),
    marginLeft: responsiveWidth(40),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImage: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    borderRadius: 50,
  },
  modal: {
    position: "absolute",
    left: -100,
    width: responsiveWidth(30),
    height: responsiveHeight(50),
    backgroundColor: "#FFFFFF",
    elevation: 4,
    paddingHorizontal: 20,
  },
  infoContainer: {
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsiveFontSize(2),
    width: "90%",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    backgroundColor: "#FFFFFF",
    height: 42,
    borderRadius: 11,
  },
  iconContainer: {
    borderRightColor: "#DDDDDD",
    borderRightWidth: 1,
    width: "20%",
    height: "90%",
    justifyContent: "center",
    textAlign: "cente",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
  },
  infoTitle: {
    marginRight: 10,
    fontSize: 8,
    color: "#444444",
  },
  infoText: {
    fontSize: 14,
    color: "#444444",
  },
  button: {
    backgroundColor: "#37CFEE",
    height: responsiveHeight(6),
    width: responsiveWidth(80),
    borderRadius: moderateScale(5),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: responsiveFontSize(2),
  },
});

export default ProfileScreen;
