import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Logo from "../assets/images/logo.png";
import { moderateScale } from "react-native-size-matters";
import Menu from "./Menu";

const Header = () => {
  const [clicked, setClicked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const onPressHeaderIcon = () => {
    setClicked(!clicked);
    setModalOpen(!modalOpen);
  };
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={{ height: 27, width: 39 }} />
          <Text
            style={{
              fontSize: 10,
              letterSpacing: 1,
            }}
          >
            Insurance
          </Text>
        </View>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={() => console.log("Avatar pressed")}>
            <Image
              source={require("../assets/images/avatar.png")}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressHeaderIcon()}>
            <MaterialIcons
              name={clicked ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={35}
              color="#26CBED"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.earningContainer}>
        <View style={styles.earningContainerHeader}>
          <View>
            <Text style={{ fontSize: 16 }}>
              Hello,
              <Text style={{ fontWeight: "bold" }}>Josh!</Text>
            </Text>
          </View>
          {modalOpen && (
            <View style={styles.modal}>
              <Menu />
            </View>
          )}
        </View>
        <View style={styles.earningContainerCard}>
          <Text style={{ color: "#000000", fontSize: 14 }}>My Earning</Text>
          <Text style={{ color: "#000000", fontSize: 18 }}>₹ 38,000 </Text>
          <Text style={{ color: "#707070", fontSize: 12 }}>
            Last Month Earning: May 8, 2023{" "}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    textAlign: "center",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "yellow",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    margin: "auto",
    justifyContent: "space-between",
    padding: moderateScale(2),
    // backgroundColor: "gray",
  },
  logoContainer: {
    // backgroundColor: "green",
    // padding: 10,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    // backgroundColor: "blue",
    alignItems: "center",
    padding: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // earningContainer
  earningContainer: {
    // backgroundColor: "brown",
    width: "100%",
    display: "flex",
    margin: "auto",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // gap: moderateScale(5),
  },
  earningContainerHeader: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: moderateScale(63),
    // backgroundColor: "pink",
  },
  earningContainerCard: {
    display: "flex",
    flexDirection: "column",
    gap: moderateScale(2),
    width: "90%",
    justifyContent: "center",
    height: moderateScale(91),
    backgroundColor: "#FFFFFF",
    padding: moderateScale(14),
    shadowColor: "#DDDDDD8F",
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 11,
  },
  modal: {
    backgroundColor: "#FFFFFF",
    padding: moderateScale(8),
    shadowColor: "#DDDDDD8F",
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 6,
    width: "40%",
  },
});
