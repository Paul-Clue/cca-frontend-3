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


 const CaseManagerScreen = () => {
  return (
    <ScrollView
    style={{marginTop: '20%', flex: 1}}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Text> Case Manager Screen </Text>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
container: {
  
},

});

export default CaseManagerScreen;