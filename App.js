import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
// import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Button
} from 'react-native';

// import Picker from './src/components/Picker';
// import Form1 from './src/components/Form1';
import Login from './src/Screens/Login';
import Login2 from './src/Screens/Login2';
import SignUpScreen from "./src/Screens/SignUpScreen";
import ConfirmEmailScreen from "./src/Screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "./src/Screens/ForgotPasswordScreen";
import NewPasswordScreen from "./src/Screens/NewPasswordScreen";
import Navigation from "./src/components/Navigation";

export default function App() {
      return (
        <SafeAreaView style={styles.root}>
          {/* <Login /> */}
          {/* <Login2 /> */}
          {/* <SignUpScreen /> */}
          {/* <ConfirmEmailScreen /> */}
          {/* <ForgotPasswordScreen /> */}
          {/* <NewPasswordScreen /> */}
          <Navigation/>
        </SafeAreaView>

      );
  }


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  }
});
