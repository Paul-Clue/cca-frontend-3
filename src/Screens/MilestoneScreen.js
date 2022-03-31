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


 const MilestoneScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'black'}}>
      <View style={{marginTop: '10%'}}>
        <Text style={{color: 'whitesmoke'}}> MILESTONES </Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
container: {
  
},

});

export default MilestoneScreen;