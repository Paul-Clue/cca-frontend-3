import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
// import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
TouchableOpacity,
Button } from 'react-native';
import Picker from './src/components/Picker'

export default function App() {
  // let [fontsLoaded] = useFonts({
  //   Inter_900Black,
  // });
  let [fontsLoaded] = useFonts({
    'Mukta-Bold': require('./assets/fonts/Mukta-Bold.ttf'),
    'Mukta-ExtraBold': require('./assets/fonts/Mukta-ExtraBold.ttf'),
    'Outfit-Black': require('./assets/fonts/Outfit-Black.ttf'),
    'RobotoSlab-Black': require('./assets/fonts/RobotoSlab-Black.ttf'),
    'SourceSansPro-Bold': require('./assets/fonts/SourceSansPro-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }else{
      return (
        <SafeAreaView style={styles.container}>
          <ImageBackground fadeDuration={1500} source={require('./assets/CCAlogin.jpg')} resizeMode="cover" style={styles.image}>

            <Text adjustsFontSizeToFit style={styles.text}>{'WELCOME TO \n CCA'}</Text>
            <Picker />
            {/* <TouchableOpacity onPress={() => console.log('Someone pressed it.')}>
              <Button title={'Press Me!'}></Button>
            </TouchableOpacity> */}
            <Image
          source={require('./assets/CCALogo.png')}
          style={styles.insideImage}
          >
          </Image>
          </ImageBackground>
          <StatusBar style="auto" />
        </SafeAreaView>



        // <View style={styles.container}>
        //   <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        //     <Text style={styles.text}>Open up App.js to start working on your app!</Text>
        //   </ImageBackground>

        //   <Text>Open up App.js to start working on your app!</Text>
        //   <StatusBar style="auto" />
        // </View>
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
    marginTop: 100,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'whitesmoke',
    textAlign: 'center',
    marginBottom: 200,
    marginTop: 60,
    fontSize: 50,
    // fontWeight: 'bold',
    // fontFamily: 'Mukta-Bold',
    // fontFamily: 'Mukta-ExtraBold',
    // fontFamily: 'Outfit-Black'
    // fontFamily: 'RobotoSlab-Black'
    fontFamily: 'SourceSansPro-Bold',
  }
});
