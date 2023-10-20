import {
  StyleSheet,
  View,
  useColorScheme,
  PixelRatio,
  Appearance,
} from "react-native";
import { useState } from "react";

import { Text, TouchableRipple } from "react-native-paper";
import { PaperProvider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { MainScreen } from "./src/screens/MainScreen";
import { ScheludeScreen } from "./src/screens/ScheludeScreen";
import { TicketsScreen } from "./src/screens/TicketsScreen";
import { HelpScreen } from "./src/screens/HelpScreen";

const Tab = createMaterialTopTabNavigator();

const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme,
    background: "#1D1B20",
    surface: "#2C2A32",
    onSurface: "#E8DEF8",
    primary: "#9747FF",
    onPrimary: "#FFFFFF",
    primaryContainer: "#494458",
    onPrimaryContainer: "#DDDCEE",
    onBackground: "#CAC4D0",
  },
};

export default function App() {
  const scheme = Appearance.getColorScheme();
  const theme = scheme === "dark" ? AppDarkTheme : AppDarkTheme;

  const routes = [
    {
      route: "Main",
      label: "Новости",
      comonent: MainScreen,
      icon: "newspaper-variant-outline",
    },
    {
      route: "Tickets",
      label: "Билеты",
      comonent: TicketsScreen,
      icon: "ticket-outline",
    },
    {
      route: "Schelude",
      label: "График",
      comonent: ScheludeScreen,
      icon: "calendar-blank-outline",
    },
    {
      route: "Help",
      label: "Помощь",
      comonent: HelpScreen,
      icon: "help-circle-outline",
    },
  ];

  return (
    <PaperProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          tabBarPosition="bottom"
          initialRouteName="Main"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarContentContainerStyle: {
              height: PixelRatio.getPixelSizeForLayoutSize(25),
            },
            tabBarShowLabel: false,
            swipeEnabled: false,
            tabBarItemStyle: {
              backgroundColor: "#2C2A32",
              borderTopColor: "transparent",
            },
            tabBarStyle: {
              paddingBottom: 3,
            },
          })}
        >
          {routes.map((_, index) => {
            return (
              <Tab.Screen
                key={index}
                name={_.route}
                component={_.comonent}
                options={{
                  topBarColor: _?.topBarColor,
                  tabBarLabel: _.label,
                  tabBarIcon: ({ color, size, focused }) => (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: focused
                            ? theme.colors.primaryContainer
                            : theme.colors.surface,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 100,
                          minHeight: PixelRatio.getPixelSizeForLayoutSize(12),
                          minWidth: PixelRatio.getPixelSizeForLayoutSize(24),
                        }}
                      >
                        <Icon
                          name={_.icon}
                          size={20}
                          color={
                            focused
                              ? theme.colors.onPrimaryContainer
                              : theme.colors.onSurface
                          }
                        />
                      </View>
                      <View
                        style={{
                          height: PixelRatio.getPixelSizeForLayoutSize(2),
                        }}
                      ></View>
                      <Text
                        variant="labelLarge"
                        style={{
                          textAlign: "center",
                          marginBottom: 16,
                          width: 50,
                          fontWeight: "semibold",
                          color: focused
                            ? theme.colors.onPrimaryContainer
                            : theme.colors.onSurface,
                        }}
                      >
                        {_.label}
                      </Text>
                    </View>
                  ),
                }}
              />
            );
          })}
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
