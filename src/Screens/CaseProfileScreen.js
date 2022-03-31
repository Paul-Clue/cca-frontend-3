import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import FieldInput from '../components/FieldInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { setUsersMeets, setMilestoneId } from '../redux/actions';
import { Icon } from 'react-native-elements';
import Ngrok from '../util/Ngrok';
// import CheckBox from '@react-native-community/checkbox'
import CheckBox from 'expo-checkbox';
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
  TextInput,
} from 'react-native';

const ACCESS_TOKEN = 'access_token';
const USER = 'user';

const ProfileScreen = () => {
  const { storedInfoMilestoneId } = useSelector(state => state.userReducer);

  const [isSelected, setSelection] = useState(false);
  const { storedInfoMileStoneList } = useSelector(state => state.userReducer);
  let milestoneList2 = [];
  const [milestoneTitle, setMilestoneTitle] = useState(null);
  const [milestoneInstructions, setMilestoneInstructions] = useState(null);
  const [mTitleError, setMTitleError] = useState(null);
  const [mInstructionsError, setMInstructionsError] = useState(null);
  const [milestoneList, setMilestoneList] = useState(null);
  const [err, setErr] = useState('');
  let errors = '';

  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();
  const { storedInfoCaseProfile } = useSelector(state => state.userReducer);
  const { storedInfoMeets } = useSelector(state => state.userReducer);

  const configMilestones = () => {
    for(let i = 0; i < storedInfoMileStoneList.length; i += 1) {
      milestoneList2.push(storedInfoMileStoneList[i]);
    }
  }

  configMilestones();

  useEffect(async () => {
    try {
      // let info = await fetch(`https://7b55-72-252-198-169.ngrok.io/api/v1/user/${storedInfoCaseProfile}`, {
        let info = await fetch(`${Ngrok}/user/${storedInfoCaseProfile}`, {
        method: 'Get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const userInfo = await info.json();
      // userId = userInfo.user.id;
      setUserId(userInfo.user.id)
      const meets = userInfo.user.meeting;
      dispatch(setUsersMeets(meets));
      // console.log(`Meets line 54: ${storedInfoMeets}`);
      console.log(userId)

    } catch (error) {
      console.log(error);
    }
  }, []);

  const createMilestone = async () => {
    if (milestoneTitle.trim() === '') {
      setMTitleError( 'A title is required.');
    }if (milestoneInstructions.trim() === '') {
      setMInstructionsError( 'Some form of instructions are required.');
    }else{
      setMTitleError( '');
      setMInstructionsError( '');
      try{
        let response = await fetch(`${Ngrok}/milestone`, {
          method: 'Post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
              // username: 'pc@gmail.com' ,
              title: milestoneTitle.trim(),
              instructions: milestoneInstructions.trim(),
              user_id: userId,
              // confirmPassword: confirmPassword
          })
        });
        // console.warn(response.text())
        let res = await response.json();

        if(response.status >= 200 && response.status < 300) {
          setErr('');
          // console.warn(response);

        }else{
          for (let i = 10; i < res.length-2; i += 1) {
            errors += res.charAt(i);
          }
          setErr(errors);

          // console.warn(errors)
          throw errors;
        }
      }

      catch (errors) {
        console.log('errors caught: ' + errors);
      }
    }
  };

  const [profilePic, setProfilePic] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [meetingLink, setMeetingLink] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      // const { status } = await Camera.requestCameraPermissionsAsync();
      // setHasPermission(status === 'granted');
      navigation.addListener('focus', () => {
        // getUserInfo();
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
    try {
      let img = await fetch(`${Ngrok}/profilepic/${storedInfoCaseProfile}`, {
        method: 'Get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const pic1 = await img.json();
      const pic2 = pic1.user;
      setProfilePic(pic2);

    } catch (error) {
      console.log(error);
    }
  };

  runPic();

  if (hasPermission === null) {
    // console.log('hasPermission is null.');
  }
  if (hasPermission === false) {
    // console.log('hasPermission is false.');
  }

  const cloudinaryUpload = async (photo) => {
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'appimagepreset')
    data.append("cloud_name", "dno0dwbro")
    try {
      const pic = await fetch("https://api.cloudinary.com/v1_1/dno0dwbro/upload", {
        method: "post",
        body: data
      });

      const picAddress = await pic.json();
      let user = await AsyncStorage.getItem(USER);
      let theUser = JSON.parse(user);
      let userId = theUser.res.user.id;
      // console.log(theUser.res.user.id);
      try {
        fetch(`${Ngrok}/user/${storedInfoCaseProfile}`, {
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

      } catch (error) {
        console.log(error);
      }
      setPhotoUri(picAddress.secure_url);
    } catch (errors) {
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



    const newPhoto = await manipulateAsync(
      photo.uri,
      [
        { resize: { height: 200, width: 200 } },
      ],
      { compress: 1, format: SaveFormat.JPEG }
    );

    const fileName = newPhoto.uri.replace(/^.*[\\\/]/, "");

    const source = {
      uri: newPhoto.uri,
      name: fileName,
      type: 'image/jpeg'
    };

    try {
      await cloudinaryUpload(source);
      runPic();
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }

  const ActivateButton = async () => {
    if (storedInfoMeets === 'no' || storedInfoMeets === null) {
      dispatch(setUsersMeets('yes'));
      console.log(`first: ${storedInfoMeets}`);
    } else {
      dispatch(setUsersMeets('no'));
      console.log(`second: ${storedInfoMeets}`);
    }

    try {
      const info = await fetch(`${Ngrok}/user/${storedInfoCaseProfile}`, {
        method: 'Post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            meeting: storedInfoMeets,
          }
        })
      });

    } catch (error) {
      console.log(error);
    }
    // navigation.navigate('EditProfile');
  }

  const setInfo = async () => {
    try {
      const info = await fetch(`${Ngrok}/user/${storedInfoCaseProfile}`, {
        method: 'Get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      let info2 = await info.json();

      setUserName(info2.user.username);
      setUserEmail(info2.user.email);
      setUserPhoneNumber(info2.user.phone_number);
      setUserAddress(info2.user.address);
      setMeetingLink(info2.user.meeting_link);

      // console.log(info2.user.username);

    } catch (error) {
      console.log(error);
    }

  }

  setInfo();

  return (
    <ScrollView style={{ marginTop: 0, flex: 1, backgroundColor: 'black' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: 30 }}>
        <View style={styles.profilePicBox}>
          <ImageBackground
            style={styles.profilePicContainer}>
            <Image
              source={{
                uri: profilePic
              }}
              style={styles.profilePic}>
            </Image>
          </ImageBackground>
        </View>

        <View style={{ marginLeft: '-10%', marginTop: '5%' }}>
          <Text
            style={{ color: 'goldenrod', fontSize: 20 }}
          >
            Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {userName}
          </Text>
          <View style={{ marginTop: 10 }}></View>

          <Text
            style={{ color: 'goldenrod', fontSize: 20 }}
          >
            Phone#: &nbsp;&nbsp;&nbsp;&nbsp; {userPhoneNumber}
          </Text>
          <View style={{ marginTop: 10 }}></View>

          <Text
            style={{ color: 'goldenrod', fontSize: 20 }}
          >
            Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userEmail}
          </Text>
          <View style={{ marginTop: 10 }}></View>

          <Text
            style={{ color: 'goldenrod', fontSize: 20 }}
          >
            Address: &nbsp;&nbsp;&nbsp;&nbsp;{userAddress}
          </Text>
          <View style={{ marginTop: '-10%' }}></View>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '30%' }}>

          {storedInfoMeets === 'no' || storedInfoMeets === null ? <CustomButton
            text="Enable Client's Meeting Button"
            onPress={ActivateButton}
          />
            : <CustomButton
              text="Disable Client's Meeting Button"
              onPress={ActivateButton}
            />}

          <CustomButton
            text='Go To Meeting with client'
            // onPress={}
            onPress={() => Linking.openURL(meetingLink)}
          />
        </View>

        <View style={{ marginTop: '15%', width: '100%', alignItems: 'center' }}>

          <Text
              style={{
                color: 'whitesmoke',
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              Client's Milestones:
            </Text>
            {milestoneList2.map((item) => {
              return  <TouchableOpacity
                        style={{
                          color: 'whitesmoke',
                          fontSize: 25,
                          fontWeight: 'bold',
                          borderColor: 'fray',
                          borderWidth: 1,
                          borderRadius: 5,
                          marginBottom: 5,
                          backgroundColor: 'sandybrown',
                          padding: 5,
                        }}
                        key={item.id}
                        onPress={async () => {
                          // dispatch(setCaseProfile(user.id));
              
                            // navigation.navigate('MilestoneScreen');
                            console.log('Something');
                        }}
                        
                      >
                        {/* <CheckBox
                          value={isSelected}
                          onValueChange={setSelection}
                          style={{marginRight: 20,}}
                        /> */}
                          <Text
                            style={{marginLeft: 20, fontSize: 20,}}
                            >
                              {`Milestone: ${item.title}\n\n`}
                              {`Instructions:\n${item.instructions}`}
                          </Text>
                      </TouchableOpacity>
            })}
          <View>
            <Text
              style={{
                color: 'whitesmoke',
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
            {/* {Do MIlestone list map now} */}
            </Text>
          </View>

          <Text
            style={{
              color: 'whitesmoke',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Edit Client's Milestones
          </Text>

          <View style={{ marginTop: '10%', width: '100%', alignItems: 'center' }}>
            <Text
              style={{
                color: 'whitesmoke',
                fontSize: 15,
                fontWeight: 'bold',
                marginRight: '50%'
              }}
            >
              Milestone Title
            </Text>
            <FieldInput placeholder='Milestone Title' icon='title' value={milestoneTitle} setValue={setMilestoneTitle} />
            {!!mTitleError && (
              <Text style={{color: 'red'}}>
                {mTitleError}
              </Text>
            )}

            <Text
              style={{
                color: 'whitesmoke',
                fontSize: 15,
                fontWeight: 'bold',
                marginRight: '55%'
              }}
            >
              Instructions
            </Text>
            {/* <FieldInput placeholder='Milestone Title' icon='title' /> */}
            <TextInput
            style={{backgroundColor: 'whitesmoke', width: '80%', borderRadius: 5, padding: 10}}
            multiline = {true}
            numberOfLines = {15}
            onChangeText={(value) => setMilestoneInstructions(value)}
            />

            {!!mInstructionsError && (
              <Text style={{color: 'red'}}>
                {mInstructionsError}
              </Text>
            )}

            <CustomButton
            text='Done'
            // onPress={}
            onPress={createMilestone}
          />
          </View>
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