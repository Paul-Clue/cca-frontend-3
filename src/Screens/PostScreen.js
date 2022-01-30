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


 const PostScreen = () => {
  return (
    <ScrollView style={{marginTop: '30%'}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text> Posts Here </Text>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
container: {
  
},

});

export default PostScreen;