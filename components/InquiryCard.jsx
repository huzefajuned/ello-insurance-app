import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React,{useState} from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import inquiries from "../dummyInquiry.json";
import FilterInquiry from "./FilterInquiry";

const InquiryCard = () => {

  const [value, setValue] = useState(null); // this state will accces in both component...

  return (
    <ScrollView>
      {/* Filter component */}
      <FilterInquiry value={value} setValue={setValue} />
      <View style={styles.container}>
        {inquiries?.map((inquiry) => {
          const {
            inquiry_Name,
            inquiry_Image,
            createdBy,
            DateOfCreation,
            inquiry_ID,
          } = inquiry;
          return (
            <View style={styles.card} key={inquiry_ID}>
              <View style={styles.InsuranceType}>
                <Image
                  source={{
                    uri: inquiry_Image,
                  }}
                  style={styles.imageStyle}
                  resizeMethod="scale"
                />
                <View>
                  <Text style={styles.inquiryStyle}>{inquiry_Name}</Text>
                  <Text style={styles.inquiryCreatorStyle}>{createdBy}</Text>
                </View>
              </View>
              <View style={styles.time}>
                <Text style={styles.dateStyle}>{DateOfCreation}</Text>
              </View>
            </View>
          );
        })}
      </View>
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