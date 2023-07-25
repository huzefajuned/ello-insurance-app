import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const InquiryHeader = ({ heading, isBackIcon, isCloseIcon }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  const handleClose = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {isBackIcon && (
        <TouchableOpacity
          onPress={() => handleGoBack()}
          style={styles.iconContainer}
        >
          <Feather name="arrow-left" style={styles.backAndCloseIcon} />
        </TouchableOpacity>
      )}

      <View style={styles.headingContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{heading}</Text>
        </View>
      </View>

      {isCloseIcon && (
        <TouchableOpacity onPress={handleClose} style={styles.iconContainer}>
          <Feather name="x" style={styles.backAndCloseIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(90),
    marginLeft: responsiveWidth(5),
    flexDirection: "row",
    alignItems: "center",
    alignItems: "center",
    padding: responsiveFontSize(1),
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: responsiveWidth(10),
  },
  backAndCloseIcon: {
    borderRadius: 20,
    padding: responsiveFontSize(1.5),
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    elevation: 3,
    backgroundColor: "#FFFFFF",
    fontSize: responsiveFontSize(2),
    color: "#26CBED",
  },
  headingContainer: {
    width: responsiveWidth(65),
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    letterSpacing: 1,
  },
});

export default InquiryHeader;
