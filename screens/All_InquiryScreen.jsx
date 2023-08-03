import { SafeAreaView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import CommonHeader from "../components/CommonHeader";
import InquiryCard from "../components/InquiryCard";

const All_InquiryScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        paddingTop: insets.top,
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignSelf: "center",
        backgroundColor: "#F9F9F9",
      }}
    >
      <CommonHeader heading="All Inquiry" isBackIcon={true} />
      <InquiryCard />
    </SafeAreaView>
  );
};

export default All_InquiryScreen;
