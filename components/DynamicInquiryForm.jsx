import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import CustomRadioButton from "./CustomRadioButton";
import ContactWithCountry from "./ContactWithCountry";
import CustomDropdown from "./CustomDropdown";
import CustomTextInput from "./CustomTextInput";
import CommonDescription from "./CommonDescription";
import { moderateScale } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CommonHeader from "../components/CommonHeader";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import CustomDatePicker from "./CustomDatePicker";

const DynamicInquiryForm = ({ formConfigurations }) => {
  const [selected, setSelected] = useState([]); // for generating textInputs based on dropdown selection---
  // fixing formconfiguration for testing----  remove lateron

  // const genderData = [
  //   { label: "Male", value: "Male" },
  //   { label: "Female", value: "Female" },
  // ];
  // const brandData = [
  //   { label: "Brand A", value: "Brand A" },
  //   { label: "Brand B", value: "Brand B" },
  //   { label: "Brand C", value: "Brand C" },
  // ];
  // const modelData = [
  //   { label: "Model A", value: "Model A" },
  //   { label: "Model B", value: "Model B" },
  //   { label: "Model C", value: "Model C" },
  // ];
  // const fuelTypeData = [
  //   { label: "Fuel Type A", value: "Fuel Type A" },
  //   { label: "Fuel Type B", value: "Fuel Type B" },
  //   { label: "Fuel Type C", value: "Fuel Type C" },
  // ];
  // const manufactureYearData = [
  //   { label: "2020", value: "2020" },
  //   { label: "2021", value: "2021" },
  //   { label: "2022", value: "2022" },
  // ];
  // const variantData = [
  //   { label: "Variant A", value: "Variant A" },
  //   { label: "Variant B", value: "Variant B" },
  //   { label: "Variant C", value: "Variant C" },
  // ];
  // const registrationData = [
  //   { label: "registration A", value: "registration A" },
  //   { label: "registration B", value: "registration B" },
  //   { label: "registration C", value: "registration C" },
  // ];
  // const selectMembers = [
  //   {
  //     label: "Self",
  //     value: "self ",
  //     image:
  //       "https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png",
  //   },
  //   { label: "Spouse", value: "spouse " },
  //   { label: "Son", value: "son " },
  //   { label: "Daughter", value: "daughter " },
  //   { label: "Father", value: "father " },
  //   { label: "Mother", value: "mother" },
  // ];
  // const HealthFormConfigration = [
  //   {
  //     type: "text",
  //     key: "name",
  //     placeholder: "Customer name",
  //   },
  //   {
  //     type: "contact",
  //     key: "contact",
  //     placeholder: "Enter Your Email",
  //   },
  //   {
  //     type: "singleSelect",
  //     key: "gender",
  //     label: "Gender",
  //     data: genderData,
  //   },
  //   {
  //     type: "multiSelect",
  //     key: "members",
  //     label: "Who would you like to get insured?",
  //     data: selectMembers,
  //   },
  // ];
  // fixing formconfiguration for testing----  remove everthing in betweenn commnets---

  const insets = useSafeAreaInsets();

  const [formValues, setFormValues] = useState({});

  const handleChangeText = (key, value) => {
    console.log(value);
    setFormValues({ ...formValues, [key]: value });
  };

  const handleFormSubmit = () => {
    // This function will be called when the "Save Details" button is pressed
    console.log("Form Values:", formValues);
    // You can further process the formValues or send them to an API, etc.
  };

  return (
    <KeyboardAvoidingView
      style={{ paddingTop: insets.top, flex: 1, overflow: "scroll" }}
    >
      <ScrollView>
        <CommonHeader
          heading="Add inquiry"
          isBackIcon={true}
          isCloseIcon={true}
        />
        <CommonDescription
          description="To add a new Inquiry, enter the details of the Inquiry in the input field below."
          inlineStyles={{
            width: responsiveWidth(90),
            marginLeft: responsiveWidth(5),
          }}
        />
        <View style={styles.formContainer}>
          {formConfigurations?.map((field) => {
            switch (field.type) {
              case "text":
                return (
                  <CustomTextInput
                    key={field.key}
                    placeholder={field.placeholder}
                    onChangeText={(value) => handleChangeText(field.key, value)}
                    inlineStyles={styles.inputStyle}
                  />
                );

              case "singleSelect":
                return (
                  <CustomDropdown
                    key={field.key}
                    placeholder={field.label}
                    data={field.data}
                    dropdownType={field.type}
                    // onChangeText={(value) =>
                    //   handleChangeText("contact", value)
                    // }
                    onValueChange={(value) =>
                      handleChangeText(field.key, value)
                    }
                    selected={selected}
                    setSelected={setSelected}
                  />
                );
              case "multiSelect":
                return (
                  <CustomDropdown
                    key={field.key}
                    placeholder={field.label}
                    data={field.data}
                    dropdownType={field.type}
                    // onChangeText={(value) =>
                    //   handleChangeText("contact", value)
                    // }
                    onValueChange={(value) =>
                      handleChangeText(field.key, value)
                    }
                    selected={selected}
                    setSelected={setSelected}
                  />
                );

              case "contact":
                return (
                  <ContactWithCountry
                    key="phoneField"
                    onChangeText={(value) => handleChangeText("contact", value)}
                  />
                );

              case "radio":
                return (
                  <CustomRadioButton
                    label={field.label}
                    key={field.key}
                    data={field.data}
                    onValueChange={(value) =>
                      handleChangeText(field.key, value)
                    }
                    service_FormId={field.service_FormId}
                  />
                );

              case "date":
                return (
                  <CustomDatePicker
                    title={field.label}
                    key={field.key}

                    // key={field.key}
                    // onValueChange={(value) =>
                    //   handleChangeText(field.key, value)
                    // }
                    // service_FormId={field.service_FormId}
                  />
                );
              default:
                return null;
            }
          })}
          {/* Generating custom inputs Based on multiselect--- */}
          {selected?.length > 0 &&
            selected?.map((label) => {
              return (
                <CustomTextInput
                  label={`Your ${label === "self" ? "" : label} age`}
                  key={label}
                  placeholder={`Your ${label === "self" ? "" : label} age`}
                  inlineStyles={styles.selectedStyles}
                  inputMode="numeric"
                  onChangeText={(value) => handleChangeText(label, value)}
                />
              );
            })}

          <TouchableOpacity
            onPress={handleFormSubmit} // Call handleFormSubmit when the button is pressed
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Save Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DynamicInquiryForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: responsiveHeight(2),
    gap: responsiveHeight(0.5),
    // flex: 1, .. un-commnet if u want full height of the container...
    backgroundColor: "white",
    borderRadius: responsiveFontSize(1),
    shadowColor: "#DDDDDD",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    elevation: 3,
    padding: responsiveFontSize(1),
    borderColor: "#DDDDDD",
    borderWidth: 1,
    width: responsiveWidth(90),
    marginLeft: responsiveWidth(5),
  },

  inputStyle: {
    fontSize: responsiveFontSize(2),
    color: "#DCDCDC",
    paddingBottom: responsiveFontSize(1),
    borderBottomWidth: responsiveFontSize(0.2),
    borderColor: "#EEEEEE",
  },
  buttonStyle: {
    fontSize: responsiveFontSize(2),
  },
  selectedStyles: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#EEEEEE",
    height: responsiveHeight(5),
    paddingLeft: responsiveFontSize(2),
    borderRadius: 6,
    color: "#27374D",
    marginTop: responsiveFontSize(0.3),
  },

  saveButton: {
    backgroundColor: "#044291",
    height: responsiveHeight(6),
    borderRadius: moderateScale(6),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: responsiveFontSize(2),
  },
  saveButtonText: {
    color: "white",
    textAlign: "center",
    alignSelf: "center",
  },
});
