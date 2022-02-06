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

const NewPasswordScreen = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [codeError, setCodeError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  const navigation = useNavigation();

  const onSubmit = async () => {
    if (code.trim() === '') {
      setCodeError( 'A code is required.');
      console.log(codeError);
    }
    if (newPassword.trim() === '') {
      setNewPasswordError( 'A password is required.');
      console.log(newPasswordError);
    }else{
      setCodeError('');
      setNewPasswordError('');
      console.warn('It went through.');

      try{
        let response = await fetch('https://e955-72-252-198-169.ngrok.io/api/v1/passchangeverify', {
          // let response = await fetch('https://secure-mountain-84366.herokuapp.com/appoints', {
          method: 'Post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              email_code: code,
              password: newPassword,
            }
          })
        });
  
        let res = await response.text();
        let res2 = '';
        for (let i = 12; i < res.length-2; i += 1) {
          res2 += res.charAt(i);
        }
  
        if(response.status >= 200 && response.status < 300) {
          setNewPassword('');
          setCode('');
          console.log('res is successful: ' + res);
          alert(
            "Your password was changed successfully. Go back to sign in.",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: true });
          // navigation.navigate('HomeScreen');
        }else{
          alert(
            "Password change was not successful.",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: true });
          let errors = res;
          console.log(response.status);
          throw errors;
        }
      }
  
      catch (errors) {
        console.log('errors caught: ' + errors);
      }
      // navigation.navigate('HomeScreen');
    }
  };

  const onResend = () => {
    console.warn('Resend');
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
          <Text style={styles.title}>{'Reset Your Password'}</Text>

          <FieldInput Error={codeError} placeholder='Code' value={code} setValue={setCode} icon='lock'/>
          {!!codeError && (
            <Text style={{color: 'red'}}>
              {codeError}
            </Text>
          )}
          <FieldInput Error={newPasswordError} placeholder='Enter Your New Password' value={newPassword} setValue={setNewPassword} secureTextEntry icon='lock'/>
          {!!newPasswordError && (
            <Text style={{color: 'red'}}>
              {newPasswordError}
            </Text>
          )}

          <CustomButton
            text='Submit'
            onPress={onSubmit}
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

export default NewPasswordScreen;