import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import { setManagerList, setCaseProfile, setMilestoneList } from '../redux/actions';
import Ngrok from '../util/Ngrok';
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
  const { storedInfoManagerList } = useSelector(state => state.userReducer);
  const { storedInfoCaseProfile } = useSelector(state => state.userReducer);

  const dispatch = useDispatch();
  const navigation = useNavigation();

    const renderManagerList = () => {
      let ListArray = [];
     for (let i =0; i<= storedInfoManagerList.length; i += 1) {
       if (storedInfoManagerList[i] === undefined || storedInfoManagerList[i] === null) {
        continue;
       }
        ListArray.push(storedInfoManagerList[i]);
      // console.log(ListArray[i])

        // return(
        //   <Text style={{color: 'whitesmoke'}}> It Ran  {i}</Text>
        // )
      }

      return ListArray.map((user) => {
        return(
          <TouchableOpacity
          style={{width: '95%',}}
          key={user.id}
          onPress={async () => {
            dispatch(setCaseProfile(user.id));

            try {
              let img = await fetch(`${Ngrok}/milestone/${user.id}`, {
                method: 'Get',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
              });
                // CONSOLE.LOG THE RESPONSE TO SEE HOW IT COMES BACK AND FORMAT MILESTONES PROPERLY.
        
              const userMilestones = await img.json();
              const userMilestones2 = userMilestones;

              dispatch(setMilestoneList(userMilestones2));

            } catch (error) {
              console.log(error);
            }

              navigation.navigate('CaseProfileScreen');
          }}
          >
            <View style={{
              width: '95%',
              height: 70,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255, 0.5)',
              borderColor: 'whitesmoke',
              borderWidth: 2,
              borderRadius: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 5,
              }}
              >
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50, height: 50,
                borderWidth: 3,
                borderColor: 'whitesmoke',
                borderRadius: 100,
                }}
                >
                <ImageBackground style={{width: 40, height: 40, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    source={{
                      uri: user.img
                      }}
                      style={{width: 40, height: 40, borderRadius: 50}}
                    >
                  </Image>
    
                </ImageBackground>
              </View>
              <Text style={{color: 'whitesmoke', fontWeight: 'bold', fontSize: 15}}>
                {user.username}
              </Text>
            </View>
          </TouchableOpacity>
              )
      })
    }

  return (
    <ScrollView
    style={{flex: 1, backgroundColor: 'black'}}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: 40}}>
        <View style={{marginBottom: 30}}>
          <Text style={{color: 'whitesmoke', fontSize: 20}}> Your Case Load </Text>
        </View>

        {/* <Text style={{color: 'whitesmoke'}}>This is something:</Text> */}
        {/* <Text style={{color: 'whitesmoke'}}></Text> */}
        {renderManagerList()}
      </View>
        
    </ScrollView>
  )
};

const styles = StyleSheet.create({
container: {
},

});

export default React.memo(CaseManagerScreen);