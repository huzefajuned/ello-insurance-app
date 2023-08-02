import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import CustomDropdown from "../components/CustomDropdown";
import { Dropdown } from "react-native-element-dropdown";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { moderateScale } from "react-native-size-matters";
import inquiries from "../dummyInquiry.json";

const data2 = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const FilterInquiry = ({ value, setValue }) => {
  const [inquiryNames, setInquiryNames] = useState([]);

  // Function to filter and get all  unique inquiry names
  const getUniqueInquiryNames = (inquiries) => {
    const uniqueNames = [];
    inquiries.forEach((inquiry) => {
      const name = inquiry.inquiry_Name;
      if (!uniqueNames.find((obj) => obj.value === name)) {
        uniqueNames.push({ label: name, value: name });
      }
    });
    return uniqueNames;
  };

  useEffect(() => {
    // Fetch inquiriesData or use it directly if already available
    const uniqueNames = getUniqueInquiryNames(inquiries);
    setInquiryNames(uniqueNames);
  }, []);

  const handleValueChange = (item) => {
    setValue(item.value);
  };
  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={[styles.selectedTextStyle]}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        iconColor="#37CFEE"
        data={inquiryNames}
        labelField="label"
        valueField="value"
        placeholder="Insurance Type"
        value={value}
        onChange={handleValueChange}
        backgroundColor="none"
        containerStyle={{
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderColor: "#DDDDDD8F",
          shadowColor: "#00000012",
          shadowOffset: {
            width: 4,
            height: 3,
          },
          shadowOpacity: 1,
          shadowRadius: 6,
          borderWidth: 1,
        }}
        // itemContainerStyle={{backgroundColor:"gray",}}
        itemTextStyle={{ fontSize: responsiveFontSize(1.7) }}
      />
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={[styles.selectedTextStyle]}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        iconColor="#37CFEE"
        data={data2}
        labelField="label"
        valueField="value"
        placeholder="Insurance Date"
        value={value}
        onChange={handleValueChange}
      />
    </View>
  );
};

export default FilterInquiry;

const styles = StyleSheet.create({
  container: {
    marginBottom: responsiveWidth(2),
    justifyContent: "space-between",
    marginTop: responsiveFontSize(1),
    width: responsiveWidth(90),
    marginLeft: responsiveWidth(5),
    display: "flex",
    flexDirection: "row",
    gap: responsiveWidth(5),
  },
  dropdown: {
    borderRadius: 0,
    paddingHorizontal: 0,
    width: responsiveWidth(40),
    borderRadius: 5,
    borderColor: "#DDDDDD8F",
    borderWidth: responsiveFontSize(0.1),
    paddingLeft: responsiveFontSize(0.2),
  },

  selectedTextStyle: {
    fontSize: responsiveFontSize(1.9),
    color: "#000000",
  },
  iconStyle: {
    width: responsiveFontSize(3),
    height: responsiveFontSize(1.5),
  },
  placeholderStyle: {
    fontSize: responsiveFontSize(2),
  },
  inputSearchStyle: {
    height: moderateScale(35),
    fontSize: responsiveFontSize(1.9),
  },
  selectedStyle: {
    borderRadius: responsiveFontSize(1),
  },
});
