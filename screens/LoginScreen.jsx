import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomForm from "../components/CustomForm";
import { companyLogoApi } from "../services/apiServices";

const LoginScreen = () => {
  const [companyLogo, setCompnayLogo] = useState("");
  const insets = useSafeAreaInsets();

  useEffect(() => {
    async function fetchCompanyLogo() {
      try {
        const response = await companyLogoApi();
        setCompnayLogo(response);
      } catch (error) {
        console.log("Error while fetching company logo:", error);
      }
    }
    fetchCompanyLogo();
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
