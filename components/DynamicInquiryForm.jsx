import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import CustomRadioButton from "./CustomRadioButton";
import ContactWithCountry from "./ContactWithCountry";
import CustomDropdown from "./CustomDropdown";
import CustomTextInput from "./CustomTextInput";
import CommonDescription from "./CommonDescription";
import { moderateScale } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CommonHeader from "../components/CommonHeader";

const DynamicInquiryForm = ({ formConfigurations }) => {
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
                  onValueChange={(value) => handleChangeText(field.key, value)}
                  inlineStyle={styles.inputStyle}
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
                  onValueChange={(value) => handleChangeText(field.key, value)}
                  inlineStyle={styles.inputStyle}
                />
              );

            case "contact":
              return (
                <ContactWithCountry
                  key={field.key}
                  onChangeText={(value) => handleChangeText("contact", value)}
                />
              );

            case "radio":
              return (
                <CustomRadioButton
                  key={field.key}
                  onValueChange={(value) => handleChangeText(field.key, value)}
                  service_FormId={field.service_FormId}
                />
              );
            default:
              return null;
          }
        })}
        <Button
          color="#37CFEE"
          title="Save Details"
          onPress={handleFormSubmit} // Call handleFormSubmit when the button is pressed
          style={styles.buttonStyle}
        />
      </View>
    </View>
  );
};

export default DynamicInquiryForm;

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
    borderBottomWidth: 2,
    borderColor: "#EEEEEE",
    color: "#27374D",
    paddingBottom: 5,
  },
  buttonStyle: {
    fontSize: 12,
  },
});
