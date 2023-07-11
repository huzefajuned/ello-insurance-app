import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
// import InquiryHeader from "../components/InquiryHeader";
import CommonHeader from "../components/CommonHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import CommonDescription from "../components/CommonDescription";
import CustomDropdown from "../components/CustomDropdown";
import CustomTextInput from "../components/CustomTextInput";
import ContactWithCountry from "../components/ContactWithCountry";
import CustomRadioButton from "../components/CustomRadioButton";

const InquiryForm = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [formValues, setFormValues] = useState({});
  const [gender, setGender] = useState(""); // New state for gender

  const handleFormSubmit = () => {
    console.log("Form Values:", formValues);
  };

  const handleChangeText = (key, value) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

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

  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: moderateScale(10),
      }}
    >
      <CommonHeader
        heading="Add inquiry"
        isBackIcon={true}
        isCloseIcon={true}
      />
      <CommonDescription description="To add a new Inquiry, enter the details of the Inquiry in the input field below." />
      <View style={styles.formContainer}>
        <View>
          <Text style={{ color: "#000000", fontSize: 14 }}>
            Customer Details
          </Text>
        </View>
        <CustomTextInput
          placeholder="Customer name"
          inlineStyles={{ fontSize: 14, color: "#DCDCDC" }}
        />
        <CustomTextInput
          placeholder="Primary Email Address"
          inlineStyles={{ fontSize: 14, color: "#DCDCDC" }}
        />
        <CustomDropdown
          placeholder="Gender"
          data={genderData}
          inlineStyle={{ fontSize: 14, color: "#DCDCDC" }}
        />
        <ContactWithCountry />
        <CustomRadioButton />
        <CustomTextInput
          placeholder="Registration Number"
          data={registrationData}
        />
        <CustomDropdown
          placeholder="Brand"
          data={brandData}
          inlineStyle={{ fontSize: 14, color: "#DCDCDC" }}
        />

        <CustomDropdown
          placeholder="Model"
          data={modelData}
          inlineStyle={{ fontSize: 14, color: "#DCDCDC" }}
        />
        <CustomDropdown
          placeholder="Fuel Type"
          data={fuelTypeData}
          inlineStyle={{ fontSize: 14, color: "#DCDCDC" }}
        />
        <CustomDropdown
          placeholder="Manufacture Year"
          data={manufactureYearData}
          inlineStyle={{ fontSize: 14, color: "#DCDCDC" }}
        />
        <CustomDropdown
          placeholder="Varient"
          data={variantData}
          inlineStyle={{ fontSize: 14, color: "#DCDCDC" }}
        />

        <Button
          color="#37CFEE"
          title="Save Details"
          onPress={handleFormSubmit}
          style={{ fontSize: 12 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inlineStyles: {
    placeholderFontSize: 14,
    color: "#DCDCDC",
  },
  container: {
    padding: 10,
    height: "100%",
    // backgroundColor: "gray",
    width: "100%",
  },
  headerContainer: {
    // height: "20%",
    width: "100%",
    backgroundColor: "red",
    // alignItems: "center",
    // justifyContent: "center",
  },
  formContainer: {
    marginTop: 5,
    gap: 5,
    height: "80%",
    width: "100%",
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
  input: {
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    height: 40,
    width: "100%",
  },
  picker: {
    height: 0,
    width: "100%",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
    // backgroundColor: "red",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioLabel: {
    // marginLeft: 10,
  },
  radioContainerInner: {
    width: "50%",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    // backgroundColor: "gray",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#37CFEE",
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#37CFEE",
    // marginLeft: 10,
  },
});

export default InquiryForm;
