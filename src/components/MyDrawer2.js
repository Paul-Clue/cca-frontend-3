import 'react-native-gesture-handler';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
 } from '@react-navigation/drawer';
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Header, Icon, Text, Button } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

const ACCESS_TOKEN = 'access_token';
const USER = 'user';

function MyDrawer2 ({progress,...props}){
  const [profilePic, setProfilePic] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect (() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
  
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry we need camera role permissions to make this work.');
        }
      }
    })();
  }, []);

  const runPic = async () => {
    let user = await AsyncStorage.getItem(USER);
    let theUser = JSON.parse(user);
    let userId = theUser.res.user.id;
    setUserEmail(theUser.res.user.email);
    
      try{
        let img = await fetch (`https://c67f-72-252-198-169.ngrok.io/api/v1/profilepic/${userId}`,{
          method: 'Get',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        // .then(res => res.json())
        // .then(data => {
        //   let pic1 = JSON.stringify(data.user);
        //   setProfilePic(pic1);
        //   // console.log(`This is the Rails image return data: ${profilePic}`);
        //   // console.log('It ran');
    
        // });
        
        const pic1 = await img.json();
        const pic2 = pic1.user;
       setProfilePic(pic2);

    
      }catch (error) {
        console.log(error);
      }
    };
    
    runPic();

if (hasPermission === null){
  console.log('hasPermission is null.');
}
if (hasPermission === false) {
  console.log('hasPermission is false.');
}

const cloudinaryUpload = async (photo) => {
  const data = new FormData()
  data.append('file', photo)
  data.append('upload_preset', 'appimagepreset')
  data.append("cloud_name", "dno0dwbro")
  try{
    const pic = await fetch("https://api.cloudinary.com/v1_1/dno0dwbro/upload", {
      method: "post",
      body: data
    });

      const picAddress = await pic.json();
      let user = await AsyncStorage.getItem(USER);
      let theUser = JSON.parse(user);
      let userId = theUser.res.user.id;
      console.log(theUser.res.user.id);
      try{
        fetch (`https://c67f-72-252-198-169.ngrok.io/api/v1/user/${userId}`,{
          method: 'Post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              img: picAddress.secure_url
            }
          })
        });
  
      }catch (error) {
        console.log(error);
      }
      setPhotoUri(picAddress.secure_url);
  }catch (errors) {
    console.log('errors caught: ' + errors);
  }
}

const pickImage = async () => {
  let photo = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1
  });

  

  const newPhoto = await manipulateAsync (
    photo.uri,
    [
      {resize: {height: 200, width: 200}},
    ],
    { compress: 1, format: SaveFormat.JPEG }
  );

  const fileName = newPhoto.uri.replace(/^.*[\\\/]/, "");

  const source = {
          uri: newPhoto.uri,
          name: fileName,
          type: 'image/jpeg'
        };

  try{
    await cloudinaryUpload(source);
    runPic();
}catch (e) {
  console.log(e.message);
  return null;
}
}

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

  return(
    <>
      <DrawerContentScrollView {...props}>
        {/* <Animated.View style={{transform: [{translateX}]}}> */}

          <View style={styles.drawerHeader}>
          <TouchableOpacity
            style={styles.button}
            // onPress={async () => {
            //    await pickImage();
            //   // console.log(response);
            //   // if (response?.imageData) {
            //   //   setImage(response.uri);
            //   //   console.warn(image);
            //   //   setImageData(response?.imageData);
            //   // }
            //   }}
              >
            <View style={styles.profPic}>
            <ImageBackground
              style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
                }}>
                <Image
                  source={{
                    uri: profilePic
                    }}
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 50
                    }}>
                </Image>
            </ImageBackground>
            {/* <Image source={require('../../assets/favicon.png')} style={{width: 40, height: 40, }}></Image> */}
            </View>
            </TouchableOpacity>
            <Text style={{color: 'black', margin: 10, marginTop: 10}}>
              {/* PUT USER EMAIL AND OTHER PROPER INFO HERE */}
              {userEmail}
            </Text>
          </View>
        
        <DrawerItemList {...props}/>
        
        {/* <DrawerItem
        label= 'Rate Us'
        icon={({color, size}) => <Icon name='park' color='navy'/>}
        onPress={() => props.navigation.navigate('ConfirmEmailScreen')}
        /> */}
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
    height: 150,
    width: '98%',
    backgroundColor: '#F1F1F1',
    marginTop: 0,
    marginBottom: 8,
    borderRadius: 8,
    borderBottomWidth: 2,
    // borderBottomColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
  },
  profPic: {
    borderRadius: 50,
    borderColor: 'darkgray',
    borderWidth: 2,
    width: 70,
    height: 70,
    // backgroundColor: 'lightgrey',
    marginTop: 20,
    // marginLeft: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default MyDrawer2;