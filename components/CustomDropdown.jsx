import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { moderateScale } from "react-native-size-matters";

const CustomDropdown = ({ placeholder, data, inlineStyle }) => {
  const [value, setValue] = useState(null);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={[inlineStyle]}
        selectedTextStyle={[styles.selectedTextStyle]}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        iconColor="#37CFEE"
        data={data}
        search
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
      />
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  dropdown: {
    borderColor: "#DCDCDC",
    borderBottomWidth: 0.3,
    borderRadius: 0,
    paddingHorizontal: 0,
  },

  selectedTextStyle: {
    fontSize: 14,
    color: "#000000",
  },
  iconStyle: {
    width: 15,
    height: 7,
  },
  inputSearchStyle: {
    height: moderateScale(35),
    fontSize: 14,
  },
});
