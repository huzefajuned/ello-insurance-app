import { View, Text, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import VideoPlayer from "expo-video-player";
import { ResizeMode } from "expo-av";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CommonHeader from "../components/CommonHeader";
import { ScrollView } from "react-native-gesture-handler";

const VideoPlayerScreen = ({ route }) => {
  const [inFullscreen, setInFullsreen] = useState(false);
  const [inFullscreen2, setInFullsreen2] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const refVideo = useRef(null);
  const refVideo2 = useRef(null);
  const refScrollView = useRef(null);
  const { asset } = route.params;
 

  console.log("asset", asset);

  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      scrollEnabled={!inFullscreen2}
      ref={refScrollView}
      onContentSizeChange={() => {
        if (inFullscreen2) {
          refScrollView.current.scrollToEnd({ animated: true });
        }
      }}
      style={
        [
          // styles.container,
          // {
          //   paddingTop: insets.top,
          // },
        ]
      }
    >
      {/* <CommonHeader
        heading="Play Video"
        isBackIcon={true}
        isCloseIcon={false}
      
      /> */}
      <VideoPlayer
        style={styles.videoPlayer}
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri:asset
            // uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          },
          isMuted: isMute,
        }}
        mute={{
          enterMute: () => setIsMute(!isMute),
          exitMute: () => setIsMute(!isMute),
          isMute,
        }}
        slider={{
          visible: true,
        }}
        fullscreen={{
          visible: true,
        }}
        timeVisible={false}
        defaultControlsVisible={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    alignSelf: "center",
    // justifyContent: "center",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    // gap: responsiveHeight(10),
  },
  videoPlayer: {
    backgroundColor: "green",
    // height: responsiveHeight(100),
    // width: responsiveWidth(100),
  },
});

export default VideoPlayerScreen;
