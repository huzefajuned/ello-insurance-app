import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
// import MultiSelect from "react-native-multi-select"; // Fixed import statement
import { moderateScale } from "react-native-size-matters";

const CustomDropdown = ({
  placeholder,
  data,
  inlineStyle,
  onValueChange,
  dropdownType,
  label,
}) => {
  const [value, setValue] = useState(null);

  const handleValueChange = (item) => {
    setValue(item.value);
    onValueChange(item.value);
  };

  return (
    <View style={styles.container}>
      {dropdownType === "singleSelect" && (
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
          onChange={handleValueChange}
          keyboardAvoiding={true} // Removed quotes, as keyboardAvoiding prop should be a boolean
        />
      )}
      {dropdownType === "multiSelect" && (
        <MultiSelect
          style={[styles.dropdown]}
          placeholderStyle={[inlineStyle]}
          selectedTextStyle={[styles.selectedTextStyle]}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          iconColor="#37CFEE"
          data={data}
          search
          labelField="label"
          imageField="image"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search..."
          single={false} // To enable multi-select, set single prop to false
          selectedItems={value} // Pass an array of selected items for multi-select
          onSelectedItemsChange={handleValueChange} // Use onSelectedItemsChange for multi-select
          keyboardAvoiding={true} // Removed quotes, as keyboardAvoiding prop should be a boolean
        />
      )}
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
