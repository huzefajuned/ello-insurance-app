import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import InsuranceServices from "../components/InsuranceServices";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";
import { moderateScale } from "react-native-size-matters";
import axios from "axios";
import { BACKEND_BASE_URL } from "../CONSTANTS";
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
    <View
      style={{
        paddingTop: insets.top,
        padding: moderateScale(10),
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: moderateScale(10),
        // backgroundColor: "gray",
        height: "100%",
      }}
    >
      <View
        style={{
          // backgroundColor: "red",
          height: "40%",
          overflow: "hidden",
        }}
      >
        <Header />
      </View>
      <View
        style={{
          flex: 1,
          // backgroundColor: "blue",
          // overflow: "scroll",
          height: "60%",
        }}
      >
        <InsuranceServices InsuranceServicesData={InsuranceServicesData} />
      </View>
    </View>
  );
};

export default Home;
