import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import BankDetailsForm from "../components/BankDetailsForm";
import UploadDocumentsForm from "../components/UploadDocumentsForm";
import StepIndicator from "react-native-step-indicator";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const labels = ["Personal Details", "Bank Details", "Upload Documents"];
  const [currentPosition, setCurrentPosition] = useState(0);

  const handleStepClick = (step) => {
    setCurrentPosition(step);
  };

  const renderForm = () => {
    switch (currentPosition) {
      case 0:
        return (
          <PersonalDetailsForm
            setCurrentPosition={setCurrentPosition}
            currentPosition={currentPosition}
          />
        );
      case 1:
        return (
          <BankDetailsForm
            setCurrentPosition={setCurrentPosition}
            currentPosition={currentPosition}
          />
        );
      case 2:
        return (
          <UploadDocumentsForm
            setCurrentPosition={setCurrentPosition}
            currentPosition={currentPosition}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.contaniner,
        {
          paddingTop: insets.top,
        },
      ]}
      behavior="padding"
    >
      <View style={styles.innerContainer}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={labels.length}
          onPress={handleStepClick}
        />
        <View style={styles.formContainer}>{renderForm()}</View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  contaniner: {
    // backgroundColor: "gray",
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },

  innerContainer: {
    justifyContent: "center",
    alignSelf: "center",
    // width: responsiveWidth(90),
    // height: responsiveHeight(90),
  },
  stepContainer: {},
  formContainer: {
    flex: 1,
    // marginTop: responsiveFontSize(4),
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#DDDDDD",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    elevation: 3,
    padding: moderateScale(10),
    borderColor: "#DDDDDD",
    borderWidth: 1,
    height: responsiveHeight(90),
    width: responsiveWidth(90),
    // backgroundColor: "red",
  },
});

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#43c8f6",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#fe7013",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#fe7013",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#fe7013",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#12bbf5",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "white",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#43c8f6",
};
