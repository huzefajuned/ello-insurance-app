import { View, Text } from "react-native";
import React from "react";
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';

const ViewUrlOrPdf = ({route}) => {
    const { asset } = route.params;

    console.log("asset",asset)
  return (
    <View>
      <WebView style={styles.container} source={{ uri:asset }} />
    </View>
  );
};

export default ViewUrlOrPdf;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:10,
    },
  });
  