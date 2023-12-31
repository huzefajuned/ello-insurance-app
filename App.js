import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AuthStack from "./navigation/AuthStack";

import { AuthProvider } from "./context/AuthContext";
import { CustomModalProvider } from "./context/CustomModalContext";
import { RegisterContextProvider } from "./context/RegisterContext";
import { FormDataContextProvider } from "./context/DynamicFormDataContext";
export default function App() {
  return (
    <FormDataContextProvider>
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
    </FormDataContextProvider>
  );
}
