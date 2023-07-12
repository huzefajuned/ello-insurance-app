import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AuthStack from "./navigation/AuthStack";

import { AuthProvider } from "./context/AuthContext";
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthStack />
        <Toast />
      </NavigationContainer>
    </AuthProvider>
  );
}
