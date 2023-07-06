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

const formFields = [
  { label: "Customer name", key: "name", keyboardType: "default" },
  {
    label: "Primary Email Address",
    key: "email",
    keyboardType: "email-address",
  },
  { label: "Mobile", key: "mobile", keyboardType: "phone-pad" },
  {
    label: "Brand",
    key: "country",
    picker: true,
    options: ["Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5", "Brand 6"],
  },
  {
    label: "Model",
    key: "model",
    picker: true,
    options: ["Model 1", "Model 2", "Model 3", "Model 4", "Model 5", "Model 6"],
  },
  {
    label: "Fuel Type",
    key: "fuleType",
    picker: true,
    options: [
      "fuleType 1",
      "fuleType 2",
      "fuleType 3",
      "fuleType 4",
      "fuleType 5",
      "fuleType 6",
    ],
  },
  {
    label: "Manufacture Year",
    key: "manufactureYear",
    picker: true,
    options: [
      "manufactureYear 1",
      "manufactureYear 2",
      "manufactureYear 3",
      "manufactureYear 4",
      "manufactureYear 5",
      "manufactureYear 6",
    ],
  },
  {
    label: "Varient",
    key: "varient",
    picker: true,
    options: [
      "Varient 1",
      "Varient 2",
      "Varient 3",
      "Varient 4",
      "Varient 5",
      "Varient 6",
    ],
  },
];

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

  const renderFormField = (field) => {
    if (field.picker) {
      return (
        <Picker
          key={field.key}
          style={styles.picker}
          selectedValue={formValues[field.key]}
          onValueChange={(itemValue) => handleChangeText(field.key, itemValue)}
        >
          <Picker.Item label={`Select ${field.label}`} value="" />
          {field.options.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      );
    } else if (field.key === "mobile") {
      return (
        <View key={field.key}>
          <TextInput
            style={styles.input}
            placeholder={field.label}
            value={formValues[field.key] || ""}
            onChangeText={(text) => handleChangeText(field.key, text)}
            keyboardType={field.keyboardType}
          />
          <View style={styles.radioContainer}>
            <View style={styles.radioContainerInner}>
              <Text style={styles.radioLabel}>Brand New Vehicle</Text>
              <RadioButton
                selected={gender === "Male"}
                onPress={() => handleGenderChange("Male")}
              />
            </View>
            <View style={styles.radioContainerInner}>
              <Text style={styles.radioLabel}> Registered Vehicle</Text>
              <RadioButton
                selected={gender === "Female"}
                onPress={() => handleGenderChange("Female")}
              />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <TextInput
          key={field.key}
          style={styles.input}
          placeholder={field.label}
          value={formValues[field.key] || ""}
          onChangeText={(text) => handleChangeText(field.key, text)}
          keyboardType={field.keyboardType}
        />
      );
    }
  };

  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding:moderateScale(10),

      }}
    >
      <View style={styles.headerContainer}>
        <CommonHeader
          heading="Add inquiry"
          isBackIcon={true}
          isCloseIcon={true}
        />
      </View>
      <View style={styles.formContainer}>
        <View>
          <Text style={{ color: "#000000", fontSize: 16, marginBottom: 5 }}>
            Customer Details
          </Text>
        </View>
        {formFields.map((field) => renderFormField(field))}
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

const RadioButton = ({ selected, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.radio}>
      {selected && <View style={styles.radioDot} />}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
    backgroundColor: "gray",
    width: "100%",
  },
  headerContainer: {
    height: "20%",
    width: "100%",
    // alignItems: "center",
    // justifyContent: "center",
  },
  formContainer: {
    marginTop: 5,
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
