import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
 } from '@react-navigation/drawer';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Header, Icon, Text, Button } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { Camera } from 'expo-camera'

const ACCESS_TOKEN = 'access_token';

function MyDrawer2 ({progress,...props}){
  // const [hasPermission, setHasPermission] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);
  // const navigation = useNavigation();

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
    }
    catch(error) {
      console.log("Token collection error in getToken")
    }
  }
  const logOut = () => {
    removeToken();
    props.navigation.closeDrawer();
    props.navigation.navigate('Login2');
  }
 
  // useEffect (() => {
  //   (async () => {
  //     const { status } = await Camera.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);
  
  // if (hasPermission === null){
  //   // return <View />;
  //   console.log('hasPermission is null.');
  // }
  // if (hasPermission === false) {
  //   console.log('hasPermission is false.');
  // }

  // const translateX = Animated.interpolateNode(progress, {
  //   inputRange: [0, 100],
  //   outputRange: [0, 0],
  // });
  return(
    <>
      <DrawerContentScrollView {...props}>
        {/* <Animated.View style={{transform: [{translateX}]}}> */}
        <View style={styles.drawerHeader}>
          <View style={styles.profilePic}>
          <ImageBackground style={{width: 40, height: 40, }}><Icon name='person' color='gray' size={40}/></ImageBackground>
          </View>
          <Text style={{color: 'black', margin: 10, marginTop: 10}}>
            PUT USER EMAIL AND OTHER PROPER INFO HERE
          </Text>
        </View>
        <DrawerItemList {...props}/>
        
        <DrawerItem
        label= 'Rate Us'
        icon={({color, size}) => <Icon name='park' color='navy'/>}
        onPress={() => props.navigation.navigate('ConfirmEmailScreen')}
        />
        {/* </Animated.View> */}
      </DrawerContentScrollView>
      <View style={{marginBottom: 30}}>
        <Button
        title='Logout'
        onPress={() => { logOut() }}
        >
        </Button>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  drawerHeader: {
    height: 130,
    width: '98%',
    backgroundColor: '#F1F1F1',
    marginTop: 0,
    marginBottom: 8,
    borderRadius: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
    // flexDirection: 'row',
  },
  profilePic: {
    borderRadius: 50,
    borderColor: 'darkgray',
    borderWidth: 2,
    width: 50,
    height: 50,
    backgroundColor: 'lightgrey',
    marginTop: 20,
    marginLeft: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default MyDrawer2;