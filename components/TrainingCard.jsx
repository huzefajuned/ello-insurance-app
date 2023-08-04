import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, scale } from "react-native-size-matters";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { openBrowserAsync } from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import CustomModal from "./CustomModal";
import { WebView } from "react-native-webview";
import * as WebBrowser from "expo-web-browser";
import CustomLoading from "./CustomLoading";

const TrainingCard = ({ trainingData }) => {
  const [result, setResult] = useState(null);

  const navigation = useNavigation();

  const openTraining = async (data) => {
    const { id, asset_type, asset, title, description } = data;
    if (asset_type === "Link") {
      let result_ = await WebBrowser.openBrowserAsync(asset);
      setResult(result_);
      await navigation.navigate("ViewPdfOrUrl", { result });
    } else if (asset_type === "Document") {
      let result_ = await WebBrowser.openBrowserAsync(asset);
      setResult(result_);
    } else if (asset_type === "Video") {
      let result_ = await WebBrowser.openBrowserAsync(asset);
      setResult(result_);
      // navigation.navigate("VideoPlayerScreen", { asset }); // open in a
    } else {
      console.log(asset_type);
    }
  };

  return (
    <View style={styles.trainingContainer}>
      {trainingData?.length === 0 ? (
        <CustomLoading />
      ) : (
        <ScrollView
          style={styles.trainingContainer}
          showsVerticalScrollIndicator={false}
        >
          <>
            {trainingData?.data?.map((data) => {
              const { id, asset_type, asset, title, description } = data;
              return (
                <View key={id} style={styles.trainingContainerCard}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: moderateScale(8),
                    }}
                  >
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: 900,
                      }}
                    >
                      {title}
                    </Text>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: responsiveFontSize(1.5),
                        width: responsiveWidth(70),
                        fontWeight: 300,
                      }}
                    >
                      {description}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => openTraining(data)}>
                      <MaterialIcons
                        // name="open-in-new"
                        name={
                          asset_type === "Video"
                            ? "play-circle-fill"
                            : "" || asset_type === "Link"
                            ? "link"
                            : "" || asset_type === "Document"
                            ? "picture-as-pdf"
                            : ""
                        }
                        size={22}
                        color="#000000"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </>
        </ScrollView>
      )}
    </View>
  );
};

export default TrainingCard;

const styles = StyleSheet.create({
  trainingContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(80),
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
  },
  trainingContainerHeader: {
    // backgroundColor: "red",
  },
  trainingContainerCard: {
    display: "flex",
    flexDirection: "column",
    height: moderateScale(91),
    backgroundColor: "#FFFFFF",
    display: "flex",
    marginTop: responsiveFontSize(2),
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
  container: {
    flex: 1,
    height: responsiveHeight(70),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
});
