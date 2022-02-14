import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import { setManagerList, setCaseProfile } from '../redux/actions';
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

  // let users = '';
  // const [user2, setUser] = useState('something');

  // const runPic = async () => {
  //   // let user = await AsyncStorage.getItem(USER);
  //   // let theUser = JSON.parse(user);
  //   // let userId = theUser.res.user.id;

  //     try{
  //        users = await fetch (`https://5254-72-252-198-169.ngrok.io/api/v1/users`,{
  //         method: 'Get',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //     let users1 = await users.json();
  //     let arr = users1;
     

  //     // setUser(users1);
  //     return arr;

  //     }catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const giveValue = async () => {
  //     return await runPic().then(res => res);
  //   }

  //   setUser(giveValue());
    // console.log(storedInfoManagerList.length)
    // MAKE A NEW ARRAY.
    // THEN PUT ALL OF THE CONTENTS FROM storageInfoManagerList into that array
    // THEN MAP OUT THE CONTENTS OF THE ARRAY INTO THE VIEW
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
          onPress={() => {
            dispatch(setCaseProfile(user.id));
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
                {console.log(`line 81 `)}
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