import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const CustomRadioButton = ({ onValueChange, data, label, inlineStyles }) => {
  const [selectedRadio, setSelectedRadio] = useState();
  const handleRadioClick = (radioTitle, radioKey) => {
    // for debugging---
    setSelectedRadio(radioKey);
    onValueChange(radioTitle);
  };

  return (
    <>
      {label && <Text style={styles.labelStyles}>{label}</Text>}

      <TouchableOpacity style={[inlineStyles, styles.container]}>
        {data?.map((radio) => {
          const isSelected = radio.label === selectedRadio;
          return (
            <TouchableOpacity
              key={radio.title || radio.value || radio.key}
              style={styles.radioBtn}
              onPress={() =>
                handleRadioClick(radio.title || radio?.label, radio.label)
              }
            >
              <View style={styles.radioCircle}>
                <View
                  style={[
                    styles.radioInnerCircle,
                    isSelected ? styles.selectedRadioInnerCircle : null,
                  ]}
                ></View>
              </View>
              <View>
                <Text style={styles.radioText}>
                  {radio.title || radio.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </TouchableOpacity>
    </>
  );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(90),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: responsiveWidth(5),
    marginTop: responsiveFontSize(1),
    marginBottom: responsiveFontSize(0.5),
  },
  radioBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    textAlign: "center",
  },
  radioCircle: {
    width: responsiveFontSize(4),
    height: responsiveFontSize(4),
    borderWidth: 2,
    borderColor: "#37CFEE",
    borderRadius: 50,
  },
  radioInnerCircle: {
    width: responsiveFontSize(2.5),
    height: responsiveFontSize(2.5),
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    margin: responsiveFontSize(0.5),
    backgroundColor: "#DCDCDC",
  },
  selectedRadioInnerCircle: {
    backgroundColor: "#37CFEE",
  },
  notSelectedRadioInnerCircle: {
    backgroundColor: "red",
  },
  radioText: {
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveWidth(1.2),
    marginLeft: responsiveWidth(1),
  },
  labelStyles: {
    fontSize: responsiveFontSize(2),
    marginTop: responsiveFontSize(1),
    // backgroundColor:'red'
  },
});
