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

  const navigation = useNavigation();

  const genderData = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  const brandData = [
    { label: "Brand A", value: "Brand A" },
    { label: "Brand B", value: "Brand B" },
    { label: "Brand C", value: "Brand C" },
  ];
  const modelData = [
    { label: "Model A", value: "Model A" },
    { label: "Model B", value: "Model B" },
    { label: "Model C", value: "Model C" },
  ];
  const fuelTypeData = [
    { label: "Fuel Type A", value: "Fuel Type A" },
    { label: "Fuel Type B", value: "Fuel Type B" },
    { label: "Fuel Type C", value: "Fuel Type C" },
  ];
  const manufactureYearData = [
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
  ];
  const variantData = [
    { label: "Variant A", value: "Variant A" },
    { label: "Variant B", value: "Variant B" },
    { label: "Variant C", value: "Variant C" },
  ];
  const registrationData = [
    { label: "registration A", value: "registration A" },
    { label: "registration B", value: "registration B" },
    { label: "registration C", value: "registration C" },
  ];
  const selectMembers = [
    {
      label: "Self",
      value: "self ",
      image:
        "https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png",
    },
    { label: "Spouse", value: "spouse " },
    { label: "Son", value: "son " },
    { label: "Daughter", value: "daughter " },
    { label: "Father", value: "father " },
    { label: "Mother", value: "mother" },
  ];

  const TwoFourWheelerFormConfigration = [
    {
      type: "text",
      key: "name",
      placeholder: "Customer name",
    },
    {
      type: "text",
      key: "email",
      placeholder: "Primary Email Address",
    },
    {
      type: "singleSelect",
      key: "gender",
      label: "Gender",
      data: genderData,
    },
    {
      type: "contact",
      key: "contact",
      label: "contact",
      // data: genderData,
    },
    {
      type: "radio",
      key: "vahicle_type",
      // label: "Gender",
      // data: genderData,
    },
    {
      type: "text",
      key: "reg_number",
      placeholder: "Registration Number",
    },
    {
      type: "singleSelect",
      key: "brand",
      label: "Brand",
      data: brandData,
    },
    {
      type: "singleSelect",
      key: "model",
      label: "Model",
      data: modelData,
    },
    {
      type: "singleSelect",
      key: "fuel_Type",
      label: "Fuel Type",
      data: fuelTypeData,
    },
    {
      type: "singleSelect",
      key: "man_year",
      label: "Manufacture Year",
      data: manufactureYearData,
    },
    {
      type: "singleSelect",
      key: "varient",
      label: "Varient",
      data: variantData,
    },
  ];
  const HealthFormConfigration = [
    {
      type: "text",
      key: "name",
      placeholder: "Customer name",
    },
    {
      type: "contact",
      key: "contact",
      placeholder: "Enter Your Email",
    },
    {
      type: "singleSelect",
      key: "gender",
      label: "Gender",
      data: genderData,
    },
    {
      type: "multiSelect",
      key: "members",
      label: "member",
      data: selectMembers,
    },
  ];
  const ChildSavingFormConfigration = [
    {
      type: "text",
      key: "name",
      placeholder: "Customer name",
    },
    {
      type: "contact",
      key: "contact",
      placeholder: "Enter Your Email",
    },
    {
      type: "singleSelect",
      key: "gender",
      label: "Gender",
      data: genderData,
    },
    {
      type: "multiSelect",
      key: "members",
      label: "member",
      data: selectMembers,
    },
  ];
  const PensionAndRetirementFormConfigration = [
    {
      type: "text",
      key: "name",
      placeholder: "Customer name",
    },
    {
      type: "contact",
      key: "contact",
      placeholder: "Enter Your Email",
    },
    {
      type: "singleSelect",
      key: "gender",
      label: "Gender",
      data: genderData,
    },
    {
      type: "multiSelect",
      key: "members",
      label: "member",
      data: selectMembers,
    },
  ];
  const handleCardPress = (service) => {
    // Navigate to the form screen with selected state value---
    switch (service.formId) {
      case "TwoWheelerForm":
        alert(service.formId);
        navigation.navigate("InquiryForm", {
          formConfigurations: TwoFourWheelerFormConfigration,
          service,
        });
        break;

      case "FourWheelerForm":
        alert(service.formId);
        navigation.navigate("InquiryForm", {
          service,
          formConfigurations: TwoFourWheelerFormConfigration,
        });
        break;

      case "PensionAndRetirementForm":
        alert(service.formId);

        navigation.navigate("InquiryForm", {
          service,
          formConfigurations: PensionAndRetirementFormConfigration,
        });
        break;

      case "ChildSavingForm":
        alert(service.formId);

        navigation.navigate("InquiryForm", {
          service,
          formConfigurations: ChildSavingFormConfigration,
        });
        break;

      case "HealthForm":
        alert(service.formId);

        navigation.navigate("InquiryForm", {
          service,
          formConfigurations: HealthFormConfigration,
        });
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
            {InsuranceServicesData?.map((service, index) => (
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
            ))}
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
