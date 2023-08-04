import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import inquiries from "../dummyInquiry.json";
import FilterInquiry from "./FilterInquiry";
import { ActivityIndicator } from "react-native";
import {
  getAll_Inquiries,
  extract_UserId,
  formatDate,
} from "../services/apiServices";
import { AuthContext } from "../context/AuthContext";
const InquiryCard = () => {
  const [selectedInquiryName, setSelectedInquiryName] = useState(""); // this state will accces in both component...
  const [selectedInquiryDate, setSelectedInquiryDate] = useState("");
  const [inquiriesFromApi, setInquiriesFromApi] = useState([]); // setFiltered data in this Array--
  const [original_Api_Inquiry, setOriginal_Api_Inquiry] = useState([]);
  useEffect(() => {
    setInquiriesFromApi(inquiries);
  }, []);

  const { accessToken } = useContext(AuthContext);
  const id = extract_UserId(accessToken); // extract user id
  // tetsing getAll_Inquiries api
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
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Filter component */}
      <FilterInquiry
        selectedInquiryName={selectedInquiryName}
        setSelectedInquiryName={setSelectedInquiryName}
        selectedInquiryDate={selectedInquiryDate}
        setSelectedInquiryDate={setSelectedInquiryDate}
        inquiriesFromApi={inquiriesFromApi}
        setInquiriesFromApi={setInquiriesFromApi}
      />
      {original_Api_Inquiry?.length <= 0 ? (
        <View
          style={{
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}>
            <ActivityIndicator size="large" color="#37CFEE" />
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          {original_Api_Inquiry?.map((inquiry) => {
            var ins_Name = inquiry["insurance_category"]
              ? inquiry["insurance_category"]["name"]
              : null;

            var ins_Id = inquiry["id"] ? inquiry["id"] : null;
            var ins_Creator = inquiry["source_ref"]
              ? inquiry["source_ref"]["name"]
              : null;

            var ins_DateOfCreation = inquiry["created"]
              ? inquiry["created"]
              : null;

            const {
              inquiry_Name = ins_Name,
              inquiry_Image, // not available
              createdBy = ins_Creator,
              DateOfCreation = ins_DateOfCreation,
              inquiry_ID = ins_Id,
            } = inquiry;
            return (
              <View style={styles.card} key={inquiry_ID}>
                <View style={styles.InsuranceType}>
                  <Image
                    source={{
                      uri:
                        inquiry_Image ||
                        "https://previews.123rf.com/images/urfandadashov/urfandadashov1805/urfandadashov180500070/100957966-photo-not-available-icon-isolated-on-white-background-vector-illustration.jpg",
                    }}
                    style={styles.imageStyle}
                    resizeMethod="scale"
                  />
                  <View>
                    <Text style={styles.inquiryStyle}>
                      {inquiry_Name || "Not Available"}
                    </Text>
                    <Text style={styles.inquiryCreatorStyle}>{createdBy}</Text>
                  </View>
                </View>
                <View style={styles.time}>
                  <Text style={styles.dateStyle}>
                    {formatDate(DateOfCreation)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default InquiryCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: responsiveHeight(1),
  },
  card: {
    // backgroundColor: "gray",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: responsiveWidth(90),
    marginLeft: responsiveWidth(5),
    padding: responsiveWidth(2),
    shadowColor: "#00000012",
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    borderColor: "#DDDDDD8F",
    borderWidth: 1,
    borderRadius: 11,
  },
  InsuranceType: {
    // backgroundColor: "green",
    width: responsiveWidth(70),
    display: "flex",
    flexDirection: "row",
    gap: responsiveWidth(4),
    alignItems: "center",
  },
  inquiryStyle: { fontSize: responsiveFontSize(1.8) },
  inquiryCreatorStyle: { fontSize: responsiveFontSize(1.2) },
  dateStyle: { fontSize: responsiveFontSize(1.5), fontWeight: 700 },

  imageStyle: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: 50,
    resizeMode: "contain",
  },
});
