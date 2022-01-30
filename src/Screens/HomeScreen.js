// import RNFetchBlob from 'react-native-fetch-blob';
import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons, FontAwesome } from "@expo/vector-icons";
// import { Icon } from 'react-native-elements';
// import FieldInput from '../components/FieldInput';
// import ContentLoader from "react-native-easy-content-loader";
// import Loader from 'react-native-easy-content-loader';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  // SafeAreaView,
  // ImageBackground,
  Image,
  TouchableOpacity,
  // useWindowDimensions,
  // Button,
  Linking,
  Platform,
} from 'react-native';
import WebView from 'react-native-webview';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
// import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import YoutubePlayer from 'react-native-youtube-iframe';
import MobileStoreButton from 'react-mobile-store-button';

const ACCESS_TOKEN = 'access_token';
const USER = 'user';



 const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.google.android.apps.meetings&hl=en&gl=US'
  // const [playing, setPlaying] = useState(false);

  // const togglePlaying = () => {
  //       setPlaying((prev) => !prev);
  //     }
  // const [loading, setLoading] = useState();
  // useEffect( () => {
  //   setTimeout(() => setLoading(false), 2000);
  // },[])
  const GoToProfile = () => {
    console.log('Button Push worked');
    navigation.navigate('EditProfile');
  }

  const GoToGoogleMeets = () => {
    // Linking.openURL('https://play.google.com/store/apps/details?id=com.google.android.apps.meetings&hl=en&gl=US');
    navigation.navigate('Browser');
  }

  const navigation = useNavigation();
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
    navigation.navigate('Login2');
  }

  const loginWithFacebook = () => { console.log('You logged in!') }
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
  
  if (hasPermission === null){
    // return <View />;
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
      // .then(res => res.json()).
      //   then(data => {
      //     setPhotoUri(data.secure_url)

      //   }).catch(err => {
      //    console.log(err)
      //   });

        const picAddress = await pic.json();
        let user = await AsyncStorage.getItem(USER);
        let theUser = JSON.parse(user);
        let userId = theUser.res.user.id;
        console.log(theUser.res.user.id);
        try{
          fetch (`https://5bdf-72-252-198-169.ngrok.io/api/v1/user/${userId}`,{
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
      // console.warn(res);
    // console.warn(result);
  }catch (e) {
    // ErrorAlert({ title: "Image Upload", message: e.message });
    console.log(e.message);
    return null;
  }
  }

  return (
    <ScrollView style={{width: "100%", paddingTop: 0, backgroundColor: 'black'}} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
      {/* <View style={{marginTop: '30%'}}> */}
      
        <View style={styles.container}>
          <View style={{marginTop: '-15%', width: '100%', alignItems: 'center'}}>
          {/* <ContentLoader
              active
              loading={loading}
              animationDuration={500}
              pRows={3}
              pWidth={["75%", "75%", "75%", "75%"]}
              pHeight={[40, 40, 40, 40]}
              paragraphStyles={{marginLeft: '12%', marginTop: '5%'}}
              primaryColor={'rgba(220, 220, 220, 1)'}
              secondaryColor={'rgba(100, 100, 100, 1)'}

            > */}
            <Text> HomeScreen </Text>
            {/* <FontAwesome.Button name="facebook" backgroundColor="#3b5998" onPress={loginWithFacebook}>
              Login with Facebook
            </FontAwesome.Button> */}
            <View
            style={{borderWidth: 1, borderColor: 'goldenrod', borderRadius: 20, marginTop: 10}}
            >
              <YoutubePlayer
                height={300}
                width={410}
                play={false}
                videoId={'Kh7VLhoFULI'}
              />
              {/* <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} /> */}
            </View>

            <View style={styles.welcome}>
                {/* <Icon style={styles.searchIcon} name="" size={20} color="#000"/>
                <FieldInput
                    style={styles.input}
                    placeholder="User Name"
                    underlineColorAndroid="transparent"
                    icon='search'
                /> */}
                <Text
                style={{color: 'whitesmoke', fontSize: 30, fontWeight: 'bold', marginTop: -20}}
                >
                  WELCOME
                </Text>
                <Text style={{color: 'whitesmoke'}}>
                  CCA wants you to have a swift and successful reentry.
                  So we created this app to help you accomplish some of the
                  necessary task you need done in your first months home.The video above gives
                  a brief explanation for how to use this app. Watch it, and continue on your path
                  to a victorious reentry.
                </Text>
            </View>
            {/* <CustomButton
              text='Log out'
              onPress={logOut}
            /> */}
            {/* </ContentLoader> */}

              <View
              style={{width: '80%', alignItems: 'center', marginTop: '2%'}}
              >
                <CustomButton
                  text='Edit Profile'
                  onPress={GoToProfile}
                />
                {/* <CustomButton
                  text='Download Google Meets'
                  // onPress={checkButton}
                /> */}
                <View>
                <TouchableOpacity onPress={GoToGoogleMeets}>
                  <Image
                    source={require('../../assets/google-play-badge.png')}
                    style={{height: '20%', marginTop: '15%', marginBottom: '47%'}}
                  >
                  </Image>
                  </TouchableOpacity>
                </View>
              
            </View>
            

          </View>
        </View>
   
    {/* </View> */}
  </ScrollView>

  )
};

const styles = StyleSheet.create({
container: {
  marginTop: '20%',
  fontSize: 25,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
},
backgroundImage: {
  flex: 1,
  resizeMode: 'cover',
},
welcome: {
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '10%'
},
camera: {
  width: 300,
  height: 300
},
button: {
  width: 300,
  height: 300
},
pic: {
  width: 300,
  height: 300,
  backgroundColor: 'red',
},
WebViewStyle: {
  justifyContent: 'center',
  alignItems: 'center',
  flex:1,
  marginTop: (Platform.OS) === 'ios' ? 20 : 0
},

});

export default HomeScreen;