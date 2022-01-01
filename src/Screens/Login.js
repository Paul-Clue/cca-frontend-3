import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
// import { useFonts } from 'expo-font';
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

import Picker from '../components/Picker';
import Form1 from '../components/Form1';

export default function App() {
  const {height} = useWindowDimensions();
  const {width} = useWindowDimensions();
  
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
        <SafeAreaView style={styles.container}>
          <ScrollView style={{width: "100%"}} contentContainerStyle={{ flexGrow: 1 }}>
            
              <ImageBackground fadeDuration={1500} source={require('../../assets/CCAlogin.jpg')} resizeMode="cover" style={styles.image}>
                <Image
                  source={require('../../assets/CCALogo.png')}
                  style={styles.insideImage}
                >
                </Image>
                <View style={styles.container2}>
                  <Text adjustsFontSizeToFit style={styles.text}>{'Welcome to CCA! \n \'Sign In\'  or \'Sign Up\' if this is your first time with us.'}</Text>
                  <Picker />
                  <Form1 />
                </View>
                {/* <TouchableOpacity onPress={() => console.log('Someone pressed it.')}>
                  <Button title={'Press Me!'}></Button>
                </TouchableOpacity> */}
              </ImageBackground>
              <StatusBar style="auto" />
          </ScrollView>
        </SafeAreaView>

      );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
    // resizeMode: "cover",
    alignSelf: 'stretch',
    width: null,
  },
  insideImage: {
    marginTop: 80,
    marginBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    width: "85%",
    height: "65%",
    // borderColor: "darkgrey",
    borderWidth: 1,
    paddingBottom: 20,
    borderRadius: 20
  },
  text: {
    color: 'whitesmoke',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 0,
    fontSize: 17,
    // fontWeight: 'bold',
    // fontFamily: 'Mukta-Bold',
    // fontFamily: 'Mukta-ExtraBold',
    // fontFamily: 'Outfit-Black'
    // fontFamily: 'RobotoSlab-Black'
    // fontFamily: 'SourceSansPro-Bold',
  }
});
