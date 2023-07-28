import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DynamicInquiryForm from "../components/DynamicInquiryForm";

const InquiryFormScreen = ({ navigation, route }) => {
  // const dy_formConfigurations = route?.params?.dy_formConfigurations;
  return <DynamicInquiryForm  />;
};
export default InquiryFormScreen;
