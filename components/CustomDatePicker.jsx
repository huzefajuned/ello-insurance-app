import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";

const CustomDatePicker = ({ title, onValueChange }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showDob, setShowDob] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    onValueChange(formatDate(currentDate));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
    setShowDob(true);
  };

  // Function to format the date as "yyyy-mm-dd"
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatepicker} style={styles.innerContainer}>
        <View style={styles.rowContainer}>
          <Text>{title} :</Text>
          {showDob && (
            <Text style={{ fontSize: responsiveFontSize(2) }}>
              {formatDate(date)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(5),
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: responsiveFontSize(0.2),
  },
  innerContainer: {
    justifyContent: "center",
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
