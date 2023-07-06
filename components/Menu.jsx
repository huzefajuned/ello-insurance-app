import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";

const Menu = () => {
  const menuItems = [
    {
      key: 1,
      title: "Setting",
      icon: "settings",
    },
    {
      key: 2,
      title: "Logout",
      icon: "log-out",
    },
  ];
  return (
    <View
      style={{
        // backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      {menuItems.map((item) => {
        return (
          <View
            key={item.key}
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
          </View>
        );
      })}
    </View>
  );
};

export default Menu;
