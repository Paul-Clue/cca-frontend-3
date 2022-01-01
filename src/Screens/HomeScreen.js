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


 const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text> HomeScreen </Text>
    </View>
  )
};

const styles = StyleSheet.create({
container: {
  marginTop: '20%',
  fontSize: 25,
  alignItems: 'center',
},

});

export default HomeScreen;