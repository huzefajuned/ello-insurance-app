import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import CommonHeader from "../components/CommonHeader";
import dummyEarningsCard from "../dummyEarningsCards.json";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EarningScreen = () => {
  const insets = useSafeAreaInsets();
  const { accessToken } = useContext(AuthContext);
  useEffect(() => {
    const call_EarningApi = async () => {
      const url = "https://insurance.ellocentlabs.in/api/v1/pos/earning";
      const headers = { Authorization: `${accessToken}` };

      try {
        const data = await axios.get(url, { headers });
        console.log("Earnings", data);
      } catch (error) {
        console.log("errros", error.response.data);
      }
    };
    call_EarningApi();
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingTop: insets.top,
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        backgroundColor: "#F9F9F9",
      }}
    >
      <CommonHeader heading="My Earning" isBackIcon={true} />
      {/* make this a separated componenet later on */}
      {/*   Head */}
      <View style={styles.showMsg}>
        <Text style={styles.hedingText}>This Week</Text>
        <Text style={styles.moneyText}>$290.50</Text>
      </View>

      <View style={styles.cardContainer}>
        {/* separated card */}
        {dummyEarningsCard?.map((single_Card) => {
          const { card_id, icon, heading, dateBy, nextIcon } = single_Card;
          return (
            <View style={styles.card} key={card_id}>
              <View style={styles.InsuranceType}>
                <TouchableOpacity style={styles.cardIconContainer}>
                  <Feather name={icon} style={styles.cardIcon} />
                </TouchableOpacity>

                <View style={styles.earingType}>
                  <Text style={styles.earingHeading}>{heading}</Text>
                  <Text style={styles.earingByDate}>{dateBy}</Text>
                </View>
              </View>
              <View style={styles.time}>
                <TouchableOpacity style={styles.iconContainer}>
                  <Feather name={nextIcon} style={styles.nextIcon} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default EarningScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: responsiveHeight(1),
  },
  showMsg: {
    display: "flex",
    flexDirection: "column",
    gap: responsiveHeight(0.5),
    height: responsiveHeight(15),
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  hedingText: {
    fontSize: responsiveFontSize(2.5),
  },
  moneyText: {
    fontSize: responsiveFontSize(5),
    fontWeight: 800,
  },

  cardContainer: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(90),
    marginLeft: responsiveWidth(5),
    gap: responsiveHeight(1),
    shadowColor: "#00000012",
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    borderColor: "#DDDDDD8F",
    borderTopColor: "white",
    borderWidth: 1,
    borderRadius: 11,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: responsiveWidth(90),
    padding: responsiveWidth(2),
    borderTopColor: "#DDDDDD8F",
    borderTopWidth: 1,
    height: responsiveHeight(10),
    borderRadius: 11,
  },
  earingType: { gap: responsiveHeight(0.5) },
  earingHeading: { fontSize: responsiveFontSize(2.2) },
  earingByDate: { fontSize: responsiveFontSize(1.5) },
  InsuranceType: {
    width: responsiveWidth(70),
    display: "flex",
    flexDirection: "row",
    gap: responsiveWidth(4),
    alignItems: "center",
  },
  cardIconContainer: {},
  cardIcon: { fontSize: responsiveFontSize(4), color: "#26CBED" },
  inquiryCreatorStyle: { fontSize: responsiveFontSize(1.2) },

  imageStyle: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: 50,
    resizeMode: "contain",
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: responsiveWidth(10),
  },
  nextIcon: {
    borderRadius: 50,
    padding: responsiveFontSize(1.5),
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    elevation: 3,
    backgroundColor: "#FFFFFF",
    fontSize: responsiveFontSize(2),
    color: "#26CBED",
  },
});
