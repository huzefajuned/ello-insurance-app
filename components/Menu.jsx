import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const Menu = () => {
  const navigation = useNavigation();
  const { removeToken } = useContext(AuthContext);

  const menuItems = [
    {
      key: 2,
      title: "Settings",
      icon: "settings",
    },
    {
      key: 3,
      title: "Logout",
      icon: "log-out",
    },
  ];

  const goToMenuItem = (item) => {
    if (item.title === "Logout") {
      removeToken(); // Remove the access token from the context
      // navigation.navigate("Login");
    }
    if (item.title === "Settings") {
      navigation.navigate("ChangePassword");
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        // gap: 5,
      }}
    >
      {menuItems.map((item) => {
        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => goToMenuItem(item)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
              textAlign: "center",
              gap: moderateScale(7),
              width: "100%",
              borderColor: "#707070",
              borderBottomWidth: 0.3,
              padding: 1,
            }}
          >
            <Feather name={item.icon} size={12} color="#4A4A4A" />
            <Text style={{ fontSize: 14, color: "#4A4A4A" }}>{item.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Menu;
