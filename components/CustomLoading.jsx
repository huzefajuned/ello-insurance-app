import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const CustomLoading = () => {
  return (
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
  );
};

export default CustomLoading;
