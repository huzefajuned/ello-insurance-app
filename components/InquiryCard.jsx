import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import inquiries from "../dummyInquiry.json";
import FilterInquiry from "./FilterInquiry";
import {
  getAll_Inquiries,
  extract_UserId,
  formatDate,
} from "../services/apiServices";
import { AuthContext } from "../context/AuthContext";
import CustomLoading from "./CustomLoading";
import SingleInquiry from "./SingleInquiry";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const InquiryCard = () => {
  const insets = useSafeAreaInsets();
  const [selectedInquiryName, setSelectedInquiryName] = useState("");
  const [selectedInquiryDate, setSelectedInquiryDate] = useState("");
  const [inquiriesFromApi, setInquiriesFromApi] = useState([]);
  const [original_Api_Inquiry, setOriginal_Api_Inquiry] = useState([]);

  useEffect(() => {
    setInquiriesFromApi(inquiries);
  }, []);

  const { accessToken } = useContext(AuthContext);
  const id = extract_UserId(accessToken);

  const call_getAll_InquiriesApi = async (id) => {
    try {
      const data = await getAll_Inquiries(id);
      await setOriginal_Api_Inquiry(data?.data?.data);
    } catch (error) {
      console.log("error", error.response);
    }
  };

  useEffect(() => {
    call_getAll_InquiriesApi(id);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <FilterInquiry
        selectedInquiryName={selectedInquiryName}
        setSelectedInquiryName={setSelectedInquiryName}
        selectedInquiryDate={selectedInquiryDate}
        setSelectedInquiryDate={setSelectedInquiryDate}
        inquiriesFromApi={inquiriesFromApi}
        setInquiriesFromApi={setInquiriesFromApi}
      />
      {original_Api_Inquiry?.length <= 0 ? (
        <CustomLoading />
      ) : (
        <>
          <SingleInquiry original_Api_Inquiry={original_Api_Inquiry} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.paginationContainer}
          >
            {nums.map((num) => {
              return (
                <TouchableOpacity
                  key={num}
                  // onPress={() => handleGoBack()}
                  style={styles.paginationTextContainer}
                >
                  <Text style={styles.paginationText}>{num}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default InquiryCard;

const styles = StyleSheet.create({
  mainContainer: {
    height: responsiveHeight(100),
  },

  paginationContainer: {
    display: "flex",
    flexDirection: "row",
    gap: responsiveWidth(2),
    alignItems: "center",
    position: "relative",
    bottom: 0,
  },
  paginationTextContainer: {},
  paginationText: {
    borderRadius: 50,
    padding: responsiveFontSize(1.2),
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    elevation: 1,
    backgroundColor: "#FFFFFF",
    fontSize: responsiveFontSize(2),
    color: "#26CBED",
  },
});
