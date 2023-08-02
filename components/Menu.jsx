import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";

const Menu = () => {
  const navigation = useNavigation();
  const { removeToken } = useContext(AuthContext);

  const menuItems = [
    {
      key: 1,
      title: "All Inquiry",
      icon: "edit",
    },
    {
      key: 2,
      title: "View Earnings",
      icon: "edit",
    },
    {
      key: 3,
      title: "Change Password",
      icon: "edit",
    },
    {
      key: 4,
      title: "Logout",
      icon: "log-out",
    },
  ];

  const goToMenuItem = (item) => {
    if (item.title === "Logout") {
      removeToken(); // Remove the access token from the context
    } else if (item.title === "All Inquiry") {
      navigation.navigate("AllInquiry");
    } else if (item.title === "Change Password") {
      navigation.navigate("ChangePassword");
    } else {
      // nothing
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: responsiveHeight(1),
      }}
    >
      {menuItems.map((item) => {
        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => goToMenuItem(item)}
            style={styles.container}
          >
            <Feather
              name={item.icon}
              size={responsiveFontSize(2)}
              color="white"
            />
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: "white",
                marginLeft: responsiveFontSize(1),
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
    width: "80%",
    marginRight: "10%",
    borderColor: "#707070",
    borderRadius: 5,
    padding: responsiveFontSize(0.5),
    margin: responsiveFontSize(0.5),
    backgroundColor: "#37CFEE",
    // marginTop: responsiveHeight(1),
  },
});
