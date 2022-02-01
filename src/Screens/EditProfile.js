import React, { useEffect, useState } from "react";
import FieldInput from '../components/FieldInput';
import { Picker } from "@react-native-picker/picker";
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
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


 const ProfileModal = () => {
    const [area, setArea] = useState(null);// area picker
    const [employed, setEmployed] = useState(null);//employment picker
    const [employmentHours, setEmploymentHours] = useState(null);
    const [manager, setManager] = useState(null);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
  // console.log(area)
  // console.log(`This is 400: ${manager}`)
  // const [date, setDate] = useState(new Date())
  // const [open, setOpen] = useState(false)


  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [date2, setDate2] = useState(new Date());
  const [mode2, setMode2] = useState('date');
  const [show2, setShow2] = useState(false);

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
  console.log(employed)

  const test = () => {
    if(employed === 'Yes'){
      return (
        <View>
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 70}}>
            <Text style={{color: 'whitesmoke'}}>What Industry?</Text>
            <Picker
              selectedValue={employmentHours}
              onValueChange={(value) => {
                setEmploymentHours(value);
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
        <Text style={{color: 'whitesmoke'}}>What are your hours?</Text>
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
            <Text style={{color: 'whitesmoke'}}>Please pick the date you were employed</Text>
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
        </View>

      </View>
    )
    }else{
      return null
    }

  }

  return (
    <ScrollView style={{marginTop: '0%', backgroundColor: 'black'}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'whitesmoke', marginTop: 30}}> Provide Your Profile Information </Text>

        <FieldInput placeholder='Edit Name' value={name} setValue={setName} icon='person'/>
        <FieldInput placeholder='Edit Phone Number' value={phoneNumber} setValue={setPhoneNumber} icon='phone'/>
        <FieldInput
        placeholder='Edit Address'
        value={address}
        setValue={setAddress}
        icon='house'
        />
        {/* <View>
          <Button title="Open" onPress={() => setOpen(true)} />
          <DatePicker
          display='inline'
            modal
            open={open}
            date={date}
            mode='date'
            onConfirm={(date) => {
              unstable_batchedUpdates(() => {
                setDate(date);
                setOpen(false);
              });
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
        </View> */}


    <View>
      <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'whitesmoke'}}>Please pick your release date</Text>
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

    <View style={{marginTop: 10}}>
      <Text style={{color: 'whitesmoke'}}>Your Release Date: {date.toDateString()}</Text>
    </View>

        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 70}}>
          <Text style={{color: 'whitesmoke'}}>Please select the area that you live in.</Text>
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
        <Text style={{color: 'whitesmoke'}}>Your Area: {area}</Text>

      </View>

      <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 70}}>
          <Text style={{color: 'whitesmoke'}}>Are you Employed?</Text>
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