import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import{
  Container,
  Content,
  Text,
  Header,
  Left,
  Body,
  Title,
  Right,
  // Icon,
  NativeBaseProvider
} from 'native-base';
import Login2 from '../Screens/Login2';
import SignUpScreen from "../Screens/SignUpScreen";
import ConfirmEmailScreen from "../Screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../Screens/ForgotPasswordScreen";
import NewPasswordScreen from "../Screens/NewPasswordScreen";
import HomeScreen from "../Screens/HomeScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MyDrawer() {
  return (
    <NativeBaseProvider>
      <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'whitesmoke',
          width: 240,
        },
        // headerShown: false,
        swipeEnabled: false
      }}
      >
        <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => (
            <Icon name='home' color='navy'/>
          ),
        }}
        />
        <Drawer.Screen name="Login2" component={Login2} />
        {/* <Drawer.Screen name="Article" component={Article} /> */}
      </Drawer.Navigator>
    </NativeBaseProvider>
  );
}


 const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Login2'} component={MyDrawer} />
        <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} />
        <Stack.Screen name={'ConfirmEmailScreen'} component={ConfirmEmailScreen} />
        <Stack.Screen name={'ForgotPasswordScreen'} component={ForgotPasswordScreen} />
        <Stack.Screen name={'NewPasswordScreen'} component={NewPasswordScreen} />
        <Stack.Screen name={'HomeScreen'} component={MyDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
container: {
  
},

});

export default Navigation;