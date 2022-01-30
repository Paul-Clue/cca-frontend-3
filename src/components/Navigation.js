import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
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
import PostScreen from '../Screens/PostScreen';
import EditProfile from '../Screens/EditProfile';
import ProfileScreen from '../Screens/ProfileScreen'
import Browser from '../Screens/Browser';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RotateInUpLeft } from 'react-native-reanimated';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyDrawer() {
  return (
      <Drawer.Navigator
      drawerContent={props => <MyDrawer2 {...props}/>}
      initialRouteName="Login2"
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
        name="Home"
        component={MyTabs}
        options={{
          drawerIcon: () => (
            <Icon name='house' color='whitesmoke'/>
          ),
          headerStyle: {
            backgroundColor: '#3B71F3',

          },
          title: '',
          headerShown: true,
        }}
  
        />

        <Drawer.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            drawerIcon: () => (
              <Icon name='person' color='navy'/>
            ),
            headerStyle: {
              backgroundColor: '#3B71F3',
            },
          }}
        />

        {/* <Drawer.Screen
          name="Login2"
          component={Login2}
          options={{
            drawerIcon: () => (
              <Icon name='login' color='navy'/>
            ),
            headerStyle: {
              backgroundColor: 'yellow',
            },
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
              <Icon name='home' color='whitesmoke'/>
            ),
            headerStyle: {
              backgroundColor: '#3B71F3',
            },
            tabBarStyle: { backgroundColor: '#3B71F3' },
            headerShown: true,
          }}
        />
        <Tab.Screen
        name="PostScreen"
        component={PostScreen}
        options={{
          headerStyle: {
            backgroundColor: '#3B71F3',
          },
          tabBarIcon: () => (
            <Icon name='chat' color='whitesmoke'/>
          ),
        }}
        />

      <Tab.Screen
          name="Login2"
          component={Login2}
          options={{
            tabBarIcon: () => (
              <Icon name='login' color='whitesmoke'/>
            ),
            headerStyle: {
              backgroundColor: 'yellow',
              tabBarStyle: { display: 'none' }
            },
            tabBarStyle: { display: 'none' }
          }}
        />

    </Tab.Navigator>
  );
}

const ScreensForStack = () =>{
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="HomeScreen">
      <Stack.Screen name={'Bottom'} component={MyDrawer} options={{headerShown: false}}/>
      <Stack.Screen name={'EditProfile'} component={EditProfile} options={{headerShown: true}}/>
      <Stack.Screen name={'ProfileScreen'} component={ProfileScreen} />
      {/* <Stack.Screen name={'Login2'} component={Login2} /> */}
      <Stack.Screen name={'PostScreen'} component={PostScreen} options={{headerShown: true}}/>
      <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} />
      <Stack.Screen name={'ConfirmEmailScreen'} component={ConfirmEmailScreen} />
      <Stack.Screen name={'ForgotPasswordScreen'} component={ForgotPasswordScreen} />
      <Stack.Screen name={'NewPasswordScreen'} component={NewPasswordScreen} />
      <Stack.Screen name={'Browser'} component={Browser} />
      </Stack.Navigator>
      </NavigationContainer>
  )
}


 const Navigation = () => {
  return (
    <ScreensForStack/>

  )
};

const styles = StyleSheet.create({
container: {
  
},

});

export default Navigation;