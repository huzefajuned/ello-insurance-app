import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "./SearchBar";
import { moderateScale, scale } from "react-native-size-matters";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const InsuranceServices = ({ InsuranceServicesData }) => {
  const [clicked, setClicked] = useState(false);
  const navigation = useNavigation();

  const handleCardPress = () => {
    // Navigate to the form screen
    navigation.navigate("InquiryForm");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SearchBar setClicked={setClicked} clicked={clicked} />
        <Text style={styles.title}>Insurance Service</Text>
      </View>
      <ScrollView contentContainerStyle={styles.servicesContainer}>
        {InsuranceServicesData?.map((service, index) => (
          <TouchableOpacity
            key={index} // replace with  object key
            style={styles.card}
            onPress={handleCardPress}
          >
            <Image source={{ uri: service?.image }} style={styles.image} />
            <Text style={styles.serviceName}>{service?.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginTop: 1,
    // backgroundColor: "yellow",
  },
  content: {
    paddingTop: responsiveFontSize(1),
    paddingHorizontal: responsiveFontSize(1),
    height: responsiveHeight(15),
    // backgroundColor: "red",
  },
  title: {
    fontSize: responsiveFontSize(2),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
  },
  servicesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: responsiveFontSize(2),
    justifyContent: "center",
    // backgroundColor: "green",

  },
  card: {
    width: responsiveWidth(25),
    height: responsiveHeight(10),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#0000002B",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 11,
    marginBottom: 10,
  },
  image: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    // resizeMode: "contain",
  },
  serviceName: {
    marginTop: responsiveFontSize(1),
  },
});

export default InsuranceServices;
