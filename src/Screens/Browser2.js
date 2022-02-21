import React, { useEffect, useState, Component } from "react";
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
  Linking
} from 'react-native';
import WebView from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";



 const BackButton = ({}) => {
  <TouchableOpacity onPress={() => {
    navigation.goBack();
  }}>
    <Text>&lt; Back</Text>
  </TouchableOpacity>
 }

 export default class Browser extends Component {
  static navigationOptions = ({}) => ({
    title: 'Browser',
    headerLeft: <BackButton navigation={navigation} />
  })

   render(){
    // const navigation = useNavigation();
    return (
      <View style={{flex: 1}}>
        <WebView 
          style={styles.WebViewStyle} 
          source={{uri: 'https://meet.google.com/hzp-mxmr-ytp'}} 
          // source={{
          //   uri: this.props.navigation.state.params.url
          // }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    marginTop: (Platform.OS) === 'ios' ? 20 : 0
 },

});