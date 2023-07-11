import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";

const CustomTextInput = ({
  label,
  placeholder,
  inputIcon,
  isVisible,
  placeholderFontSize,
  onVisiblePassword,
  inlineStyles,
  ...props
}) => {
  return (
    <View>
      {label && (
        <Text
          style={{
            color: "#535353",
            fontSize: 14,
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          textAlign: "center",
          alignContent: "center",
          width: "100%",
          alignContent: "center",
        }}
      >
        <TextInput
          style={[
            inlineStyles,
            {
              height: moderateScale(40),
              borderBottomWidth: 1,
              borderBottomColor: "#DFDFDF",
              flex: 1,
              color: "#000000",
            },
          ]}
          placeholder={placeholder}
          {...props}
          placeholderTextColor="#DCDCDC"
        />
        <View
          style={{
            justifyContent: "center",
            margin: "auto",
          }}
        >
          {inputIcon && (
            <TouchableOpacity onPress={onVisiblePassword}>
              <Feather
                name={isVisible ? "eye-off" : "eye"}
                size={22}
                style={{
                  textAlign: "center",
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CustomTextInput;
