import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { responsiveFontSize } from "react-native-responsive-dimensions";
// import MultiSelect from "react-native-multi-select"; // Fixed import statement
import { moderateScale } from "react-native-size-matters";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const CustomDropdown = ({
  placeholder,
  data,
  inlineStyle,
  onValueChange,
  dropdownType,
  label,
  selected,
  setSelected,
}) => {
  const [value, setValue] = useState(null);
  // const [selected, setSelected] = useState([]);
  console.log("selected length", selected.length);

  const handleValueChange = (item) => {
    setValue(item.value);
    onValueChange(item.value);
  };

  return (
    <View style={styles.container}>
      {dropdownType === "singleSelect" && (
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
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
          style={styles.dropdown}
          containerStyle={styles.multiSelectContainer}
          itemContainerStyle={styles.multiselectItemContainerStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          iconColor="#37CFEE"
          search
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search..."
          value={selected}
          onChange={(item) => {
            setSelected(item);
          }}
          selectedStyle={styles.selectedStyle}
          keyboardAvoiding={true}
        />
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: responsiveFontSize(0.2),
    // backgroundColor: "red",
  },
  dropdown: {
    borderColor: "#DCDCDC",
    borderRadius: 0,
    paddingHorizontal: 0,
    // backgroundColor:"red"
  },
  selectedTextStyle: {
    fontSize: responsiveFontSize(1.9),
    color: "#000000",
  },
  iconStyle: {
    width: responsiveFontSize(4),
    height: responsiveFontSize(2),
  },
  placeholderStyle: {
    fontSize: responsiveFontSize(1.8),
  },
  inputSearchStyle: {
    height: moderateScale(35),
    fontSize: responsiveFontSize(1.9),
  },
  selectedStyle: {
    borderRadius: responsiveFontSize(1),
  },
  multiSelectContainer: {
    // backgroundColor: "green",
  },
  multiselectItemContainerStyle: {
    // backgroundColor: "red",
    // fontSize: 10,
  },
});
