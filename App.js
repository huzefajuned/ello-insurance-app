import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AuthStack from "./navigation/AuthStack";

import { AuthProvider } from "./context/AuthContext";
import { CustomModalProvider } from "./context/CustomModalContext";
import { RegisterContextProvider } from "./context/RegisterContext";
export default function App() {
  // const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <CustomModalProvider>
      <RegisterContextProvider>
        <AuthProvider>
          <NavigationContainer>
            <AuthStack />
            <Toast />
          </NavigationContainer>
        </AuthProvider>
      </RegisterContextProvider>
    </CustomModalProvider>
  );
}
