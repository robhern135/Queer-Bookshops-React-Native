import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

import HomeStack from "./Stacks/HomeStack"
import SettingsStack from "./Stacks/SettingsStack"

import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
const Tab = createBottomTabNavigator()

import { Feather } from "@expo/vector-icons"

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
          tabBarStyle: {
            position: "absolute",
            height: 60,
            bottom: 10,
            left: 20,
            right: 20,
            paddingBottom: 6,
            paddingTop: 5,
            borderRadius: 40,
          },
          tabBarItemStyle: {
            padding: 0,
            margin: 0,
          },
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: "Map",
            tabBarIcon: ({ color, size }) => (
              <Feather name="map" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
