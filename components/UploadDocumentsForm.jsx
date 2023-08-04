import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import CustomUpload from "./CustomUpload";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { moderateScale } from "react-native-size-matters";
import { RegisterContext } from "../context/RegisterContext";
import axios from "axios";
import { BACKEND_BASE_URL } from "../LOCALS";
import Toast from "react-native-toast-message";

const UploadDocumentsForm = ({ currentPosition, setCurrentPosition }) => {
  const [loading, setLoading] = useState(false);
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
      // just leave
    } else {
      console.log("api called");

      // registerApi();
    }
  };

  const registerApi = async () => {
    setLoading(true);
    const url = `${BACKEND_BASE_URL}pos/register`;

    const payload = {
      image: profile,
      docs: [
        { name: "aadhar_number", file: adhaar },
        { name: "pan_number", file: panCard },
        { name: "passbook", file: passbook },
        { name: "educational_proof", file: edu_Proof },
      ],
      name,
      age,
      email,
      phone,
      address,
      password: "Dummy@123Pwd",
      id_type: "aadharcard",
      id_number: "RE54RGHTV",
      experience,
      detail: workDetails,
      commission: 0,
      commission_type: "percentage",
      bank_name: bankName,
      ifsc_code: ifsc_Code,
      acc_number: account_No,
    };
    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      console.log("response", response.data);
      console.log(response);

      // Show a success message to the user
      Toast.show({
        type: "success",
        text1: "Registration  Succesful", // replace with response message
      });
      nav;
    } catch (err) {
      setLoading(false);
      // Show an error message to the user
      Toast.show({
        type: "error",
        text1: err.response?.data?.msg?.email, // replace with response message
      });
    }
  };

  return (
    <View style={styles.container}>
      <CustomUpload
        title="Aadhar Card"
        value={adhaar}
        onChangeText={setAadhaar}
        uploadType="*/*"
        required={true}
      />
      <CustomUpload
        title="Pan Card"
        value={panCard}
        onChangeText={setPanCard}
        uploadType="*/*"
        required={true}
      />
      <CustomUpload
        title="Upload Bank Statement"
        value={passbook}
        onChangeText={setPassbook}
        uploadType="*/*"
        required={true}
      />
      <CustomUpload
        title="Upload Educational Proof"
        value={edu_Proof}
        onChangeText={setEdu_Proof}
        uploadType="*/*"
        required={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={!loading ? submitRegistration : () => {}}
      >
        <Text style={styles.buttonText}>
          {loading ? "Please wait..." : "Submit"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => setCurrentPosition(currentPosition - 1)}
      >
        <Text style={styles.goBackButtonText}>Go Back</Text>
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
  goBackButton: {
    backgroundColor: "#044291",
    height: responsiveHeight(6),
    borderRadius: moderateScale(6),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: responsiveFontSize(2),
  },
  goBackButtonText: {
    color: "white",
    textAlign: "center",
    alignSelf: "center",
  },
});
