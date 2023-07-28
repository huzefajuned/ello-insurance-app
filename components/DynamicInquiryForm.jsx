import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
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
import { RegisterContext } from "../context/RegisterContext";
import { DynamicFormDataContext } from "../context/DynamicFormDataContext";
import { fixedInputsInForms } from "../CONSTANTS";
import { useNavigation } from "@react-navigation/native";

const DynamicInquiryForm = () => {
  const { dy_formConfigurations } = useContext(DynamicFormDataContext);
  const [loading, setLoading] = useState(true);
  const { setIsBlank } = useContext(RegisterContext);
  const [selectedRadio, setSelectedRadio] = useState(2); // ststes for chnaging

  const [selected, setSelected] = useState([]); // for generating textInputs based on dropdown selection---
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [formValues, setFormValues] = useState({});
  setTimeout(() => {
    setLoading(false);
  }, 1000);

  const handleChangeText = (key, value) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleFormSubmit = () => {
    console.log("formValues", formValues);
    alert(`We will back to you...😊 , ${formValues["customer-name"]}`);

    // dummy timeout, do it later using apis.....
    setTimeout(() => {
      navigation.navigate("Tabs");
    }, 1000);
  };

  //  function using Regular expression to extract text within HTML tags...
  function extractTextFromHTML(htmlSnippet) {
    const regex = />(.*?)<\/\w+>/;
    const match = htmlSnippet.match(regex);
    const extractedText = match ? match[1] : "";
    return extractedText;
  }

  return (
    <KeyboardAvoidingView
      style={{
        paddingTop: insets.top,
        flex: 1,
        overflow: "scroll",
        backgroundColor: "#F9F9F9",
      }}
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

        {loading ? (
          <Text style={styles.loading}>
            <ActivityIndicator
              size="large"
              color="#37CFEE"
              style={styles.loadingLoader}
            />
          </Text>
        ) : (
          <View style={styles.formContainer}>
            <View>
              <Text>Customer Details</Text>
            </View>

            <>
              {/*  mantory filds for all forms--- */}
              {fixedInputsInForms?.map((field) => {
                // console.log("field",field)
                switch (field.type) {
                  case "text":
                    return (
                      <CustomTextInput
                        key={field.key}
                        placeholder={field.placeholder}
                        onChangeText={(value) =>
                          handleChangeText(field.key, value)
                        }
                        inlineStyles={styles.inputStyle}
                        inputMode={field.inputMode}
                        value={formValues[field.key]}
                      />
                    );
                  case "number": // remove this later if needed.
                    return (
                      <CustomTextInput
                        key={field.key || field.name}
                        placeholder={field.placeholder || field.name}
                        onChangeText={(value) =>
                          handleChangeText(field.key, value)
                        }
                        inlineStyles={styles.inputStyle}
                        inputMode={field.inputMode}
                        value={formValues[field.key]}
                      />
                    );

                  case "contact":
                    return (
                      <ContactWithCountry
                        key="phoneField"
                        onChangeText={(value) =>
                          handleChangeText("contact", value)
                        }
                      />
                    );
                  default:
                    return null;
                }
              })}
              {/*  mapping all fields based on api responses */}
              {dy_formConfigurations?.fields?.map((field) => {
                switch (field.type) {
                  case "text":
                    return (
                      <CustomTextInput
                        key={
                          field.key ||
                          field.placeholder ||
                          field.name ||
                          field.label
                        }
                        placeholder={
                          field.placeholder || field.label || field.name
                        }
                        onChangeText={(value) =>
                          handleChangeText(
                            field.key ||
                              field.placeholder ||
                              field.label ||
                              field.name,
                            value
                          )
                        }
                        inlineStyles={styles.inputStyle}
                        inputMode={field.inputMode}
                        value={formValues[field.name]}
                      />
                    );

                  case "textarea":
                    return (
                      <CustomTextInput
                        key={field.key || field.placeholder || field.name}
                        placeholder={extractTextFromHTML(
                          field.placeholder || field.label || field.name
                        )}
                        onChangeText={(value) =>
                          handleChangeText(
                            extractTextFromHTML(field.label),
                            value
                          )
                        }
                        inlineStyles={styles.inputStyle}
                        inputMode={field.inputMode}
                        value={formValues[field.name]}
                        multiline={true}
                      />
                    );

                  case "number": // remove this later if needed.
                    return (
                      <CustomTextInput
                        key={field.key || field.name}
                        placeholder={
                          field.placeholder || field.label || field.name
                        }
                        onChangeText={(value) =>
                          handleChangeText(
                            field.key ||
                              field.placeholder ||
                              field.label ||
                              field.name,
                            value
                          )
                        }
                        inlineStyles={styles.inputStyle}
                        inputMode="numeric" // only for  number inputss
                        value={formValues[field.name]}
                      />
                    );

                  case "select": // old was singleselect
                    return (
                      <CustomDropdown
                        key={field.name}
                        placeholder={field.label}
                        data={field.values}
                        dropdownType={field.type}
                        onValueChange={(value) =>
                          handleChangeText(field.label, value)
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
                        onChangeText={(value) =>
                          handleChangeText("contact", value)
                        }
                      />
                    );

                  case "radio":
                    return (
                      <CustomRadioButton
                        label={field.label}
                        key={field.key}
                        data={field.data}
                        onValueChange={(value) =>
                          handleChangeText(field.label, value)
                        }
                        service_FormId={field.service_FormId}
                        value={formValues[field.label]}
                      />
                    );

                  case "radio-group":
                    return (
                      <CustomRadioButton
                        label={extractTextFromHTML(field.label) || field.label}
                        key={field.values}
                        data={field.values}
                        onValueChange={(value) =>
                          handleChangeText(
                            extractTextFromHTML(field.label),
                            value
                          )
                        }
                        service_FormId={field.service_FormId}
                      />
                    );

                  case "date":
                    return (
                      <CustomDatePicker
                        title={field.label}
                        key={field.name}
                        onValueChange={(value) =>
                          handleChangeText(field.label, value)
                        }
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
            </>

            <TouchableOpacity
              onPress={handleFormSubmit} // Call handleFormSubmit when the button is pressed
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Save Details</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DynamicInquiryForm;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    height: responsiveHeight(100),
  },
  loadingLoader: {},
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
    backgroundColor: "#37CFEE",
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
