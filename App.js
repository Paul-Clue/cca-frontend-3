import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
// import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
  Button,
  AppRegistry,
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
// import HomeScreen from "./src/Screens/HomeScreen";

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();


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

// function MyDrawer() {
//   return (
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen name="HomeScreen" component={HomeScreen} />
//       <Drawer.Screen name="Login2" component={Login2} />
//       {/* <Drawer.Screen name="Article" component={Article} /> */}
//     </Drawer.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{headerShown: false}}>
//         <Stack.Screen name={'Login2'} component={MyDrawer} />
//         <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} />
//         <Stack.Screen name={'ConfirmEmailScreen'} component={ConfirmEmailScreen} />
//         <Stack.Screen name={'ForgotPasswordScreen'} component={ForgotPasswordScreen} />
//         <Stack.Screen name={'NewPasswordScreen'} component={NewPasswordScreen} />
//         <Stack.Screen name={'HomeScreen'} component={MyDrawer} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  }
});

AppRegistry.registerComponent('nativeAuth', () => nativeAuth);
