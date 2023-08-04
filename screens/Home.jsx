import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import InsuranceServices from "../components/InsuranceServices";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";
import axios from "axios";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { BACKEND_LIVE_URL } from "../LOCALS";
// import { AuthContext } from "../context/AuthContext";

const Home = () => {
  // const { removeToken } = useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const [updateNewData, setUpdateNewData] = useState(true);
  const [inputText, setInputText] = useState(null);

  const [InsuranceServicesData, setInsuranceServicesData] = useState([]);
  const [dataFromApi, setDataFromApi] = useState([]);
  const [filteredInsuranceData, setFilteredInsuranceData] = useState([]);

  // removeToken();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_LIVE_URL}insurance-category/product-type`
        );
        const insuranceCategories = response.data?.data.map((item) => ({
          formId: item?.formid?.id,
          name: item?.name,
          logo: item?.logo,
          insurance_category: item.ins_category,
          product_type: item.product_type,
        }));

        setDataFromApi(insuranceCategories);
      } catch (error) {
        // Handle the error
        console.error("error is", error);
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
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
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
    height: responsiveHeight(100),
    overflow: "scroll",
    backgroundColor: "#F9F9F9",
  },
});

export default Home;
