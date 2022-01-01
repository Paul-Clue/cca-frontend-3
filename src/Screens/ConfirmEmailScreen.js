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
import Navigation from "../components/Navigation";

const ConfirmEmailScreen = () => {
  const [code, setCode] = useState('');

  const navigation = useNavigation();

  const onConfirm = () => {
    // console.warn('Confirm');
    // TODO: LOGIC FOR CONFIRM FROM BACK END BEFORE REDIRECT

    navigation.navigate('HomeScreen');
  };

  const onResend = () => {
    console.warn('Resend');
    // TODO: ADD LOGIC FOR RESENDING THE CODE
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
          <Text style={styles.title}>{'Confirm Your Email'}</Text>

          <FieldInput placeholder='Enter Your Confirmation Code' value={code} setValue={setCode}/>
          {/* <FieldInput placeholder='Email' value={email} setValue={setEmail}/> */}

          <CustomButton
            text='Confirm'
            onPress={onConfirm}
          />

          <CustomButton
            text='Request Code'
            onPress={onResend}
            type='SECONDARY'
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

export default ConfirmEmailScreen;