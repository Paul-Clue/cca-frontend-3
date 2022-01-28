import 'react-native-gesture-handler';
import React, { useEffect, useState, useRef } from "react";
import * as Keychain from 'react-native-keychain';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';
import FieldInput from '../components/FieldInput';
import CustomButton from "../components/CustomButton";
import SocialSignIn from "../components/SocialSignIn";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContentLoader from "react-native-easy-content-loader";
import Loader from 'react-native-easy-content-loader';
import Load from "react-native-loading-gif";
import "react-native-url-polyfill/auto";

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
} from 'react-native';
// import Svg, {
//   Text,
//   Circle,
//   Ellipse,
//   G,
//   TSpan,
//   TextPath,
//   Path,
//   Polygon,
//   Polyline,
//   Line,
//   Rect,
//   Use,
//   Symbol,
//   Defs,
//   LinearGradient,
//   RadialGradient,
//   Stop,
//   ClipPath,
//   Pattern,
//   Mask,
// } from 'react-native-svg';

const ACCESS_TOKEN = 'access_token';
const USER = 'user';

const Login2 = () => {
  // const Load = useRef();
  // const [loading, setLoading] = useState();
  useEffect( () => {
    checkForToken();
    // setTimeout(() => setLoading(false), 2000);
    // Load.setTimeClose();
  },[])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // ERRORS
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [err, setErr] = useState('');
  let errors = '';
  let tempErr = '';

  const {height} = useWindowDimensions();
  const {width} = useWindowDimensions();

  const navigation = useNavigation();

  const storeToken = async (accessToken) => {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      getToken();
    }
    catch(error) {
      console.log(error);
    }
  }

  const storeUser = async (user) => {
    try {
      await AsyncStorage.setItem(USER, user);
      // getToken();
    }
    catch(error) {
      console.log(error);
    }
  }

  const getToken = async () => {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      // console.warn("This is the token:" + token);
    }
    catch(error) {
      console.log("Token collection error in getToken")
    }
  }

  const checkForToken = async () => {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);

      if(!token){
        console.log('');
      }else{
        navigation.navigate('HomeScreen');
        // console.warn("This is the token:" + token);
      }
    }
    catch(error) {
      console.log("Token collection error in getToken")
    }
  }

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      getToken();
    }
    catch(error) {
      console.log("Token collection error in getToken")
    }
  }

  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem(User);
      // getToken();
    }
    catch(error) {
      console.log("Error removing user")
    }
  }

  const onSignIn = async () => {
    if (email.trim() === '') {
      setEmailError( 'An email is required.');
      console.log(emailError);
    }if (password.trim() === '') {
      setPasswordError( 'A Password is required.');
      console.log(passwordError);
    }else{
      setEmailError( '');
      setPasswordError( '');
      try{
        // const token = JSON.parse(sessionStorage.getItem('CurrentUser')) || '';
        // const credential = await Keychain.getGenericPassword();
        // const token = JSON.parse(credential.jwt)
        // let response = await fetch('http://localhost:3001/api/v1/login', {
        let response = await fetch('https://5bdf-72-252-198-169.ngrok.io/api/v1/login', {
          // let response = await fetch('https://secure-mountain-84366.herokuapp.com/appoints', {
          method: 'Post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
              // username: 'pc@gmail.com' ,
              email: email.trim(),
              password,
              // confirmPassword: confirmPassword
          })
        });
        // console.warn(response.text())
        let res = await response.json();
        

        if(response.status >= 200 && response.status < 300) {
          setErr('');
          console.warn(res);
          let accessToken = res.jwt;
          let theUser = JSON.stringify({res});
          storeToken(accessToken);
          storeUser(theUser);
          setEmail('');
          setPassword('');
          navigation.navigate('HomeScreen');
          // console.warn(response);
        }else{
          // errors = res.;
          removeToken();
          removeUser();
          for (let i = 10; i < res.length-2; i += 1) {
            errors += res.charAt(i);
          }
          setErr(errors);

          // console.warn(errors)
          throw errors;
        }
      }

      catch (errors) {
        // console.warn('errors caught: ' + errors);
        // console.warn('This is an error: ' + errors);
        console.log('errors caught: ' + errors);
      }
    }
    // console.warn('Sign In');
    // TODO: VALIDATION WITH BACK END BEFORE GOING TO THE NEXT SCREEN

    // navigation.navigate('HomeScreen');
  };

  const onSignInWithGoogle = () => {
    // console.warn('Google');
  };

  const onSignInWithApple = () => {
    // console.warn('Apple');
  };

  const onForgotPassword = () => {
    // console.warn('Forgot Password');
    navigation.navigate('ForgotPasswordScreen');
  };

  const onSignUp = () => {
    // console.warn('Sign Up');
    navigation.navigate('SignUpScreen');
  };

  let [fontsLoaded] = useFonts({
    'Mukta-Bold': require('../../assets/fonts/Mukta-Bold.ttf'),
    'Mukta-ExtraBold': require('../../assets/fonts/Mukta-ExtraBold.ttf'),
    'Outfit-Black': require('../../assets/fonts/Outfit-Black.ttf'),
    'RobotoSlab-Black': require('../../assets/fonts/RobotoSlab-Black.ttf'),
    'SourceSansPro-Bold': require('../../assets/fonts/SourceSansPro-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }else{
    return (
      <ScrollView style={{width: "100%"}} contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground fadeDuration={1500} source={require('../../assets/CCAlogin.jpg')} resizeMode="cover" style={styles.image}>

          <Image
            source={require('../../assets/CCALogo.png')}
            style={{height: height * 0.123, marginTop: '15%', marginBottom: '47%'}}
          >
          </Image>
          {/* <Load ref={Load}></Load> */}
          {/* <Loader loading={loading}> */}
          {/* <Loader
              primaryColor='rgba(195, 191, 191, 1)'
              secondaryColor='rgba(218, 215, 215, 1)'
              animationDuration={500}
              loading={loading}
          > */}
          {/* <ContentLoader
            active
            loading={loading}
            animationDuration={500}
            pRows={3}
            pWidth={["75%", "75%", "75%", "75%"]}
            pHeight={[40, 40, 40, 40]}
            paragraphStyles={{marginLeft: '12%', marginTop: '5%'}}
            primaryColor={'rgba(220, 220, 220, 1)'}
            secondaryColor={'rgba(150, 150, 150, 1)'}

          > */}

         {err === "That user could not be found" && (
            <Text style={{color: 'red'}}>
              {err}
            </Text>
          )}
          <Text style={{color: '#3B71F3', fontSize: 15, fontWeight: 'bold', marginRight: '65%'}}>Email</Text>

          <FieldInput Error={emailError} placeholder='Email' value={email} setValue={setEmail} icon='email'/>
          {!!emailError && (

            <Text style={{color: 'red'}}>
              {emailError}
            </Text>

          )}
          <Text style={{color: '#3B71F3', fontSize: 15, fontWeight: 'bold', marginRight: '57%'}}>Password</Text>
              {/* USED <Svg></Svg> TO MAKE OUTLINE ON TEXT}
          {/* <View style={{marginBottom: '-10%', marginRight: '55%'}}>
          <Svg height="60" width="200">
            <Text
              fill='white'
              stroke='#3B71F3'
              strokeWidth= '1'
              fontSize="17"
              fontWeight="bold"
              x="100"
              y="20"
              textAnchor="middle"
            >
              Password
            </Text>
          </Svg>
          </View> */}
          <FieldInput Error={passwordError} placeholder='Password' value={password} setValue={setPassword} secureTextEntry icon='lock'/>
          {!!passwordError && (
              <Text style={{color: 'red'}}>
                {passwordError}
              </Text>
          )}

          <CustomButton
            text='Sign In'
            onPress={onSignIn}
          />
          <CustomButton
            text='Forgot Password?'
            onPress={onForgotPassword}
            type='TERTIARY'
           />

          {/* <SocialSignIn /> */}

          <CustomButton
            text='Dont have an account? Create one.'
            onPress={onSignUp}
            type='TERTIARY'
           />
           {/* </Loader> */}
           {/* </ContentLoader> */}
        </ImageBackground>
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
    // resizeMode: "cover",
    alignSelf: 'stretch',
    width: null,
  },
  // insideImage: {
  //   marginTop: 80,
  //   marginBottom: 40,
  // },
  text: {
    color: 'whitesmoke',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: '15%',
    fontSize: 17,
    // fontWeight: 'bold',
    // fontFamily: 'Mukta-Bold',
    // fontFamily: 'Mukta-ExtraBold',
    // fontFamily: 'Outfit-Black'
    // fontFamily: 'RobotoSlab-Black'
    // fontFamily: 'SourceSansPro-Bold',
  }
});

export default Login2;