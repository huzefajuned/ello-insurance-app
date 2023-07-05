import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const InquiryHeader = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  const handleClose = () => {
    console.log("Close button pressed");
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleGoBack} style={styles.iconContainer}>
          <Feather name="arrow-left" style={styles.backAndCloseIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Add Inquiry</Text>
        <TouchableOpacity onPress={handleGoBack} style={styles.iconContainer}>
          <Feather name="x" style={styles.backAndCloseIcon} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: "#5B5959", fontSize: 12 }}>
          To add a new Inquiry, enter the details of the Inquiry in the input
          field below.
        </Text>
      </View>
    </>
  );
};

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center", // Center the icons vertically
    justifyContent: "space-between",
    // backgroundColor: "red",
    padding: 5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backAndCloseIcon: {
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    elevation: 3,
    backgroundColor: "#FFFFFF",
    fontSize: 17,
    color: "#26CBED",
  },
  title: {
    fontSize: 16,
    color: "#444444",
  },
};

export default InquiryHeader;
