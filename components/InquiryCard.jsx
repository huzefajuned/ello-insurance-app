import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import inquiries from "../dummyInquiry.json";
import CustomDropdown from "./CustomDropdown";
const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];
const InquiryCard = () => {
  return (
    <ScrollView>
      <View style={styles.filterView}>
        <Text>Here will be filter </Text>
        <CustomDropdown
          // key={field.name}
          placeholder="select for filter"
          data={data}
          // dropdownType={field.type}
          // onValueChange={(value) => handleChangeText(field.label, value)}
        />
      </View>
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
  //
  filterView: {
    height: responsiveHeight(10),
  },
});
