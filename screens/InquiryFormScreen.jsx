import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DynamicInquiryForm from "../components/DynamicInquiryForm";

const InquiryFormScreen = ({ navigation, route }) => {

  // const service_FormId = route.params.service.formId;
  const formConfigurations = route?.params?.formConfigurations;

  const insets = useSafeAreaInsets();

  const [formValues, setFormValues] = useState({});

  const handleFormSubmit = () => {
    console.log("Form Values:", formValues);
  };

  const handleChangeText = (key, value) => {
    setFormValues({ ...formValues, [key]: value });
  };

  return (
    <DynamicInquiryForm formConfigurations={formConfigurations} />

    //  use later -- dont remove commented  code--
    // <View
    //   style={{ paddingTop: insets.top, flex: 1, padding: moderateScale(10) }}
    // >
    //   <CommonHeader
    //     heading="Add inquiry"
    //     isBackIcon={true}
    //     isCloseIcon={true}
    //   />
    //   <CommonDescription description="To add a new Inquiry, enter the details of the Inquiry in the input field below." />
    //   <View style={styles.formContainer}>
    //     <View>
    //       <Text style={styles.formHeading}>Customer Details</Text>
    //     </View>
    //     <CustomTextInput
    //       placeholder="Customer name"
    //       onChangeText={(value) => handleChangeText("name", value)}
    //       inlineStyles={styles.inputStyle}
    //     />
    //     <CustomTextInput
    //       placeholder="Primary Email Address"
    //       onChangeText={(value) => handleChangeText("email", value)}
    //       inlineStyles={styles.inputStyle}
    //     />
    //     <CustomDropdown
    //       placeholder="Gender"
    //       data={genderData}
    //       onValueChange={(value) => handleChangeText("gender", value)}
    //       inlineStyle={styles.inputStyle}
    //     />
    //     <ContactWithCountry
    //       onChangeText={(value) => handleChangeText("contact", value)}
    //     />
    //     <CustomRadioButton
    //       onValueChange={(value) => handleChangeText("radioButton", value)}
    // service_FormId={service_FormId}
    //     />
    //     <CustomTextInput
    //       placeholder="Registration Number"
    //       onChangeText={(value) => handleChangeText("reg_number", value)}
    //     />
    //     <CustomDropdown
    //       placeholder="Brand"
    //       data={brandData}
    //       onValueChange={(value) => handleChangeText("brand", value)}
    //       inlineStyle={styles.inputStyle}
    //     />
    //     <CustomDropdown
    //       placeholder="Model"
    //       data={modelData}
    //       onValueChange={(value) => handleChangeText("model", value)}
    //       inlineStyle={styles.inputStyle}
    //     />
    //     <CustomDropdown
    //       placeholder="Fuel Type"
    //       data={fuelTypeData}
    //       onValueChange={(value) => handleChangeText("fuelType", value)}
    //       inlineStyle={styles.inputStyle}
    //     />
    //     <CustomDropdown
    //       placeholder="Manufacture Year"
    //       data={manufactureYearData}
    //       onValueChange={(value) => handleChangeText("manufac_year", value)}
    //       inlineStyle={styles.inputStyle}
    //     />
    //     <CustomDropdown
    //       placeholder="Variant"
    //       data={variantData}
    //       onValueChange={(value) => handleChangeText("variant", value)}
    //       inlineStyle={styles.inputStyle}
    //     />
    //     <Button
    //       color="#37CFEE"
    //       title="Save Details"
    //       onPress={handleFormSubmit}
    //       style={styles.buttonStyle}
    //     />
    //   </View>
    // </View>
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
    borderBottomWidth: 2,
    borderColor: "#EEEEEE",
    color: "#27374D",
    paddingBottom: 5,
  },
  buttonStyle: {
    fontSize: 12,
  },
});

export default InquiryFormScreen;
