import React, { useEffect, useState } from "react";
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
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import { setName } from '../redux/actions';
import { TextInput } from "react-native-gesture-handler";

const ACCESS_TOKEN = 'access_token';
const USER = 'user';



 const ProfileModal = () => {
  //  const { name } = useSelector(state => state.userReducer);
  //  const dispatch = useDispatch();
  alert('Please be advised that every time that you access this this screen, you must re-fill and resubmit all of the required fields, or your profile info will be incorrect!!');

  const [email1, setEmail1] = useState(null);
  const [phoneNumber1, setPhoneNumber1] = useState(null);
  const [address1, setAddress1] = useState(null);

    const [area, setArea] = useState(null);// --DONE--
    const [employed, setEmployed] = useState(null);// --DONE--
    const [employmentHours, setEmploymentHours] = useState(null);// --DONE--
    const [employmentType, setEmploymentType] = useState(null);// --DONE--
    const [manager, setManager] = useState(null);// --DONE--
    const [name, setName] = useState(null);// --DONE--
    const [phoneNumber, setPhoneNumber] = useState(null);// --DONE--
    const [address, setAddress] = useState('');// --DONE--
    const [email, setEmail] = useState('');

  // console.log(`This is 400: ${manager}`)
  // const [date, setDate] = useState(new Date())
  // const [open, setOpen] = useState(false)

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
    console.log(`this is the ID: ${theUser.res.user.id}`);

    // console.log(`This is the token: ${theUser.res.jwt}`)
      try{
        let userProfile = await fetch (`https://e955-72-252-198-169.ngrok.io/api/v1/user/${userId}`,{
          method: 'Post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user:{
              username: name,
              phone_number: phoneNumber,
              address: address,
              release_date: date,
              manager: manager,
              employment_date: date2,
              employment_type: employmentType,
              employed: employed,
              work_hours: employmentHours,
              residence: area
            }
        })
        });
        console.log(`This is line 120: ${name}`)
        // .then(res => res.json())
        // .then(data => {
        //   let pic1 = JSON.stringify(data.user);
        //   setProfilePic(pic1);
        //   // console.log(`This is the Rails image return data: ${profilePic}`);
        //   // console.log('It ran');
    
        // });
        
      //   const pic1 = await img.json();
      //   const pic2 = pic1.user;
      //  setProfilePic(pic2);
      // navigation.navigate('Profile');
      const savedPerson={
        res:{
        user: {
          id: userId,
          username: name ,
          phone_number: phoneNumber,
          address: address,
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
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
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
    const currentDate = selectedDate || date2;
    setShow2(Platform.OS === 'ios');
    setDate2(currentDate);
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

  const test = () => {
    if(employed === 'Yes'){
      return (
        <View>
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 70}}>
            <Text
              style={{
                color: 'whitesmoke',
                marginTop: 30,
                fontSize: 17
              }}
            >
              What Industry?
            </Text>
            <Picker
              selectedValue={employmentType}
              onValueChange={(value) => {
                setEmploymentType(value);
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
          selectedValue={employmentHours}
          onValueChange={(value) => {
            setEmploymentHours(value);
          }}
          mode="dropdown"
          style={styles.picker}
        >
        <Picker.Item label="Choose" value={null} />
        <Picker.Item label="Part Time" value="Part Time" />
        <Picker.Item label="Full Time" value="Full Time" />
        {/* <Picker.Item label="Canada" value="Canada" />
        <Picker.Item label="India" value="India" />
        <Picker.Item label="Japan" value="Japan" /> */}
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
              Please pick the date you were employed
            </Text>
            {/* <Button onPress={showDatepicker} title="Release Date" style={{backgroundColor:'#3B71F3'}} /> */}
            <CustomButton onPress={showDatepicker2} text='Release Date'/>
          </View>
          {/* <View>
            <Button onPress={showTimepicker} title="Show time picker!" />
          </View> */}
          {show2 && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date2}
              mode={mode2}
              is24Hour={true}
              display="default"
              onChange={onChange2}
            />
          )}
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
          </View>
      </View>
    )
    }else{
      return null
    }

  }

  const submitButton = () => {
    if (employed !== 'Yes') {
      return(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
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

        {/* <TextInput
          style={{color: 'black', borderWidth: 2, borderColor: 'red', width: '70%', height: '6%', backgroundColor: 'whitesmoke', padding: 10}}
          placeholder = 'Your Name'
          onChangeText={(value) => dispatch(setName(value))}
          defaultValue={name}
        /> */}

        <FieldInput placeholder='Edit Name'  value={name} setValue={setName} icon='person' defaultValue={name}/>
        <FieldInput placeholder='Edit Phone Number' value={phoneNumber} setValue={setPhoneNumber} icon='phone' defaultValue={phoneNumber1}/>
        <FieldInput
        placeholder='Edit Address'
        value={address}
        setValue={setAddress}
        icon='house'
        />

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
          selectedValue={area}
          onValueChange={(value) => {
            setArea(value);
            if (area === 'Upstate'){
              setManager('Ann');
              console.log(`This is1: ${manager}`)
            }
            if (area === 'City') {
              setManager('Joe');
              console.log(`This is2: ${manager}`)
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
      <Text
          style={{
            color: 'whitesmoke',
            marginTop: 30,
            fontSize: 17
          }}
        >
            Are you Employed?
            </Text>
          <Picker
          selectedValue={employed}
          onValueChange={(value) => {
            setEmployed(value);
          }}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="Choose" value={null} />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
          {/* <Picker.Item label="Canada" value="Canada" />
          <Picker.Item label="India" value="India" />
          <Picker.Item label="Japan" value="Japan" /> */}
        </Picker>
      </View>
      <View>
        {submitButton()}
      </View>

      <View>
        {test()}
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