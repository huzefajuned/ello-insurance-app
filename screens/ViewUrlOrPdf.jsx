import { View, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";

const ViewUrlOrPdf = ({ route }) => {
  const { result } = route.params;
  return (
    <View style={styles.container_2}>
      <Text style={{color:"white"}}>{result && JSON.stringify(result)}</Text>
    </View>
  );
};

export default ViewUrlOrPdf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  container_2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"white"
  },
});
