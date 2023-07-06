import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { moderateScale, scale } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";

const TrainingCard = () => {
  const trainingData = [
    {
      key: 1,
      title: "IC 38",
      subTitle: "Basic Agent Training",
    },
    {
      key: 2,
      title: "IC 40",
      subTitle: "Basic Agent Training",
    },
    {
      key: 3,
      title: "IC 44",
      subTitle: "Basic Agent Training",
    },
  ];
  return (
    <View style={styles.trainingContainer}>
      {trainingData.map((data) => {
        return (
          <View key={data.key} style={styles.trainingContainerCard}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: moderateScale(8),
              }}
            >
              <Text style={{ color: "#000000", fontSize: 12, fontWeight: 900 }}>
                {data.title}
              </Text>
              <Text style={{ color: "#000000", fontSize: 12, fontWeight: 300 }}>
                {data.subTitle}
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                <Feather name="share-2" size={22} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default TrainingCard;

const styles = StyleSheet.create({
  // trainingContainer

  trainingContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    margin: "auto",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
  },
  trainingContainerHeader: {
    width: "95%",
  },
  trainingContainerCard: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    justifyContent: "center",
    height: moderateScale(91),
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(14),
    shadowColor: "#00000012",
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    borderColor: "#DDDDDD8F",
    borderWidth: 1,
    borderRadius: 11,
  },
});
