import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
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
  const { storedInfoMilestoneId } = useSelector(state => state.userReducer);
  const { storedInfoMileStoneList } = useSelector(state => state.userReducer);

  let milestoneList2 = [];

  const configMilestones = () => {
    for(let i = 0; i < storedInfoMileStoneList.length; i += 1) {
      milestoneList2.push(storedInfoMileStoneList[i]);
    }
  }

  configMilestones();

  // console.warn(storedInfoMilestoneId);
  console.warn(storedInfoMileStoneList);

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'black'}}>
      <View style={{marginTop: '10%', alignItems: 'center'}}>
        <Text style={{color: 'whitesmoke', fontSize: 30}}> MILESTONES </Text>
        <View>
          {milestoneList2.map((item) => {
            if (item.id === storedInfoMilestoneId) {
            return  <TouchableOpacity
                      style={{
                        color: 'whitesmoke',
                        fontSize: 25,
                        fontWeight: 'bold',
                        borderColor: 'fray',
                        borderWidth: 1,
                        borderRadius: 5,
                        marginBottom: 5,
                        marginTop: 20,
                        backgroundColor: 'sandybrown',
                        padding: 5,
                      }}
                      key={item.id}
                      onPress={async () => {
                        // dispatch(setMilestoneId(item.id));
            
                          // navigation.navigate('MilestoneScreen');
                          
                      }}
                      
                    >
                      {/* <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={{marginRight: 20,}}
                      /> */}
                      
                        <Text
                          style={{marginLeft: 20, fontSize: 20,}}
                          >
                            
                            {`Milestone: ${item.title}\n\n`}
                            {`Instructions:\n${item.instructions}`}
                        </Text>
                    </TouchableOpacity>
              }})}
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
container: {
  
},

});

export default MilestoneScreen;