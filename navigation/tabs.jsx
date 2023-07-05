import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Home from "../screens/Home";
import TrainingScreen from "../screens/TrainingScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabItem = ({ name, icon, focused }) => (
  <View
    style={{
      alignItems: "center",
      textAlign: "center",
      justifyContent: "center",
      borderTopColor: focused ? "#5FD9F2" : "none",
      borderTopWidth: focused ? 4 : 0,
      height: "100%",
      width: "60%",
      borderBottomRightRadius: 4,
    }}
  >
    <FontAwesome5
      name={icon}
      size={19}
      color={focused ? "#5FD9F2" : "#444444"}
    />
    <Text style={{ color: focused ? "#5FD9F2" : "#444444" }}>{name}</Text>
  </View>
);

const tabsData = [
  { name: "Home", component: Home, icon: "home" },
  { name: "Training", component: TrainingScreen, icon: "chalkboard-teacher" },
  { name: "Profile", component: ProfileScreen, icon: "user-circle" },
];

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#F9F9F9",
          height: 70,
        },
      }}
    >
      {tabsData.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={({ route }) => ({
            tabBarIcon: ({ focused }) => (
              <TabItem name={tab.name} icon={tab.icon} focused={focused} />
            ),
          })}
        />
      ))}
    </Tab.Navigator>
  );
};

export default Tabs;
