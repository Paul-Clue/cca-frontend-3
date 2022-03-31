import React, { useEffect, useState, useRef } from "react";
import FieldInput from '../components/FieldInput';
import { Picker } from "@react-native-picker/picker";
// import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  unstable_batchedUpdates
} from 'react-native';
import Ngrok from '../util/Ngrok';
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import {
  setNamed,
  setPhoneNumbers,
  setAddresss,
  setRelease,
  setEmpDate,
  setEmpType,
  setWorkHours,
} from '../redux/actions';
import { TextInput } from "react-native-gesture-handler";

const ACCESS_TOKEN = 'access_token';
const USER = 'user';



 const ProfileModal = () => {
  const { storedInfoName } = useSelector(state => state.userReducer);
  const { storedInfoPhone } = useSelector(state => state.userReducer);
  const { storedInfoAddress } = useSelector(state => state.userReducer);
  const { storedInfoRelease } = useSelector(state => state.userReducer);
  const { storedInfoEmpDate } = useSelector(state => state.userReducer);
  const { storedInfoEmpType } = useSelector(state => state.userReducer);
  const { storedInfoWorkHours } = useSelector(state => state.userReducer);
  //  const { name } = useSelector(state => state.userReducer);
   const dispatch = useDispatch();

  let area = null;
  let manager = null;
  let employed = null;
  let meeting_link = null;

  let employmentType = null;

  const [email1, setEmail1] = useState(null);
  // const [phoneNumber1, setPhoneNumber1] = useState(null);
  // const [address1, setAddress1] = useState(null);

  const [area1, setArea1] = useState(null);// --DONE--
  const [employed1, setEmployed1] = useState(null);// --DONE--

  const [date, setDate] = useState(new Date());// --DONE--
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [date2, setDate2] = useState(new Date());// --DONE--
  const [mode2, setMode2] = useState('date');
  const [show2, setShow2] = useState(false);

  const navigation = useNavigation();

  const removeUser = async (us) => {
    try {
      await AsyncStorage.removeItem(us);
      // getToken();
    }
    catch(error) {
      console.log("Error removing user")
    }
  };

  const storeUser = async (user) => {
    try {
      await AsyncStorage.setItem(USER, user);
      // getToken();
    }
    catch(error) {
      console.log(error);
    }
  }

  const updateProfile = async () => {
    // getUserInfo();
    let user = await AsyncStorage.getItem(USER);
    let theUser = JSON.parse(user);
    let userId = theUser.res.user.id;
    let theUserName = theUser.res.user.username;
    // console.log(`this is the ID: ${theUser.res.user.id}`);
    // console.warn(`this is manager ${manager}`)

    // console.log(`This is the token: ${theUser.res.jwt}`)
      try{
        let userProfile = await fetch (`${Ngrok}/user/${userId}`,{
          method: 'Post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user:{
              // username: name,
              username: storedInfoName,
              phone_number: storedInfoPhone,
              address: storedInfoAddress,
              release_date: storedInfoRelease,
              // manager: manager,
              employment_date: storedInfoEmpDate,
              // employment_type: employmentType,
              employed: employed,
              work_hours: storedInfoWorkHours,
              // residence: area
            }
        })
        });

      const savedPerson={
        res:{
        user: {
          id: userId,
          // username: name ,
          username: storedInfoName,
          phone_number: storedInfoPhone,
          address: storedInfoAddress,
          email: theUser.res.user.email,
          },
        jwt: theUser.res.jwt
      }
    }
      removeUser(USER);
      storeUser(JSON.stringify(savedPerson));
      navigation.goBack();

      }catch (error) {
        console.log(error);
      }
    };


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || storedInfoRelease;
    setShow(Platform.OS === 'ios');
    dispatch(setRelease(currentDate));
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || storedInfoEmpDate;
    setShow2(Platform.OS === 'ios');
    dispatch(setEmpDate(currentDate));
    // setDate2(currentDate);
  };

  const showMode2 = (currentMode) => {
    setShow2(true);
    setMode2(currentMode);
  };

  const showDatepicker2 = () => {
    showMode2('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const submitButton = () => {
    if (employed !== 'Yes') {
      return(
        <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 120,
          }}
          >
          <Text
            style={{
              color: 'goldenrod',
              marginTop: 30,
              fontSize: 17
            }}
          >
              Submit Profile Information
          </Text>
          <CustomButton onPress={updateProfile} text='Submit'/>
        </View>
      )
    }
  }

  return (
    <ScrollView style={{marginTop: '0%', backgroundColor: 'black'}}>
      {/* <TextFieldComponents /> */}
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
          style={{
            color: 'whitesmoke',
            marginTop: 30,
            fontSize: 20
          }}
          >
            Provide Your Profile Information
          </Text>

          <Text
            style={
              {color: 'whitesmoke',
              fontSize: 12,
              fontWeight: 'bold',
              marginRight: '58%',
              marginTop: '10%'
              }}
            >
              Name:
            </Text>

          <TextInput
            style={{
              color: 'black',
              borderWidth: 2,
              borderColor: 'goldenrod',
              borderRadius: 10,
              width: '70%',
              height: 60,
              backgroundColor: 'whitesmoke',
              padding: 10,
              marginBottom: 10
            }}
            placeholder = 'Your Name'
            onChangeText={(value) => dispatch(setNamed(value))}
            defaultValue={storedInfoName}
            // ref={nam}
            // onChange={handleOnChange}
          />

          <Text
            style={
              {color: 'whitesmoke',
              fontSize: 12,
              fontWeight: 'bold',
              marginRight: '57%'
              }}
            >
              Phone:
            </Text>
          <TextInput
            style={{
              color: 'black',
              borderWidth: 2,
              borderColor: 'goldenrod',
              borderRadius: 10,
              width: '70%',
              height: 60,
              backgroundColor: 'whitesmoke',
              padding: 10,
              marginBottom: 10
            }}
            placeholder = 'Your Phone Number'
            onChangeText={(value) => dispatch(setPhoneNumbers(value))}
            defaultValue={storedInfoPhone}
            // ref={nam}
            // onChange={handleOnChange}
          />

          <Text
            style={
              {color: 'whitesmoke',
              fontSize: 12,
              fontWeight: 'bold',
              marginRight: '55%'
              }}
            >
              Address:
            </Text>
          <TextInput
            style={{
              color: 'black',
              borderWidth: 2,
              borderColor: 'goldenrod',
              borderRadius: 10,
              width: '70%',
              height: 60,
              backgroundColor: 'whitesmoke',
              padding: 10,
              marginBottom: 10
            }}
            placeholder = 'Your Home Address'
            onChangeText={(value) => dispatch(setAddresss(value))}
            defaultValue={storedInfoAddress}
            // ref={nam}
            // onChange={handleOnChange}
          />

          {/* <FieldInput placeholder='Edit Name' value={name} setValue={setName} icon='person' defaultValue={name}/> */}
          {/* <FieldInput placeholder='Edit Phone Number' value={phoneNumber} setValue={setPhoneNumber} icon='phone' defaultValue={phoneNumber1}/> */}
          {/* <FieldInput
          placeholder='Edit Address'
          value={address}
          setValue={setAddress}
          icon='house'
          /> */}
  
      <View>
        <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              color: 'whitesmoke',
              marginTop: 30,
              fontSize: 17
            }}
          >
            Please pick your release date
            </Text>
          {/* <Button onPress={showDatepicker} title="Release Date" style={{backgroundColor:'#3B71F3'}} /> */}
          <CustomButton onPress={showDatepicker} text='Release Date'/>
        </View>
        {/* <View>
          <Button onPress={showTimepicker} title="Show time picker!" />
        </View> */}
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
  
      {/* <View style={{marginTop: 10}}>
        <Text style={{color: 'whitesmoke'}}>Your Release Date: {date.toDateString()}</Text>
      </View> */}
  
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 70}}>
          <Text
            style={{
              color: 'whitesmoke',
              marginTop: 30,
              fontSize: 17
            }}
          >
              Please select the area that you live in.
              </Text>
            <Picker
            selectedValue={area1}
            onValueChange={(value) => {
              setArea1(value);
              area = value;
              if (area === 'Upstate'){
                // setManager('Ann');
                manager ='Ann';
                meeting_link = 'Fake Link';
                console.log(`This is 423: ${manager}`)
              }
              if (area === 'City') {
                // setManager('Joe');
                manager ='Joe';
                meeting_link = 'https://meet.google.com/hzp-mxmr-ytp';
                console.log(`This is2: ${manager}`)
              }
              if (manager === null || area === null){
                alert('Please pick your area again.');
              }

              const updateProfileManager = async () => {
                // getUserInfo();
                let user = await AsyncStorage.getItem(USER);
                let theUser = JSON.parse(user);
                let userId = theUser.res.user.id;
                let theUserName = theUser.res.user.username;
                console.log(`this is the ID: ${theUser.res.user.id}`);
                console.warn(`this is manager ${manager}`)

                // console.log(`This is the token: ${theUser.res.jwt}`)
                  try{
                    let userProfile = await fetch (`${Ngrok}/user/${userId}`,{
                      method: 'Post',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        user:{
                          manager: manager,
                          residence: area,
                          meeting_link: meeting_link,
                        }
                    })
                    });

                  }catch (error) {
                    console.log(error);
                  }
                };

              if (manager === 'Joe' || manager === 'Ann') {
                updateProfileManager();
              }
            }}
            mode="dropdown"
            style={styles.picker}
          >
            <Picker.Item label="Choose" value='' />
            <Picker.Item label="Upstate" value="Upstate" />
            <Picker.Item label="City" value="City" />
            {/* <Picker.Item label="Canada" value="Canada" />
            <Picker.Item label="India" value="India" />
            <Picker.Item label="Japan" value="Japan" /> */}
          </Picker>
          {/* <Text style={{color: 'whitesmoke'}}>Your Area: {area}</Text> */}
  
        </View>
  
      <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 70}}>

      <View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                color: 'whitesmoke',
                marginTop: 30,
                fontSize: 17
              }}
            >
              What Industry Do You Work In?
            </Text>
            <Picker
              selectedValue={storedInfoEmpType}
              onValueChange={(value) => {
                dispatch(setEmpType(value));
              }}
              mode="dropdown"
              style={styles.picker}
            >
            <Picker.Item label="Choose" value={null} />
            <Picker.Item label="Construction" value=" Construction" />
            <Picker.Item label="Health Care" value="Health Care" />
            <Picker.Item label="Education" value="Education" />
            <Picker.Item label="Technology" value="Technology" />
            <Picker.Item label="Automobile" value="Automobile" />
            <Picker.Item label="Manufacturing" value="Manufacturing" />
            <Picker.Item label="Customer Service" value="Customer Service" />
            <Picker.Item label="Security" value="Security" />
            <Picker.Item label="Law" value="Law" />
            <Picker.Item label="Public Advocacy" value="Public Advocacy" />
            <Picker.Item label="I am no employed" value="I am not Employed" />
          </Picker>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 70}}>
          <Text
            style={{
              color: 'whitesmoke',
              marginTop: 30,
              fontSize: 17
            }}
          >
            What are your hours?
          </Text>
        <Picker
          selectedValue={storedInfoWorkHours}
          onValueChange={(value) => {
            dispatch(setWorkHours(value));
            // setEmploymentHours(value);
          }}
          mode="dropdown"
          style={styles.picker}
        >
        <Picker.Item label="Choose" value={null} />
        <Picker.Item label="Part Time" value="Part Time" />
        <Picker.Item label="Full Time" value="Full Time" />
        <Picker.Item label="I am not employed" value="I am not employed" />
        </Picker>
        </View>


        <View>
          <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                color: 'whitesmoke',
                marginTop: 30,
                fontSize: 17
              }}
            >
              Please pick the date you were employed. Or Leave blank if you are not employed.
            </Text>
            <CustomButton onPress={showDatepicker2} text='Release Date'/>
          </View>
          {show2 && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode2}
              is24Hour={true}
              display="default"
              onChange={onChange2}
            />
          )}
          {/* <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                color: 'goldenrod',
                marginTop: 30,
                fontSize: 17
              }}
            >
                Submit Profile Information
              </Text>
            <CustomButton onPress={updateProfile} text='Submit'/>
            </View> */}
          </View>
      </View>
        </View>
        <View>
          {submitButton()}
        </View>

        </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "red",
    borderWidth: 2,
    color: 'whitesmoke',
    backgroundColor: '#3B71F3'
  },

});

export default ProfileModal;