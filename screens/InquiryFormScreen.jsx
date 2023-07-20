import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import CommonHeader from "../components/CommonHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import CommonDescription from "../components/CommonDescription";
import CustomDropdown from "../components/CustomDropdown";
import CustomTextInput from "../components/CustomTextInput";
import ContactWithCountry from "../components/ContactWithCountry";
import CustomRadioButton from "../components/CustomRadioButton";

const InquiryForm = ({ navigation, route }) => {
  const genderData = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  const brandData = [
    { label: "Brand A", value: "Brand A" },
    { label: "Brand B", value: "Brand B" },
    { label: "Brand C", value: "Brand C" },
  ];
  const modelData = [
    { label: "Model A", value: "Model A" },
    { label: "Model B", value: "Model B" },
    { label: "Model C", value: "Model C" },
  ];
  const fuelTypeData = [
    { label: "Fuel Type A", value: "Fuel Type A" },
    { label: "Fuel Type B", value: "Fuel Type B" },
    { label: "Fuel Type C", value: "Fuel Type C" },
  ];
  const manufactureYearData = [
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
  ];
  const variantData = [
    { label: "Variant A", value: "Variant A" },
    { label: "Variant B", value: "Variant B" },
    { label: "Variant C", value: "Variant C" },
  ];
  const registrationData = [
    { label: "registration A", value: "registration A" },
    { label: "registration B", value: "registration B" },
    { label: "registration C", value: "registration C" },
  ];

  const service_Type = route.params.service.name;

  const insets = useSafeAreaInsets();

  const [formValues, setFormValues] = useState({});

  const handleFormSubmit = () => {
    console.log("Form Values:", formValues);
  };

  const handleChangeText = (key, value) => {
    setFormValues({ ...formValues, [key]: value });
  };

  return (
    <View
      style={{ paddingTop: insets.top, flex: 1, padding: moderateScale(10) }}
    >
      <CommonHeader
        heading="Add inquiry"
        isBackIcon={true}
        isCloseIcon={true}
      />
      <CommonDescription description="To add a new Inquiry, enter the details of the Inquiry in the input field below." />
      <View style={styles.formContainer}>
        <View>
          <Text style={styles.formHeading}>Customer Details</Text>
        </View>
        <CustomTextInput
          placeholder="Customer name"
          onChangeText={(value) => handleChangeText("name", value)}
          inlineStyle={styles.inputStyle}
        />
        <CustomTextInput
          placeholder="Primary Email Address"
          onChangeText={(value) => handleChangeText("email", value)}
          inlineStyle={styles.inputStyle}
        />
        <CustomDropdown
          placeholder="Gender"
          data={genderData}
          onValueChange={(value) => handleChangeText("gender", value)}
          inlineStyle={styles.inputStyle}
        />
        <ContactWithCountry
          onChangeText={(value) =>
            handleChangeText("contact", value)
          }
        />
        <CustomRadioButton
          onValueChange={(value) => handleChangeText("radioButton", value)}
        />
        <CustomTextInput
          placeholder="Registration Number"
          onChangeText={(value) =>
            handleChangeText("reg_number", value)
          }
        />
        <CustomDropdown
          placeholder="Brand"
          data={brandData}
          onValueChange={(value) => handleChangeText("brand", value)}
          inlineStyle={styles.inputStyle}
        />
        <CustomDropdown
          placeholder="Model"
          data={modelData}
          onValueChange={(value) => handleChangeText("model", value)}
          inlineStyle={styles.inputStyle}
        />
        <CustomDropdown
          placeholder="Fuel Type"
          data={fuelTypeData}
          onValueChange={(value) => handleChangeText("fuelType", value)}
          inlineStyle={styles.inputStyle}
        />
        <CustomDropdown
          placeholder="Manufacture Year"
          data={manufactureYearData}
          onValueChange={(value) => handleChangeText("manufac_year", value)}
          inlineStyle={styles.inputStyle}
        />
        <CustomDropdown
          placeholder="Variant"
          data={variantData}
          onValueChange={(value) => handleChangeText("variant", value)}
          inlineStyle={styles.inputStyle}
        />
        <Button
          color="#37CFEE"
          title="Save Details"
          onPress={handleFormSubmit}
          style={styles.buttonStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 5,
    gap: 5,
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#DDDDDD",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    elevation: 3,
    padding: 10,
    borderColor: "#DDDDDD",
    borderWidth: 1,
  },
  formHeading: {
    color: "#000000",
    fontSize: 14,
  },
  inputStyle: {
    fontSize: 14,
    color: "#DCDCDC",
  },
  buttonStyle: {
    fontSize: 12,
  },
});

export default InquiryForm;
