import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
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
  const [InsuranceServicesData, setInsuranceServicesData] = useState([]);

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
        setInsuranceServicesData((prevData) => [
          ...prevData,
          ...insuranceCategories,
        ]);
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header />
      <InsuranceServices InsuranceServicesData={InsuranceServicesData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
    display: "flex",
    flexDirection: "column",
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    // backgroundColor: "red",
  },
});

export default Home;
