import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "./SearchBar";
import { moderateScale, scale } from "react-native-size-matters";

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
        <View style={styles.servicesContainer}>
          {InsuranceServicesData.map((service, index) => (
            <TouchableOpacity
              key={service.key}
              style={styles.card}
              onPress={handleCardPress}
            >
              <Image source={service.image} style={styles.image} />
              <Text style={styles.serviceName}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    // backgroundColor: "blue",
    // marginBottom: 50,
  },
  content: {
    paddingTop: moderateScale(10),
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 14,
    paddingTop: moderateScale(10),

    paddingBottom: moderateScale(10),
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: scale(92),
    height: scale(91),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 1,
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
    width: 33,
    height: 33,
    resizeMode: "contain",
  },
  serviceName: {
    marginTop: 5,
  },
});

export default InsuranceServices;
