import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import InsuranceServices from "../components/InsuranceServices";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";
import { moderateScale } from "react-native-size-matters";
import axios from "axios";
import { BACKEND_BASE_URL } from "../CONSTANTS";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
} from "react-native-responsive-dimensions";

const Home = () => {
  const insets = useSafeAreaInsets();
  const [updateNewData, setUpdateNewData] = useState(true);
  const [inputText, setInputText] = useState(null);

  const [InsuranceServicesData, setInsuranceServicesData] = useState([]);
  const [dataFromApi, setDataFromApi] = useState([]);
  const [filteredInsuranceData, setFilteredInsuranceData] = useState([]);
  console.log("filteredInsuranceData", filteredInsuranceData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_BASE_URL}/api/v1/insurance-category/product-type`
        );
        // Handle the response data
        const insuranceCategories = response.data?.data.map(
          (item) => item.ins_category
        );
        setDataFromApi(insuranceCategories); // Simplify data setting
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const searchFilter = (text) => {
    const searchText = text?.toLowerCase();
    if (!searchText) {
      // If searchText is empty, show all data
      setFilteredInsuranceData(dataFromApi);
    } else {
      const filteredData = dataFromApi.filter((item) => {
        if (typeof item.name === "string") {
          // Use regular expression with 'i' flag for case-insensitive matching
          const regex = new RegExp(`^${searchText}`, "i");
          return regex.test(item.name);
        }
        return false;
      });
      setFilteredInsuranceData(filteredData);
    }
  };

  useEffect(() => {
    if (inputText !== undefined && dataFromApi !== undefined) {
      searchFilter(inputText);
    }
  }, [inputText, dataFromApi]);

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={{ marginBottom: responsiveFontSize(4) }}>
        <Header />
        <InsuranceServices
          InsuranceServicesData={filteredInsuranceData} // Use the filtered data here
          inputText={inputText}
          setInputText={setInputText}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: responsiveWidth(100),
    height: responsiveHeight(90),
    overflow: "scroll",
  },
});

export default Home;
