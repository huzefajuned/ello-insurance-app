import { View, Text, StyleSheet } from "react-native";
import React from "react";

import VideoPlayer from "expo-video-player";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CommonHeader from "../components/CommonHeader";

const VideoPlayerScreen = ({ route }) => {
  const { asset } = route.params;
  console.log("asset", asset);

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <CommonHeader
        heading="Play Video"
        isBackIcon={true}
        isCloseIcon={false}
      />
      <VideoPlayer
        style={styles.videoPlayer}
        fullscreen="true"
        videoProps={{
          shouldPlay: true,
          source: {
            uri: asset,
          },
        }}
        defaultControlsVisible={true}
        timeVisible={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    // gap: responsiveHeight(10),
  },
  videoPlayer: {
    // backgroundColor: "green",
    height: responsiveHeight(100),
    width: responsiveWidth(100),
  },
});

export default VideoPlayerScreen;
