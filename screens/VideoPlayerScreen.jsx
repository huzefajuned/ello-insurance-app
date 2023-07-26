import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const VideoPlayerScreen = ({ route }) => {
  const { asset } = route.params;
  console.log("asset", asset);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [statusSecondVideo, setStatusSecondVideo] = React.useState({});

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: asset,
        }}
        useNativeControls
        isLooping
        onPlaybackStatusUpdate={setStatus}
        resizeMode={ResizeMode.CONTAIN}
      />
      <StatusBar style="auto" backgroundColor="white" />
    </View>
  );
};

export default VideoPlayerScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:'red',
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  buttons: {
    margin: 16,
  },
});
