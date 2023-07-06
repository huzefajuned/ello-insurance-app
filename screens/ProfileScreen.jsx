import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import userAavatar from "../assets/images/avatar.png";
import { useNavigation } from "@react-navigation/native";
import CommonHeader from "../components/CommonHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleGoBack = () => {
    navigation.navigate("Home");
  };
  const profile = {
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main Street",
    mobile: "555-1234",
    gender: "Male",
    idType: "Passport",
    idNumber: "AB123456",
    image: userAavatar,
  };

  const infoRows = [
    {
      title: "Name",
      text: profile.name,
      icon: "user",
      color: "#26CBED",
    },
    {
      title: "Email",
      text: profile.email,
      icon: "mail",
      color: "#26CBED",
    },
    {
      title: "Address",
      text: profile.address,
      icon: "map-pin",
      color: "#26CBED",
    },
    {
      title: "Mobile",
      text: profile.mobile,
      icon: "phone",
      color: "#26CBED",
    },
    {
      title: "Gender",
      text: profile.gender,
      icon: "user",
      color: "#26CBED",
    },
    {
      title: "ID Type",
      text: profile.idType,
      icon: "user",
      color: "#26CBED",
    },
    {
      title: "ID Number",
      text: profile.idNumber,
      icon: "hash",
      color: "#26CBED",
    },
  ];

  return (
    <SafeAreaView
      style={{
        paddingTop: insets.top,
        padding:moderateScale(10),

        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CommonHeader heading="My Profile" isBackIcon={true} />

      <View style={styles.profileContainer}>
        <Image source={profile.image} style={styles.profileImage} />
      </View>

      <View style={styles.infoContainer}>
        {infoRows.map((row, index) => (
          <View style={styles.infoRow} key={index}>
            <View style={styles.iconContainer}>
              <Feather
                name={row.icon}
                size={20}
                color={row.color}
                style={styles.icon}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.infoTitle}>{row.title}:</Text>
              <Text style={styles.infoText}>{row.text}</Text>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#F9F9F9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  backIcon: {
    marginRight: 10,
    borderRadius: 50,
    padding: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    elevation: 3,
    backgroundColor: "#FFFFFF",
    fontSize: 24,
    color: "#26CBED",
  },
  profileText: {
    fontSize: 20,
    color: "#000000",
    marginLeft: "20%",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  profileImage: {
    width: 142,
    height: 142,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoContainer: {
    width: "100%",
    alignItems: "center",
    // backgroundColor:"red"
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 27,
    width: "90%",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    backgroundColor: "#FFFFFF",
    height: 42,
    borderRadius: 11,
  },
  iconContainer: {
    borderRightColor: "#DDDDDD",
    borderRightWidth: 1,
    width: "20%",
    height: "90%",
    justifyContent: "center",
    textAlign: "cente",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "flex-end",
    marginLeft: 10,
  },
  infoTitle: {
    marginRight: 10,
    fontSize: 8,
    color: "#444444",
  },
  infoText: {
    fontSize: 14,
    color: "#444444",
  },
});

export default ProfileScreen;
