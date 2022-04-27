import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setMilestoneList } from '../redux/actions';
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

const ACCESS_TOKEN = 'access_token';
const USER = 'user';

  const MilestoneScreen = () => {
    let theID = '';

    const [thisState, setThisState] = useState(null);
    const [test, setTest] = useState(null);

    const theState = () => {
      setThisState('something');
    }

    useEffect( async () => {
        let user = await AsyncStorage.getItem(USER);
        let theUser = JSON.parse(user);
        let userId = theUser.res.user.id;

        //Run a fetch for the milestones right here.
        theID = userId
      // setTest(userId);
    // }, [])

    // useEffect(async () => {
      try{
        let response = await fetch(`${Ngrok}/milestone/${theID}`, {
          method: 'Get',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          },
        });
        // console.warn(response.text())
        
        let res = await response.json();
        dispatch(setMilestoneList(res));
        
  
        if(response.status >= 200 && response.status < 300) {
          // setErr('');
          console.log('The status is 200');
  
        }else{
          for (let i = 10; i < res.length-2; i += 1) {
            errors += res.charAt(i);
          }
          console.log('There is an error');
  
          // console.warn(errors)
          throw errors;
        }
      }
  
      catch (errors) {
        // console.log('errors caught: ' + errors);
        console.log('errors caught:');
      }
    }, [])

    // console.log(`This is Test: ${test}`);

  const dispatch = useDispatch();
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
  // console.warn(storedInfoMileStoneList);


//   useEffect (() => {

//     (async () => {
//       // runThis();
//       // const { status } = await Camera.requestCameraPermissionsAsync();
//       // setHasPermission(status === 'granted');
//       navigation.addListener('focus', () => {
//         getUserInfo();
//         // console.warn(userName);
//       });

//       if (Platform.OS !== 'web') {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//           alert('Sorry we need camera role permissions to make this work.');
//         }
//       }
//       // return unsubscribe;
      
//     })();
//   }, [navigation]);

//   const runPic = async () => {
//     let user = await AsyncStorage.getItem(USER);
//     let theUser = JSON.parse(user);
//     let userId = theUser.res.user.id;

//       try{
//         let img = await fetch (`${Ngrok}/profilepic/${userId}`,{
//           method: 'Get',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           },
//         });
//         // .then(res => res.json())
//         // .then(data => {
//         //   let pic1 = JSON.stringify(data.user);
//         //   setProfilePic(pic1);
//         //   // console.log(`This is the Rails image return data: ${profilePic}`);
//         //   // console.log('It ran');
    
//         // });
        
//         const pic1 = await img.json();
//         const pic2 = pic1.user;
//        setProfilePic(pic2);
    
//       }catch (error) {
//         console.log(error);
//       }
//     };
    
//     runPic();

// if (hasPermission === null){
//   console.log('hasPermission is null.');
// }
// if (hasPermission === false) {
//   console.log('hasPermission is false.');
// }

// const cloudinaryUpload = async (photo) => {
//   const data = new FormData()
//   data.append('file', photo)
//   data.append('upload_preset', 'appimagepreset')
//   data.append("cloud_name", "dno0dwbro")
//   try{
//     const pic = await fetch("https://api.cloudinary.com/v1_1/dno0dwbro/upload", {
//       method: "post",
//       body: data
//     });

//       const picAddress = await pic.json();
//       let user = await AsyncStorage.getItem(USER);
//       let theUser = JSON.parse(user);
//       let userId = theUser.res.user.id;
//       // console.log(theUser.res.user.id);
//       try{
//         fetch (`${Ngrok}/user/${userId}`,{
//           method: 'Post',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             user: {
//               img: picAddress.secure_url
//             }
//           })
//         });
  
//       }catch (error) {
//         console.log(error);
//       }
//       setPhotoUri(picAddress.secure_url);
//   }catch (errors) {
//     console.log('errors caught: ' + errors);
//   }
// }

// const pickImage = async () => {
//   let photo = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.All,
//     allowsEditing: true,
//     aspect: [4, 3],
//     quality: 1
//   });

  

//   const newPhoto = await manipulateAsync (
//     photo.uri,
//     [
//       {resize: {height: 200, width: 200}},
//     ],
//     { compress: 1, format: SaveFormat.JPEG }
//   );

//   const fileName = newPhoto.uri.replace(/^.*[\\\/]/, "");

//   const source = {
//           uri: newPhoto.uri,
//           name: fileName,
//           type: 'image/jpeg'
//         };

//   try{
//     await cloudinaryUpload(source);
//     runPic();
// }catch (e) {
//   console.log(e.message);
//   return null;
// }
// }



  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'black'}}>
      <View style={{marginTop: '10%', alignItems: 'center'}}>
        <Text style={{color: 'whitesmoke', fontSize: 30}}> MILESTONES </Text>
        <View>
          {milestoneList2.map((item) => {
            // if (item.id === storedInfoMilestoneId) {
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
                          // console.log('Something');
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
                            {console.log(`LIST:${storedInfoMileStoneList}`)}
                        </Text>
                    </TouchableOpacity>
              // }
              })}
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