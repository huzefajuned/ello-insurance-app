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
import FilterInquiry from "./FilterInquiry";
import { getAll_Inquiries, extract_UserId } from "../services/apiServices";
import { AuthContext } from "../context/AuthContext";
import CustomLoading from "./CustomLoading";
import SingleInquiry from "./SingleInquiry";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";

const nums = [1, 2, 3, 4]; // dummy pagination...

const InquiryCard = () => {
  const insets = useSafeAreaInsets();
  const [selectedInquiryName, setSelectedInquiryName] = useState("");
  const [selectedInquiryDate, setSelectedInquiryDate] = useState("");
  const [original_Api_Inquiry, setOriginal_Api_Inquiry] = useState([]);

  // making paginations......
  const [currentPage, setCurrentPage] = useState(1);
  const pagePerItem = 7;
  const lastIndex = currentPage * pagePerItem;
  const firstIndex = lastIndex - pagePerItem;
  const inquiries_show = original_Api_Inquiry.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(original_Api_Inquiry.length / pagePerItem);
  const numbers_ = [...Array(nPage + 1).keys()].slice(1);

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
      {/* working on this componenet.... */}
      {/* <FilterInquiry
        selectedInquiryName={selectedInquiryName}
        setSelectedInquiryName={setSelectedInquiryName}
        selectedInquiryDate={selectedInquiryDate}
        setSelectedInquiryDate={setSelectedInquiryDate}
      /> */}
      {inquiries_show?.length <= 0 ? (
        <CustomLoading />
      ) : (
        <>
          <SingleInquiry inquiries_show={inquiries_show} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.paginationContainer}
          >
            {numbers_.map((num) => {
              return (
                <TouchableOpacity
                  key={num}
                  onPress={() => setCurrentPage(num)}
                  style={[styles.paginationTextContainer]}
                >
                  <Text
                    style={[
                      styles.paginationText,
                      currentPage === num ? styles.activePaginationText : null,
                    ]}
                  >
                    {num}
                  </Text>
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
    gap: responsiveWidth(3),
    width: responsiveWidth(100),
    height: responsiveHeight(6),
    justifyContent: "center",
    position: "relative",
    bottom: responsiveHeight(-7),
  },
  paginationTextContainer: {
    height: responsiveHeight(5),
  },
  paginationText: {
    borderRadius: 40,
    padding: responsiveFontSize(1.2),
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    elevation: 1,
    backgroundColor: "#FFFFFF",
    fontSize: responsiveFontSize(2),
    fontWeight: 600,
    color: "#26CBED",
  },
  activePaginationText: {
    borderRadius: 40,
    padding: responsiveFontSize(1.2),
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    elevation: 1,
    backgroundColor: "#26CBED",
    fontSize: responsiveFontSize(1.9),
    color: "white",
  },
});
