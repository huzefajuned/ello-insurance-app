import { View, Text } from "react-native";
import React from "react";

const CommonDescription = ({ description }) => {
  return (
    <View
      style={{
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <Text
        style={{
          color: "#5B5959",
          fontSize: 12,
          letterSpacing: 0.2,
        }}
      >
        {description}
      </Text>
    </View>
  );
};

export default CommonDescription;
