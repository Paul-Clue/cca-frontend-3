import React, {useState, Component} from 'react';
import t from 'tcomb-form-native';
var _ = require('lodash');
import bootstrap from 'tcomb-form-native/lib/stylesheets/bootstrap.js';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';
import { render } from 'react-dom';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  terms: t.Boolean
});

const options = {
  fields: {
    email: {
      error: 'An email is required.'
    },
    username: {
      error: 'A username is required.'
    },
    password: {
      error: 'A password is required.'
    },
    terms: {
      label: 'Agree to Terms',
    },
  },
  stylesheet : bootstrap
};

class Form1 extends Component {
  // constructor (props) {
  //   super(props)
  //   this.handleSubmit = this.handleSubmit.bind(this)
  //   // this.refs = this.refs.bind(this)
  // }
  clearForm = () => {
    // clear content from all textbox
    this.setState({ value: null });
  }

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    Alert.alert(JSON.stringify(value));
    this.clearForm();
  }
  // handleSubmit() {
  //   // call getValue() to get the values of the form
  //   // console.log("REFS.FORM");
  //   console.log(this._formRef);
  //   var value = this._formRef.getValue();
  //   if (value) { // if validation fails, value will be null
  //     console.log(value); // value here is an instance of Person
  //   }
  // }
  render(){
    return (
      <View >
        {/* <Text style={styles.form}> Demo Form </Text> */}
        <View>
          {/* <TextInput style={styles.email}
            placeholder="Email" />
          <TextInput style={styles.password}
            secureTextEntry={true}
            placeholder="Password"
          /> */}
          <Form
          // style={styles.form}
          ref={c => this._form = c}
          type={User}
          options={options}
          />

          <TouchableOpacity style={{flexDirection: "row"}} onPress={() => console.log('Someone pressed it.')}>
            <Button
                title="Sign In!"
                onPress={this.handleSubmit}
              />
              <View style={{width: 30}} />
              <Button
                title="Sign Up!"
                onPress={this.handleSubmit}
              />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

options.stylesheet.textbox.normal = {
  color: 'blue',
  height: 36,
  padding: 7,
  borderRadius: 5,
  borderWidth: 1,
  borderColor:'lightskyblue',
  marginBottom: 5,
  backgroundColor: 'whitesmoke'
};

options.stylesheet.textbox.error = {
  color: 'blue',
  backgroundColor: 'whitesmoke',
  borderWidth: 1,
  borderColor: "red",
}

options.stylesheet.controlLabel.normal = {
  color: 'white',
};

options.stylesheet.controlLabel.error = {
  color: 'red',
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

export default Form1;