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

const FilterInquiry = ({
  selectedInquiryName,
  setSelectedInquiryName,
  selectedInquiryDate,
  setSelectedInquiryDate,
}) => {
  const [inquiryNames, setInquiryNames] = useState([]);
  const [inquiryDates, setInquiryDates] = useState([]);

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

  // Function to filter and get all  unique inquiry dates
  const getUniqueInquiryDates = (inquiries) => {
    const uniqueDates = [];
    inquiries.forEach((inquiry) => {
      const dates = inquiry.DateOfCreation;
      if (!uniqueDates.find((obj) => obj.value === dates)) {
        uniqueDates.push({ label: dates, value: dates });
      }
    });
    return uniqueDates;
  };

  useEffect(() => {
    // Fetch inquiriesData or use it directly if already available
    const uniqueNames = getUniqueInquiryNames(inquiries);
    setInquiryNames(uniqueNames);
    const uniqueDates = getUniqueInquiryDates(inquiries);
    setInquiryDates(uniqueDates);
  }, []);

  const handleProduct_TypeChange = (item) => {
    setSelectedInquiryName(item.value);
  };
  const handleProduct_DateChange = (item) => {
    setSelectedInquiryDate(item.value);
  };

  // Function to filter based on selection of inquiry_type
  function filterByProduct_Type(value) {
    const filtered_Data = inquiries.filter(
      (item) => item.inquiry_Name.indexOf(value) !== -1
    );
    return filtered_Data;
  }

  // Function to filter based on selection of inquiry_Dates
  function filterByProduct_Date(value) {
    const filtered_Data = inquiries.filter(
      (item) => item.DateOfCreation.indexOf(value) !== -1
    );
    return filtered_Data;
  }

  useEffect(() => {
    if (selectedInquiryName !== "") {
      const data = filterByProduct_Type(selectedInquiryName);
      setInquiriesFromApi(data);
    }
  }, [selectedInquiryName]);

  useEffect(() => {
    if (selectedInquiryDate !== "") {
      const data = filterByProduct_Date(selectedInquiryDate);
      setInquiriesFromApi(data);
    }
  }, [selectedInquiryDate]);

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
        value={selectedInquiryName}
        onChange={handleProduct_TypeChange}
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
        data={inquiryDates}
        labelField="label"
        valueField="value"
        placeholder="Insurance Date"
        value={selectedInquiryDate}
        onChange={handleProduct_DateChange}
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
