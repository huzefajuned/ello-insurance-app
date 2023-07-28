import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CommonHeader from "../components/CommonHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import base64 from "react-native-base64";
import { BACKEND_BASE_URL } from "../CONSTANTS";
import axios from "axios";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Menu from "../components/Menu";
import { moderateScale } from "react-native-size-matters";
import GenderDropdown from "../components/GenderDropdown";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { accessToken, removeToken } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const modalAnimation = new Animated.Value(0);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedGender, setSelectedGender] = useState("Male");

  const tokenParts = accessToken?.split(".");
  const payload = tokenParts?.[1];

  const decodedPayload = payload ? base64?.decode(payload) : null;

  let id;
  try {
    id = decodedPayload ? JSON?.parse(decodedPayload)?.id : null;
  } catch (error) {
    console.error("Error parsing payload:", error);
  }

  const url = `${BACKEND_BASE_URL}/api/v1/pos/${id}`;

  const handleProfile = async () => {
    const headers = { Authorization: `${accessToken}` };
    setLoading(true);
    try {
      const response = await axios.get(url, { headers });
      setUserProfile(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  const infoRows = [
    {
      title: "Name",
      text: userProfile?.name,
      icon: "user",
      color: "#26CBED",
      canEdit: "false",
    },
    {
      title: "Email",
      text: userProfile?.email,
      icon: "mail",
      color: "#26CBED",
      canEdit: "true",
    },
    {
      title: "Address",
      text: userProfile?.address,
      icon: "map-pin",
      color: "#26CBED",
      canEdit: "false",
    },
    {
      title: "Mobile",
      text: userProfile?.phone,
      icon: "phone",
      color: "#26CBED",
      canEdit: "false",
    },
    {
      title: "Gender",
      text: userProfile?.gender,
      icon: "user",
      color: "#26CBED",
      canEdit: "true",
    },
  ];

  const closeModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => setModalOpen(false));
  };

  const handleChangeText = (key, value) => {
    console.log(key, value);
    setFormValues({ ...formValues, [key]: value });
  };

  const handleUpdateProfile = () => {
    // integrate uopdate api later on-----
    console.log("Updated Profile:", formValues);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <CommonHeader
        heading="My Profile"
        isBackIcon={true}
        onPressBack={handleGoBack}
      />
      {loading ? (
        <View
          style={{
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}>
            <ActivityIndicator size="large" color="#37CFEE" />
          </Text>
        </View>
      ) : (
        <View>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: userProfile?.image }}
              style={styles.profileImage}
            />
            <TouchableOpacity onPress={() => setModalOpen(true)}>
              <Feather
                name="settings"
                size={responsiveFontSize(3.5)}
                color="#26CBED"
              />
            </TouchableOpacity>
          </View>
          <Modal
            visible={modalOpen}
            transparent
            animationType="fade"
            onRequestClose={closeModal}
          >
            <TouchableOpacity
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPress={closeModal}
            >
              <Animated.View
                style={[
                  styles.modal,
                  {
                    top: insets.top,
                    transform: [
                      {
                        translateX: modalAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            responsiveWidth(100),
                            responsiveWidth(70),
                          ],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Menu />
              </Animated.View>
            </TouchableOpacity>
          </Modal>

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
                  {row.canEdit === "true" ? (
                    row.title === "Gender" ? (
                      <GenderDropdown
                        selectedGender={selectedGender}
                        setSelectedGender={setSelectedGender}
                        options={["Male", "Female"]}
                        // value={selectedGender}
                        selectedOption={selectedGender}
                        onSelectOption={(option) =>
                          handleChangeText(row.title, option)
                        }
                      />
                    ) : (
                      <TextInput
                        style={styles.modalInput}
                        value={formValues[row.title] || row.text}
                        onChangeText={(text) =>
                          handleChangeText(row.title, text)
                        }
                      />
                    )
                  ) : (
                    <>
                      <Text style={styles.infoTitle}>{row.title}:</Text>
                      <Text style={styles.infoText}>{row.text}</Text>
                    </>
                  )}
                </View>
                {row.canEdit === "true" && (
                  <TouchableOpacity onPress={handleUpdateProfile}>
                    <Feather
                      name="edit"
                      size={responsiveFontSize(2.1)}
                      color="red"
                      style={{ marginRight: responsiveFontSize(1) }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {/* {infoRows.map((row, index) => (
              <View style={styles.modalRow} key={index}>
                <Text style={styles.modalLabel}>{row.title}:</Text>
                {row.canEdit ? (
                  row.title === "Gender" ? (
                    <GenderDropdown
                      options={["Male", "Female"]}
                      selectedOption={
                        formValues[row.title] || userProfile[row.title]
                      }
                      onSelectOption={(option) =>
                        handleChangeText(row.title, option)
                      }
                    />
                  ) : (
                    <TextInput
                      style={styles.modalInput}
                      value={formValues[row.title] || userProfile[row.title]}
                      onChangeText={(text) => handleChangeText(row.title, text)}
                    />
                  )
                ) : (
                  <Text style={styles.modalValue}>
                    {userProfile[row.title]}
                  </Text>
                )}
              </View>
            ))} */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleUpdateProfile}
            >
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: "#F9F9F9",
  },
  profileContainer: {
    alignItems: "center",
    width: responsiveWidth(50),
    height: responsiveHeight(20),
    marginLeft: responsiveWidth(40),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImage: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    borderRadius: 50,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    position: "absolute",
    left: -responsiveWidth(50),
    // width: responsiveWidth(40),
    // height: responsiveHeight(40),
    backgroundColor: "#FFFFFF",
    elevation: 4,
    borderRadius: 5,
  },
  closeIcon: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  infoContainer: {
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsiveFontSize(2),
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
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
  },
  infoTitle: {
    marginRight: 10,
    fontSize: responsiveFontSize(1.2),
    color: "#444444",
  },
  infoText: {
    fontSize: responsiveFontSize(1.8),
    color: "#444444",
  },
  button: {
    backgroundColor: "#37CFEE",
    height: responsiveHeight(6),
    width: responsiveWidth(80),
    borderRadius: moderateScale(5),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: responsiveFontSize(2),
  },
});
