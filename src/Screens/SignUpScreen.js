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
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import SocialSignIn from "../components/SocialSignIn";
import { useNavigation } from "@react-navigation/native";
import Navigation from "../components/Navigation";

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [errors, setErrors] = useState([]);
  let errors = '';
  
  //  ERRORS
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigation = useNavigation();

 const onRegister = async () => {
    if (username.trim() === '') {
      setUsernameError( 'A username is required.');
      console.log(usernameError);
    }if (email.trim() === '') {
      setEmailError( 'An email is required.');
      console.log(emailError);
    }if (password.trim() === '') {
      setPasswordError( 'A Password is required.');
      console.log(passwordError);
    }else{
      setUsernameError('');
      setEmailError('');
      setPasswordError('');

    try{
      let response = await fetch('https://5254-72-252-198-169.ngrok.io/api/v1/sign_up', {
      // let response = await fetch('https://0692-64-64-117-139.ngrok.io/api/v1/sign_up', {
        // let response = await fetch('https://secure-mountain-84366.herokuapp.com/appoints', {
        method: 'Post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          user: {
            username: username,
            email: email.trim(),
            password: password,
            // confirmPassword: confirmPassword
          }
        })
      });

      let res = await response.text();

      if(response.status >= 200 && response.status < 300) {
        console.warn(response);
        setErr('');
        setUsername('');
        setPassword('');
        setEmail('');
        navigation.navigate('ConfirmEmailScreen');
        // console.log('Key To Save: ' + res);
        // const rawValue = JSON.stringify(res);
        // console.log(rawValue);
        // await Keychain.setGenericPassword('session', rawValue);
      }else{
        
        for (let i = 10; i < res.length-2; i += 1) {
          errors += res.charAt(i);
          
        }
        setErr(errors);
        console.warn('there was an error');
        throw errors;
      }
    }

    catch (errors) {
      console.log('errors caught: ' + errors);
    }

  }
  };

  const onTermsOfUse = () => {
    console.warn('Terms Of Use');
  };

  const onPrivacyPolicy = () => {
    console.warn('Privacy Policy');
  };

  const onForgotPassword = () => {
    console.warn('Forgot Password');
  };

  const onSignIn = () => {
    // console.warn('Sign In');
    navigation.navigate('Login2');
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
        <View style={styles.container}>
          <Text style={styles.title}>{'Create An Account'}</Text>

          <FieldInput Error={usernameError} placeholder='Username' value={username} setValue={setUsername} icon='person'/>
          {!!usernameError && (
            <Text style={{color: 'red'}}>
              {usernameError}
            </Text>
          )}

          {err === "This email is already being used." && (
            <Text style={{color: 'red'}}>
              {err}
            </Text>
          )}

          <FieldInput Error={emailError} placeholder='Email' value={email} setValue={setEmail} icon='email'/>
          {!!emailError && (
            <Text style={{color: 'red'}}>
              {emailError}
            </Text>
          )}

          <FieldInput Error={passwordError} placeholder='Password' value={password} setValue={setPassword} secureTextEntry icon='lock'/>
          {!!passwordError && (
            <Text style={{color: 'red'}}>
              {passwordError}
            </Text>
          )}
          {/* <FieldInput placeholder='Confirm Password' value={confirmPassword} setValue={setConfirmPassword} secureTextEntry/> */}

            <CustomButton
              text='Register'
              onPress={onRegister}
            />

          <Text style={styles.policy}>By Registering, you confirm that you accept our <Text style={styles.link} onPress={onTermsOfUse}>Terms Of Use</Text> and <Text style={styles.link} onPress={onPrivacyPolicy}>Privacy Policy</Text></Text>

          {/* <SocialSignIn /> */}

            <CustomButton
              text='Already have an account? Sign In.'
              onPress={onSignIn}
              type='TERTIARY'
            />

        </View>
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
    // marginTop: '30%',
    backgroundColor: 'black',
  },

  title: {
    color: 'lightgray',
    textAlign: 'center',
    marginBottom: '20%',
    marginTop: '25%',
    fontSize: 30,
    fontWeight: 'bold',
    // fontWeight: 'bold',
    // fontFamily: 'Mukta-Bold',
    // fontFamily: 'Mukta-ExtraBold',
    // fontFamily: 'Outfit-Black'
    // fontFamily: 'RobotoSlab-Black'
    // fontFamily: 'SourceSansPro-Bold',
  },

  policy: {
    color: 'lightgray',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: '5%',
    width: '81%',
  },

  link: {
    // color: '#FDB075'
    color: '#b8860b'
  }
});

export default SignUpScreen;