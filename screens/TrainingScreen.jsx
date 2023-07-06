import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import CommonHeader from "../components/CommonHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import TrainingCard from "../components/TrainingCard";

const TrainingScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        paddingTop: insets.top,
        padding: moderateScale(10),
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // backgroundColor: "gray",
      }}
    >
      <View style={{ height: "10%" }}>
        <CommonHeader heading="Training" isBackIcon={true} />
      </View>
      <View style={{ height: "80%" }}>
        <TrainingCard />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
    width: "100%",
  },
  headerContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    marginTop: 5,
    height: "80%",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#DDDDDD",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    elevation: 3,
    padding: 10,
    borderColor: "#DDDDDD",
    borderWidth: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    height: 40,
    width: "100%",
  },
  picker: {
    height: 0,
    width: "100%",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
    // backgroundColor: "red",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioLabel: {
    // marginLeft: 10,
  },
  radioContainerInner: {
    width: "50%",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    // backgroundColor: "gray",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#37CFEE",
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#37CFEE",
    // marginLeft: 10,
  },
});
export default TrainingScreen;
