import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Login2 from '../Screens/Login2';
import SignUpScreen from "../Screens/SignUpScreen";
import ConfirmEmailScreen from "../Screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../Screens/ForgotPasswordScreen";
import NewPasswordScreen from "../Screens/NewPasswordScreen";
import HomeScreen from "../Screens/HomeScreen";
import MyDrawer2 from './MyDrawer2';
import ProfileModal from '../Screens/ProfileModal'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyDrawer() {
  return (
      <Drawer.Navigator
      drawerContent={props => <MyDrawer2 {...props}/>}
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'whitesmoke',
          width: 240,
        },
        // headerShown: false,
        swipeEnabled: true,
      }}
      >
        <Drawer.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{
          drawerIcon: () => (
            <Icon name='home' color='navy'/>
          ),
          headerStyle: {
            backgroundColor: '#3B71F3',
          },
          // headerRight: () => (
          //   <Icon name= 'search' color='black'/>
          // )
        }}
        
        />
        {/* <Drawer.Screen
        name="Login2"
        component={Login2}
        options={{
          drawerIcon: () => (
            <Icon name='login' color='navy'/>
          ),
          drawerContentContainerStyle: {
            backgroundColor: 'yellow',
            marginTop: 200
          }
        }}
        /> */}

      </Drawer.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Icon name='home' color='navy'/>
          ),
        }}
        />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

const RootStackForModal = () =>{
  return(
    <NavigationContainer>
      <RootStack.Navigator mode="modal" screenOptions={{headerShown: false}}>
      <RootStack.Screen name='ScreensForStack' component={ScreensForStack}/>
        <RootStack.Screen name='ProfileModal' component={ProfileModal}/>
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

const ScreensForStack = () =>{
  return(
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name={'Login2'} component={Login2} />
        <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} />
        <Stack.Screen name={'ConfirmEmailScreen'} component={ConfirmEmailScreen} />
        <Stack.Screen name={'ForgotPasswordScreen'} component={ForgotPasswordScreen} />
        <Stack.Screen name={'NewPasswordScreen'} component={NewPasswordScreen} />
        <Stack.Screen
        name={'HomeScreen'}
        component={MyTabs, MyDrawer}
        // options={{
        //   headerStyle: {
        //     title: 'My Home',
        //     backgroundColor: 'yellow'
        //   }
        // }}
        />
        {/* <Stack.Screen name={'HomeScreen'} component={MyTabs} /> */}
      </Stack.Navigator>
  )
}


 const Navigation = () => {
  return (
    <RootStackForModal/>
  )
};

const styles = StyleSheet.create({
container: {
  
},

});

export default Navigation;