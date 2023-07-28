import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { RegisterContext } from "../context/RegisterContext";

const CustomTextInput = ({
  label,
  placeholder,
  inputIcon,
  isVisible,
  placeholderFontSize,
  placeholderTextColor,
  onVisiblePassword,
  inlineStyles,
  value,
  canEdit,
  inputMode,
  multiline,
  ...props
}) => {
  const { isBlank, setIsBlank } = useContext(RegisterContext);

  return (
    <View>
      {label && <Text style={styles.labelStyle}>{label}</Text>}

      <View
        style={[
          inlineStyles,
          {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            textAlign: "center",
            alignContent: "center",
            alignContent: "center",
          },
        ]}
      >
        <TextInput
          style={[
            {
              flex: 1,
            },
          ]}
          placeholder={placeholder}
          {...props}
          placeholderTextColor={placeholderTextColor}
          value={value}
          inputMode={inputMode}
          multiline={multiline}
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
                  color: "gray",
                  marginRight: responsiveFontSize(1),
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isBlank && !value && (
        <Text style={styles.labelErrorStyle}>
          {label || placeholder} is required
          {/* Two variabale for diffrent types of inputs--- */}
          {/* some inputs dont have any label. then, there will  be placeholder---  */}
        </Text>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  labelStyle: {
    color: "#535353",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "bold",
    letterSpacing: 1,
  },
  labelErrorStyle: {
    color: "red",
    fontSize: responsiveFontSize(1.5),
  },
});
