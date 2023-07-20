import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CommonHeader from "../components/CommonHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import TrainingCard from "../components/TrainingCard";
import { AuthContext } from "../context/AuthContext";
import { BACKEND_BASE_URL } from "../CONSTANTS";
import axios from "axios";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const TrainingScreen = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchTrainingData = async () => {
      const headers = { Authorization: `${accessToken}` };
      setLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_BASE_URL}/api/v1/pos/training`,
          { headers }
        );
        await setTrainingData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchTrainingData();
    setLoading(false);
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingTop: insets.top,
        width: responsiveWidth(100),
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignSelf: "center",
      }}
    >
      <CommonHeader heading="Training" isBackIcon={true} />
      <TrainingCard trainingData={trainingData} />
    </SafeAreaView>
  );
};
export default TrainingScreen;
