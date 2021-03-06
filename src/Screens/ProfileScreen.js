import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import FieldInput from '../components/FieldInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { setUsersMeets } from '../redux/actions'
import { Icon } from 'react-native-elements';
import Ngrok from '../util/Ngrok';
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
  Linking,
} from 'react-native';

const ACCESS_TOKEN = 'access_token';
const USER = 'user';

 const ProfileScreen = () => {
  const dispatch = useDispatch();

  const { storedInfoCaseProfile } = useSelector(state => state.userReducer);
  const { storedInfoMeets } = useSelector(state => state.userReducer);

  // let user = await AsyncStorage.getItem(USER);
  // let theUser = JSON.parse(user);
  // let userMeeting = theUser.res.user.meeting;

  const [profilePic, setProfilePic] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [id, setId] = useState(null);
  const [meeting, setMeeting] = useState(null);
  const [meetingLink, setMeetingLink] = useState(null);

  const navigation = useNavigation();

  const getUserInfo = async () => {
  const user1 = await AsyncStorage.getItem(USER);
  const theUser1 = JSON.parse(user1);
   setUserName(theUser1.res.user.username);
   setUserEmail(theUser1.res.user.email);
   setUserPhoneNumber(theUser1.res.user.phone_number);
   setUserAddress(theUser1.res.user.address);
   setId(theUser1.res.user.id);
   setMeeting(theUser1.res.user.meeting);
   setMeetingLink(theUser1.res.user.meeting_link);
  //  console.log(theUser1.res.user.meeting_link);
  };
  getUserInfo();

  useEffect (() => {

    (async () => {
      // runThis();
      // const { status } = await Camera.requestCameraPermissionsAsync();
      // setHasPermission(status === 'granted');
      navigation.addListener('focus', () => {
        getUserInfo();
        // console.warn(userName);
      });

      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry we need camera role permissions to make this work.');
        }
      }
      // return unsubscribe;
      
    })();
  }, [navigation]);

  const runPic = async () => {
    let user = await AsyncStorage.getItem(USER);
    let theUser = JSON.parse(user);
    let userId = theUser.res.user.id;

      try{
        let img = await fetch (`${Ngrok}/profilepic/${userId}`,{
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
      // console.log(theUser.res.user.id);
      try{
        fetch (`${Ngrok}/user/${userId}`,{
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

  const GoToEditProfile = () => {
    // alert('Please be advised that every time that you access this this screen, you must re-fill and resubmit all of the required fields, or your profile info will be incorrect!!');
    navigation.navigate('EditProfile');
  }

const GoToCounselorMeeting = () => {
  // Linking.openURL('https://play.google.com/store/apps/details?id=com.google.android.apps.meetings&hl=en&gl=US');
  navigation.navigate('Browser2');
}

  return (
    <ScrollView style={{marginTop: 0, flex: 1, backgroundColor: 'black'}}>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: 30}}>
        <View style={styles.profilePicBox}>
          <ImageBackground
            style={styles.profilePicContainer}>
            <Image
              source={{
                uri: profilePic
                }}
              style={styles.profilePic}>
            </Image>
            <View style={{marginTop:-30, marginRight: -120}}>
            <TouchableOpacity
            style={styles.button}
            onPress={async () => {
               await pickImage();
              // console.log(response);
              // if (response?.imageData) {
              //   setImage(response.uri);
              //   console.warn(image);
              //   setImageData(response?.imageData);
              // }
              }}
              >
                  <Ionicons name='camera' color='#3B71F3' size={50}/>
              </TouchableOpacity>
              </View>
          </ImageBackground>
        </View>
        {meeting === 'yes' ?
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: '5%'}}>
          {/* <Text> This is the Profile Modal </Text> */}

          <CustomButton
            text='Go To Meeting With Your Counselor.'
            // onPress={GoToCounselorMeeting}
            onPress={ ()=> Linking.openURL(meetingLink)}
          />
        </View>
        : null
        }

          <View style={{marginLeft: '-10%', marginTop: '5%'}}>
            <Text
              style={{color: 'goldenrod', fontSize: 20}}
              >
                Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {userName}
            </Text>
            <View style={{marginTop: 10}}></View>

            <Text
            style={{color: 'goldenrod', fontSize: 20}}
            >
              Phone#: &nbsp;&nbsp;&nbsp;&nbsp; {userPhoneNumber}
            </Text>
            <View style={{marginTop: 10}}></View>

            <Text
            style={{color: 'goldenrod', fontSize: 20}}
            >
              Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userEmail}
            </Text>
            <View style={{marginTop: 10}}></View>

            <Text
            style={{color: 'goldenrod', fontSize: 20}}
            >
              Address: &nbsp;&nbsp;&nbsp;&nbsp;{userAddress}
            </Text>
            <View style={{marginTop: 10}}></View>
          </View>

        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: '30%'}}>
          <Text> This is the Profile Modal </Text>
          <CustomButton
            text='Edit Profile'
            onPress={GoToEditProfile}
          />
        </View>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
profilePicBox: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  // borderWidth: 2,
  // borderColor: 'red',
  width: 215,
  height: 215,
  marginTop: 5
},
profilePicContainer: {
  width: 215,
  height: 215,
  borderRadius: 50,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
},
profilePic: {
  width: 210,
  height: 210,
  borderRadius: 110
}

});

export default ProfileScreen;