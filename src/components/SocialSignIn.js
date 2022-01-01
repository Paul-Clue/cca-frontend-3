import React, { useEffect, useState } from "react";
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
import CustomButton from "../components/CustomButton";


 const SocialSignIn = () => {
  const onSignInWithGoogle = () => {
    console.warn('Google');
  };

  const onSignInWithApple = () => {
    console.warn('Apple');
  };

  return (
    <>
      <CustomButton
        text='Sing In With Google'
        onPress={onSignInWithGoogle}
        bgColor='#fafad2'
        fgColor='#b8860b'
      />
      <CustomButton
        text='Sing In With Apple'
        onPress={onSignInWithApple}
        bgColor='#FAE9EA'
        fgColor='#DD4D44'
      />
  </>
  )
};

export default SocialSignIn;