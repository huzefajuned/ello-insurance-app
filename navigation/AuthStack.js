import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";
import Tabs from "../navigation/tabs";
import InquiryForm from "../screens/InquiryFormScreen";
import LoginScreen from "../screens/LoginScreen";
import ChangePassword from "../screens/ChangePassword";

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
        </>
      ) : (
        <>
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InquiryForm"
            component={InquiryForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;
