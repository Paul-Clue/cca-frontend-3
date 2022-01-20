import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Icon } from 'react-native-elements';
import FieldInput from '../components/FieldInput';
// import ContentLoader from "react-native-easy-content-loader";
// import Loader from 'react-native-easy-content-loader';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
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
  Platform,
} from 'react-native';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';

const ACCESS_TOKEN = 'access_token';



 const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  // const [loading, setLoading] = useState();
  // useEffect( () => {
  //   setTimeout(() => setLoading(false), 2000);
  // },[])
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.warn(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  return (
    <ScrollView style={{width: "100%"}} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
      {/* <View style={{marginTop: '30%'}}> */}
      
        <View style={styles.container}>
          <View style={{marginTop: '40%', width: '100%', alignItems: 'center'}}>
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
            <View style={styles.searchSection}>
                <Icon style={styles.searchIcon} name="" size={20} color="#000"/>
                <FieldInput
                    style={styles.input}
                    placeholder="User Nickname"
                    underlineColorAndroid="transparent"
                    icon='search'
                />
            </View>
            <CustomButton
              text='Log out'
              onPress={logOut}
            />
            {/* </ContentLoader> */}
          </View>
        </View>
         <TouchableOpacity
            style={styles.button}
            onPress={() => { pickImage() }}>
            <Text style={styles.text}> Pick An Image </Text>
          </TouchableOpacity>
   
    {/* </View> */}
  </ScrollView>

    // <View style={styles.container}>
    //   <Camera style={styles.camera} type={type}>
    //     <View style={styles.buttonContainer}>
    //       <TouchableOpacity
    //         style={styles.button}
    //         onPress={() => {
    //           setType(
    //             type === Camera.Constants.Type.back
    //               ? Camera.Constants.Type.front
    //               : Camera.Constants.Type.back
    //           );
    //         }}>
    //         <Text style={styles.text}> Flip </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </Camera>
    // </View>

  )
};

const styles = StyleSheet.create({
container: {
  marginTop: '20%',
  fontSize: 25,
  alignItems: 'center',
  width: '100%'
},
searchSection: {
  flexDirection: 'row',
},
camera: {
  width: 300,
  height: 300
},
button: {
  width: 300,
  height: 300
}

});

export default HomeScreen;