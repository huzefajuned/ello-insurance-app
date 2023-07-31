import React, { useContext, useEffect, useState } from "react";
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
import { getdynamicFormJsonApi } from "../services/apiServices";
import { DynamicFormDataContext } from "../context/DynamicFormDataContext";

const InsuranceServices = ({
  InsuranceServicesData,
  inputText,
  setInputText,
}) => {
  const [clicked, setClicked] = useState(false);
  // const [dy_formConfigurations, setDy_formConfigurations] = useState([]);
  const { dy_formConfigurations, setDy_formConfigurations, setLoading } =
    useContext(DynamicFormDataContext);
  // console.log("dy_formConfigurations", dy_formConfigurations);
  const navigation = useNavigation();

  function getObjectById(data, specifiedId) {
    return data.find((obj) => obj.id === specifiedId);
  }

  const handleCardPress = (service) => {
    const formId = service?.formId;
    getdynamicFormJsonApi()
      .then((data) => {
        const specificObject = getObjectById(data?.data?.data, formId);
        if (specificObject) {
          setDy_formConfigurations(specificObject);
        } else {
          console.log("Object with ID", formId, "not found.");
        }
      })
      .catch((error) => {
        console.log("error yes", error);
      });

    if (!isNaN(service.formId)) {
      navigation.navigate("InquiryForm", {
        service,
      });
      // setLoading(false)
    } else {
      // Handle the case when service.formId is not a valid number
      console.log("Invalid form ID:", service.formId);
    }
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
    justifyContent: "space-evenly",
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
  },
  serviceName: {
    marginTop: responsiveFontSize(1),
    fontSize: responsiveFontSize(1.6),
    width: responsiveWidth(22),
    textAlign: "center",
  },
});

export default InsuranceServices;
