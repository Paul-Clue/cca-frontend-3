import React, { useEffect, useState } from "react";
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

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigation = useNavigation();

  const onSend = async () => {
    if (email.trim() === '') {
      setEmailError( 'An email is required.');
      console.log(emailError);
    }else{
      setEmailError('');
      console.warn('It went through.');
      try{
        let response = await fetch('https://e955-72-252-198-169.ngrok.io/api/v1/passchangecode', {

        // let response = await fetch('https://0692-64-64-117-139.ngrok.io/api/v1/passchangecode', {
          // let response = await fetch('https://secure-mountain-84366.herokuapp.com/appoints', {
          method: 'Post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              email: email.trim(),
            }
          })
        });
  
        let res = await response.text();
        let res2 = '';
        for (let i = 12; i < res.length-2; i += 1) {
          res2 += res.charAt(i);
        }
        console.warn(res2);
        // console.warn(email_code)
  
        if(response.status >= 200 && response.status < 300) {
          setEmail('');
          console.log('res is successful: ' + res);

          navigation.navigate('HomeScreen');
        }else{

          let errors = res;
          console.log(response.status);
          throw errors;
        }
      }
  
      catch (errors) {
        console.log('errors caught: ' + errors);
      }
      console.warn('Resend');

      navigation.navigate('NewPasswordScreen');
    }
  };

  // const onSend = () => {
    
  // };

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
          <Text style={styles.title}>{'Reset Your Password'}</Text>

          <FieldInput Error={emailError} placeholder='Email' value={email} setValue={setEmail} icon='email'/>
          {!!emailError && (
            <Text style={{color: 'red'}}>
              {emailError}
            </Text>
          )}
          {/* <FieldInput placeholder='Email' value={email} setValue={setEmail}/> */}

          <CustomButton
            text='Send'
            onPress={onSend}
          />

          <CustomButton
            text='Back To Sign In.'
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
    marginBottom: '10%',
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

export default ForgotPasswordScreen;