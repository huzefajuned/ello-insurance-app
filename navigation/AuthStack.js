import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";
import Tabs from "../navigation/tabs";
import LoginScreen from "../screens/LoginScreen";
import ChangePassword from "../screens/ChangePassword";
import VideoPlayerScreen from "../screens/VideoPlayerScreen";
import RegisterScreen from "../screens/RegisterScreen";
import InquiryFormScreen from "../screens/InquiryFormScreen";
import ViewUrlOrPdf from "../screens/ViewUrlOrPdf";
import All_InquiryScreen from "../screens/All_InquiryScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  const { accessToken } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {!accessToken ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InquiryForm"
        component={InquiryFormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoPlayerScreen"
        component={VideoPlayerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewPdfOrUrl"
        component={ViewUrlOrPdf}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllInquiry"
        component={All_InquiryScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
