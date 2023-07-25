import { View, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import CustomForm from "../components/CustomForm";
import { BACKEND_BASE_URL } from "../CONSTANTS";
import axios from "axios";

const LoginScreen = () => {
  const [companyLogo, setCompnayLogo] = useState(null);
  const insets = useSafeAreaInsets();
  const logo_url = `${BACKEND_BASE_URL}/api/v1/company-settings/1`; //${userProfle?.org_id}

  const handleCompanyLogo = async () => {
    try {
      const response = await axios.get(logo_url);
      setCompnayLogo(response?.data?.data.logo);
    } catch (error) {
      console.log("error in handleCompanyLogo", error);
    }
  };
  useEffect(() => {
    handleCompanyLogo();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <CustomForm companyLogo={companyLogo} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
