import React, {useState} from 'react';
import t from 'tcomb-form-native';
import { StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
TouchableOpacity,
Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  terms: t.Boolean
});

const Pick = () => {
  handleSubmit = () => {
    const value = refs.form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
  }
  // const [currency, setCurrency] = useState('US Dollar');
  return (
    <View >
      <Text style={styles.form}> Demo Form </Text>
      <View>
        {/* <TextInput style={styles.email}
          placeholder="Email" />
        <TextInput style={styles.password}
          secureTextEntry={true}
          placeholder="Password"
        /> */}
        <Form style={styles.form} type={User} />
        <TouchableOpacity onPress={() => console.log('Someone pressed it.')}>
          <Button
              title="Sign Up!"
              onPress={this.handleSubmit}
            />
        </TouchableOpacity>
        {/* <Picker style={styles.demoForm}
          selectedValue={currency}
          onValueChange={currentCurrency => setCurrency(currentCurrency)}>
          <Picker.Item label="USD" value="US Dollars" />
          <Picker.Item label="EUR" value="Euro" />
          <Picker.Item label="NGN" value="Naira" />
        </Picker>
        <Text style={styles.demoForm}>
          Selected: {currency}
        </Text> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  form: {
    color: 'whitesmoke',
  },

  email: {
    backgroundColor: 'whitesmoke',
    marginBottom: 10
  },

  password: {
    backgroundColor: 'whitesmoke'
  }
});

export default Pick;