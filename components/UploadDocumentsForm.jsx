import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import CustomUpload from "./CustomUpload";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { RegisterContext } from "../context/RegisterContext";
import axios from "axios";
import { BACKEND_BASE_URL } from "../CONSTANTS";

const UploadDocumentsForm = () => {
  const [loading, setLoading] = useState(false);
  const dummy_id_type = "aadharcard";
  const {
    setIsBlank,
    profile,
    name,
    age,
    email,
    phone,
    address,
    experience,
    workDetails,
    bankName,
    account_No,
    ifsc_Code,
    adhaar,
    setAadhaar,
    panCard,
    setPanCard,
    passbook,
    setPassbook,
    edu_Proof,
    setEdu_Proof,
  } = useContext(RegisterContext);

  const submitRegistration = () => {
    if (!adhaar || !panCard || !passbook || !edu_Proof) {
      setIsBlank(true);
    } else {
      registerApi();
    }
  };

  const registerApi = async () => {
    const url = `${BACKEND_BASE_URL}/api/v1/pos/register`;
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("experience", experience);
    formData.append("workDetails", workDetails);
    formData.append("bank_name", bankName);
    formData.append("acc_number", account_No);
    formData.append("ifsc_code", ifsc_Code);

    // Remove the dummy data for id_type, id_number, and password

    const filesToUpload = [
      { name: "profile", uri: profile },
      { name: "aadhar_number", uri: adhaar },
      { name: "pan_number", uri: panCard },
      { name: "passbook", uri: passbook },
      { name: "educational_proof", uri: edu_Proof },
    ];

    const appendFiles = (files, fieldName) => {
      files.forEach((file) => {
        if (file.uri) {
          formData.append(fieldName, {
            name: file.name,
            uri: file.uri,
          });
        }
      });
    };

    appendFiles(filesToUpload, "docs");

    // Append the correct id_type value (as per the backend's requirement)
    formData.append("id_type", dummy_id_type); // Change "Passport" to the correct value
    formData.append("id_number", "RE54RGHTV");
    formData.append("password", "Dummy@password");

    console.log("formData", formData);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      console.log("response", response.data);
    } catch (err) {
      setLoading(false);
      console.log("Error response data:", err);
    }
  };

  return (
    <View style={styles.container}>
      <CustomUpload
        title="Aadhar Number"
        value={adhaar}
        onChangeText={setAadhaar}
      />
      <CustomUpload
        title="Pan Number"
        value={panCard}
        onChangeText={setPanCard}
      />
      <CustomUpload
        title="Upload Bank Statement"
        value={passbook}
        onChangeText={setPassbook}
      />
      <CustomUpload
        title="Upload Educational Proof"
        value={edu_Proof}
        onChangeText={setEdu_Proof}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={!loading ? submitRegistration : () => {}}
      >
        <Text style={styles.buttonText}>
          {loading ? "Please wait..." : "Submit"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadDocumentsForm;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(84),
    display: "flex",
    flexDirection: "column",
    gap: responsiveFontSize(5),
  },
  button: {
    backgroundColor: "#044291",
    height: responsiveHeight(6),
    borderRadius: moderateScale(6),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    top: responsiveFontSize(2),
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: responsiveFontSize(2),
  },
});
