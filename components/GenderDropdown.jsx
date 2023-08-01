import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const GenderDropdown = ({
  options,
  selectedOption,
  onSelect,
  value,
  selectedGender,
  setSelectedGender,
  onSelectOption
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    onSelectOption(selectedGender)
  };

  const handleOptionSelect = (option) => {
    setSelectedGender(option);
    setIsOpen(false);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {/* Dropdown options */}
      {isOpen && (
        <View
          style={{
            position: "absolute",
            bottom: responsiveFontSize(2),
            right: responsiveFontSize(1),
            backgroundColor: "white",
            padding: responsiveFontSize(2),
            borderRadius: responsiveFontSize(1),
            borderColor: "#DDDDDD",
            borderWidth: 1,
          }}
        >
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={{ paddingVertical: 5 }}
              onPress={() => handleOptionSelect(option)}
            >
              <Text
                style={{
                  fontSize: responsiveFontSize(1.9),
                  color: "#444444",
                  borderColor: "#DDDDDD",
                  borderBottomWidth: 1,
                }}
              >
                {value || option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          flex: 1,
          alignSelf: "center",
        }}
        onPress={toggleDropdown}
      >
        <Text
          style={{
            fontSize: responsiveFontSize(1.8),
            color: "#444444",
          }}
        >
          {selectedOption}
        </Text>
        <Feather
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={responsiveFontSize(2)}
          color="#444444"
          style={{
            justifyContent: "center",
            textAlign: "right",
            marginLeft: responsiveWidth(40),
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GenderDropdown;
