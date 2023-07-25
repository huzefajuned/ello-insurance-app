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
import { moderateScale } from "react-native-size-matters";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { ActivityIndicator } from "react-native";

const InsuranceServices = ({
  InsuranceServicesData,
  inputText,
  setInputText,
}) => {
  const [clicked, setClicked] = useState(false);
  // const [inputText, setInputText] = useState("");
  const navigation = useNavigation();

  const handleCardPress = (service) => {
    // Navigate to the form screen with selected state value---
    switch (service.formId) {
      case "TwoWheelerForm":
        alert(service.formId);
        navigation.navigate("InquiryForm", { service });
        break;

      case "FourWheelerForm":
        alert(service.formId);

        navigation.navigate("InquiryForm", { service });
        break;

      case "PensionAndRetirementForm":
        alert(service.formId);

        navigation.navigate("InquiryForm", { service });
        break;

      case "ChildSavingForm":
        alert(service.formId);

        navigation.navigate("InquiryForm", { service });
        break;

      case "HealthForm":
        alert(service.formId);

        navigation.navigate("InquiryForm", { service });
        break;

      default:
        alert("invalid type-", service.formId);

        break;
    }

    // navigation.navigate("InquiryForm", { service });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SearchBar
          setClicked={setClicked}
          clicked={clicked}
          inputText={inputText}
          setInputText={setInputText}
        />
        <Text style={styles.title}>Insurance Service</Text>
      </View>
      <ScrollView contentContainerStyle={styles.servicesContainer}>
        {InsuranceServicesData?.length === 0 ? (
          <View style={{}}>
            <Text>
              <ActivityIndicator size="large" color="#37CFEE" />
            </Text>
          </View>
        ) : (
          <>
            {InsuranceServicesData?.map(
              (service, index) => (
                console.log("service", service),
                (
                  <TouchableOpacity
                    key={index} // replace with  object key
                    style={styles.card}
                    onPress={() => handleCardPress(service)}
                  >
                    <Image
                      source={{
                        uri:
                          service?.logo === null
                            ? "https://t3.ftcdn.net/jpg/01/38/48/40/360_F_138484065_1enzXuW8NlkppNxSv4hVUrYoeF8qgoeY.jpg"
                            : service?.logo,
                      }}
                      style={styles.image}
                    />
                    <Text style={styles.serviceName}>{service?.name}</Text>
                  </TouchableOpacity>
                )
              )
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  content: {
    paddingTop: responsiveFontSize(1),
    paddingHorizontal: responsiveFontSize(1),
    height: responsiveHeight(12),
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
    paddingTop: responsiveFontSize(3),
    justifyContent: "center",
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
    fontSize: responsiveFontSize(1.6),
  },
});

export default InsuranceServices;
