import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const CustomRadioButton = () => {
  const [selectedRadio, setSelectedRadio] = useState(1);
  const radioData = [
    {
      key: 1,
      title: "Brand New Vehicle",
    },
    {
      key: 2,
      title: "Registered Vehicle",
    },
  ];

  const handleRadioClick = (radioKey) => {
    setSelectedRadio(radioKey);
  };

  return (
    <TouchableOpacity style={styles.container}>
      {radioData.map((radio) => {
        const isSelected = radio.key === selectedRadio;
        return (
          <TouchableOpacity
            key={radio.key}
            style={styles.radioBtn}
            onPress={() => handleRadioClick(radio.key)}
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
              <Text style={styles.radioText}>{radio.title}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </TouchableOpacity>
  );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between",
    gap: 2,
    overflow: "hidden",
  },
  radioBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    textAlign: "center",
  },
  radioCircle: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: "#37CFEE",
    borderRadius: 50,
  },
  radioInnerCircle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    margin: 3,
    backgroundColor: "#DCDCDC",
  },
  selectedRadioInnerCircle: {
    backgroundColor: "#37CFEE",
  },
  radioText: {
    marginTop: 7,marginLeft:5,
    fontSize: 11,
  },
});
