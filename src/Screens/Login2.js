import React, { useEffect, useState } from "react";
import * as Keychain from 'react-native-keychain';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';
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
  Button
} from 'react-native';
import FieldInput from '../components/FieldInput';
import CustomButton from "../components/CustomButton";
import SocialSignIn from "../components/SocialSignIn";
import { useNavigation } from "@react-navigation/native";

const Login2 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // ERRORS
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const {height} = useWindowDimensions();
  const {width} = useWindowDimensions();

  const navigation = useNavigation();

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
        // sessionStorage.setItem('CurrentUser', JSON.stringify(data));
        // const token = JSON.parse(sessionStorage.getItem('CurrentUser')) || '';
        // const credential = await Keychain.getGenericPassword();
        // const token = JSON.parse(credential.jwt)
        let response = await fetch('http://21cf-72-252-198-169.ngrok.io/api/v1/login', {
          // let response = await fetch('https://secure-mountain-84366.herokuapp.com/appoints', {
          method: 'Post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
              // username: 'pc@gmail.com' ,
              email: email,
              password: password,
              // confirmPassword: confirmPassword
          })
        });

        let res = await response.text();

        if(response.status >= 200 && response.status < 300) {

          console.log('res is successful: ' + res);
          navigation.navigate('HomeScreen');
        }else{
          let errors = res;
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
    console.warn('Google');
  };

  const onSignInWithApple = () => {
    console.warn('Apple');
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
          {/* <Text style={styles.text}>'Some text'</Text> */}
          <Image
            source={require('../../assets/CCALogo.png')}
            style={{height: height * 0.123, marginTop: '15%', marginBottom: '47%'}}
          >
          </Image>

          <FieldInput Error={emailError} placeholder='Email' value={email} setValue={setEmail}/>
          {!!emailError && (
            <Text style={{color: 'red'}}>
              {emailError}
            </Text>
          )}

          <FieldInput Error={passwordError} placeholder='Password' value={password} setValue={setPassword} secureTextEntry/>
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