import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import CaseManagerScreen from '../Screens/CaseManagerScreen';
import CaseProfileScreen from '../Screens/CaseProfileScreen';
import MilestoneScreen from '../Screens/MilestonesScreen'
import Browser from '../Screens/Browser';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RotateInUpLeft } from 'react-native-reanimated';
import { Provider } from 'react-redux';
import { Store } from '../redux/store'
import {setManager} from '../redux/actions'

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ACCESS_TOKEN = 'access_token';
const USER = 'user';

function MyDrawer() {
  const [userType, setUserType] = useState(null);

  const check = async () => {
  let token = await AsyncStorage.getItem(ACCESS_TOKEN);
  let checkUser = await AsyncStorage.getItem(USER);
  let checkUser2 = JSON.parse(checkUser);
  console.log(checkUser2);
  // setUserType(JSON.stringify(checkUser2.res.user.user_type));
  setUserType(checkUser2.res.user.user_type);
  // console.log(checkUser2);
  // console.log(JSON.stringify(checkUser2.res.user.user_type))
  }
  check();
  if (userType === 'joe' || userType === 'ann') {
      return (
        <Drawer.Navigator
        drawerContent={props => <MyDrawer2 {...props}/>}
        initialRouteName="Login2"
        screenOptions={{
          drawerStyle: {
            backgroundColor: 'whitesmoke',
            width: 240,
          },
          headerShown: false,
          swipeEnabled: true,
        }}
        >
        {/* <Drawer.Screen
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
            headerTintColor: 'whitesmoke'
          }}
    
          /> */}

          {/* <Drawer.Screen
            name='Profile'
            component={ProfileScreen}
            options={{
              drawerIcon: () => (
                <Icon name='person' color='navy'/>
              ),
              headerStyle: {
                backgroundColor: '#3B71F3',
              },
              headerTitleStyle: {
                fontWeight: 'bold'
              },
              headerTintColor: 'whitesmoke'
            }}
          /> */}

          <Drawer.Screen
            // name='Case Manager'
            name = {userType}
            component={CaseManagerScreen}
            options={{
              drawerIcon: () => (
                <Icon name='people' color='navy'/>
              ),
              headerStyle: {
                backgroundColor: '#3B71F3',
              },
              headerShown: true,
            }}
          />

          {/* <Drawer.Screen
            name="Login2"
            component={Login2}
            options={{
              drawerIcon: () => (
                <Icon name='login' color='navy'/>
              ),
              headerShown: false,
              headerStyle: {
                backgroundColor: 'yellow',
              },
            }}
          /> */}

        </Drawer.Navigator>
    );
  } else {
      return (
        <Drawer.Navigator
        drawerContent={props => <MyDrawer2 {...props}/>}
        initialRouteName="HomeScreen"
        screenOptions={{
          drawerStyle: {
            backgroundColor: 'whitesmoke',
            width: 240,
          },
          headerShown: true,
          swipeEnabled: true,
        }}
        >
        <Drawer.Screen
          name="HomeScreen"
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
            headerTintColor: 'whitesmoke'
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
              headerTitleStyle: {
                fontWeight: 'bold'
              },
              headerTintColor: 'whitesmoke'
            }}
          />

          {/* <Drawer.Screen
            name='Case Manager'
            component={CaseManagerScreen}
            options={{
              drawerIcon: () => (
                <Icon name='people' color='navy'/>
              ),
              headerStyle: {
                backgroundColor: '#3B71F3',
              },
            }}
          /> */}

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
}

function MyTabs() {
  const [userType, setUserType] = useState(null);

  const check = async () => {
  let token = await AsyncStorage.getItem(ACCESS_TOKEN);
  let checkUser = await AsyncStorage.getItem(USER);
  let checkUser2 = JSON.parse(checkUser);
  console.log(checkUser2);
  // setUserType(JSON.stringify(checkUser2.res.user.user_type));
  setUserType(checkUser2.res.user.user_type);
  // console.log(checkUser2);
  // console.log(JSON.stringify(checkUser2.res.user.user_type))
  }
  check();
  if (userType === 'joe' || userType === 'ann') {
  
    return (
      <Tab.Navigator screenOptions={{tabBarActiveTintColor: 'goldenrod', tabBarInactiveTintColor: 'whitesmoke', }}>
        <Tab.Screen
            name="CaseManagerScreen"
            component={CaseManagerScreen}
            options={{
              tabBarIcon: () => (
                <Icon name='' color='whitesmoke'/>
              ),
              headerStyle: {
                backgroundColor: '#3B71F3',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'whitesmoke'
              },
              tabBarStyle: { backgroundColor: '#3B71F3' },
              headerShown: false,
              title: '',

            }}
          />



      </Tab.Navigator>
    );
  }else{
    return (
      <Tab.Navigator screenOptions={{tabBarActiveTintColor: 'goldenrod', tabBarInactiveTintColor: 'whitesmoke', }}>
        <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              tabBarIcon: () => (
                <Icon name='home' color='whitesmoke'/>
              ),
              headerStyle: {
                backgroundColor: '#3B71F3',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'whitesmoke'
              },
              tabBarStyle: { backgroundColor: '#3B71F3' },
              headerShown: true,
              title: 'Home',

            }}
          />

<Tab.Screen
            name="MilestoneScreen"
            component={MilestoneScreen}
            options={{
              tabBarIcon: () => (
                <Icon name='check' color='whitesmoke'/>
              ),
              headerStyle: {
                backgroundColor: '#3B71F3',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'whitesmoke'
              },
              tabBarStyle: { backgroundColor: '#3B71F3' },
              headerShown: true,
              title: 'MilestoneScreen',

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

        {/* <Tab.Screen
            name="Login2"
            component={Login2}
            options={{
              tabBarIcon: () => (
                <Icon name='login' color='whitesmoke'/>
              ),
              headerShown: false,
              headerStyle: {
                backgroundColor: 'yellow',
              },
              tabBarStyle: { display: 'none' }
            }}
          /> */}

      </Tab.Navigator>
    );
  }
}

const ScreensForStack = () =>{
  return(
    <NavigationContainer>
      {/* <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="CaseManagerScreen"> */}
      <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name={'Bottom'} component={MyDrawer} options={{headerShown: false}}/>
      <Stack.Screen
        name={'EditProfile'}
        component={EditProfile}
        options={{
          headerShown: true,
          headerStyle: {
                backgroundColor: '#3B71F3',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'whitesmoke'
              },
              headerTintColor: 'whitesmoke'
            }}
      />
      <Stack.Screen name={'Profile'}
      component={ProfileScreen}
      options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#3B71F3',
        },
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTintColor: 'whitesmoke'
      }}
      
      />
      {/* <Stack.Screen name={'Login2'} component={Login2} /> */}
      <Stack.Screen name={'PostScreen'} component={PostScreen} options={{headerShown: true}}/>
      <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} />
      <Stack.Screen name={'ConfirmEmailScreen'} component={ConfirmEmailScreen} />
      <Stack.Screen name={'ForgotPasswordScreen'} component={ForgotPasswordScreen} />
      <Stack.Screen name={'NewPasswordScreen'} component={NewPasswordScreen} />
      <Stack.Screen name={'Browser'} component={Browser} />
      <Stack.Screen name={'CaseManagerScreen'} component={CaseManagerScreen} />
      <Stack.Screen name={'CaseProfileScreen'} component={CaseProfileScreen} />
      <Stack.Screen name={'Login2'} component={Login2} options={{headerShown: false}} />
      <Stack.Screen name={'HomeScreen'} component={MyDrawer} />
      </Stack.Navigator>
      </NavigationContainer>
  )
}


 const Navigation = () => {
  return (
    <Provider store={Store}>
      <ScreensForStack/>
    </Provider>
  )
};

const styles = StyleSheet.create({
container: {
  
},

});

export default Navigation;