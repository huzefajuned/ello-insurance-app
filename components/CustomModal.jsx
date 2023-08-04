import { View, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Modal from "react-native-modal";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { CustomModalContext } from "../context/CustomModalContext";

const CustomModal = ({ children }) => {
  const { isModalVisible, setIsModalVisible } = useContext(CustomModalContext);
  return (
    <Modal
      isVisible={isModalVisible}
      customBackdrop={<View style={styles.customBackdropcss} />}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  customBackdropcss: {
    backgroundColor: "#F5F5F5",
    height: responsiveHeight(100),
  },
});
