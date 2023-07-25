import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const CommonDescription = ({ description, inlineStyles }) => {
  return (
    <View style={inlineStyles}>
      <Text
        style={{
          color: "#5B5959",
          fontSize: responsiveFontSize(1.5),
          letterSpacing: 0.2,
        }}
      >
        {description}
      </Text>
    </View>
  );
};

export default CommonDescription;
