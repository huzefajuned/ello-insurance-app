import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { formatDate } from "../services/apiServices";

const SingleInquiry = ({ original_Api_Inquiry }) => {
  return (
    <>
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
    </>
  );
};

export default SingleInquiry;

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: responsiveHeight(1),
  },
  container: {
    gap: responsiveHeight(1),
    height: responsiveHeight(70),
    overflow: "hidden",
  },
  card: {
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
