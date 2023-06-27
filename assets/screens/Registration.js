import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import {Styler} from '../styles/RegistrationCSS';
import LinearGradient from 'react-native-linear-gradient';
import {Input} from 'react-native-elements';
import DropdownComponent from './dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Registration = () => {
  const navigation=useNavigation();
  const [college_id, setCollege_id] = useState('');
  const [course_id, setCourse_id] = useState('');
  const [firstname, setFirstName] = useState('');
  const [Lastname, setLastName] = useState('');
  const [DOB, setDOB] = useState('DOB');
  const [email, setEmail] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [AlternateContactNo, setAlternateContactNo] = useState('');
  const [Course, setCourse] = useState('');
  const [School, setSchool] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const monthAndYear = moment(date).format('DD/MM/YYYY');
    setDOB(monthAndYear);
    // console.warn(date);
    hideDatePicker();
  };

  const Register = () => {
    // alert('hi')
    // console.warn(college_id);
    // console.warn(course_id);
    fetch(global.api + 'user/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: Lastname,
        email: email,
        password: Password,
        confirm_password: Password,
        date_of_birth: DOB,
        contact: ContactNo,
        alternate_contact: AlternateContactNo,
        college_id: college_id,
        status: 'active',
        course_id: course_id,
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.warn(json);
        if (json.status) {
          navigation.navigate('Signup');
      
        } else {
         alert(error);
        }
      })
      .catch(error => {
        console.warn(error);
      })
      .finally(() => {
        // this.setState({isLoading: false});
      });
  };

  const getCollegeAndCourseId = (college, course) => {
    setCollege_id(college);
    setCourse_id(course);
  };

  const textvalidation = text => {
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(text)) {
      console.warn('invalid name');
    } else console.warn('ok');
  };

  const EmailValidation = email => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
      console.warn('invalid email');
    } else console.warn('ok');
  };

  const MobileValidation = num => {
    const regex = /^[0]?[6789]\d{9}$/;
    if (!regex.test(num)) {
      console.warn('invalid number');
    } else console.warn('ok');
  };

  const PasswordValidation = pswd => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!regex.test(pswd)) {
      console.warn(
        'password should be 6 to 16 character long consisting at least one number and one special character',
      );
    } else console.warn('ok');
  };

  const PasswordConfirmation = pswd => {
    if (pswd != Password) {
      console.warn("password didn't match");
    } else console.warn('matched');
  };

  // useEffect(()=>{
  //   console.warn(moment(new Date()).format("DD/MM/YYYY"))
  // },[])

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#28A8CD', '#1B6AA5']}
        style={Styler.linearGradient}>
        <Image source={require('../src/logo.png')} style={Styler.logo} />
      </LinearGradient>
      <ScrollView>
        <Text style={Styler.font}> Register </Text>
        <View style={Styler.InputBox}>
          <TextInput
            placeholder="First Name"
            value={firstname}
            onChangeText={setFirstName}
            onBlur={() => textvalidation(firstname)}
            // onBlur={()=>{alert(firstname);}}
          />
        </View>
        <View style={Styler.InputBox}>
          <TextInput
            placeholder="Last Name"
            value={Lastname}
            onChangeText={setLastName}
            onBlur={() => textvalidation(Lastname)}
            // onBlur={()=>{alert(firstname);}}
          />
        </View>
        <View style={Styler.InputBox}>
          <TextInput
            placeholder="Email"
            // testID="LoginEmailAddress"
            // textContentType="emailAddress"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            onBlur={() => EmailValidation(email)}
          />
        </View>
        <View style={Styler.InputBox}>
          <TextInput
            placeholder="Contact No."
            value={ContactNo}
            // keyboardType="number"
            keyboardType={'phone-pad'}
            onChangeText={setContactNo}
            onBlur={() => MobileValidation(ContactNo)}
          />
        </View>
        <View style={Styler.InputBox}>
          <TextInput
            placeholder="Alternate Contact No."
            keyboardType={'phone-pad'}
            value={AlternateContactNo}
            onChangeText={setAlternateContactNo}
            onBlur={() => MobileValidation(AlternateContactNo)}
          />
        </View>

        <TouchableOpacity style={Styler.InputBox} onPress={showDatePicker}>
          <Text>{DOB}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          // date={DOB}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        {/* <View style={Styler.InputBox}>
          <TextInput placeholder="School Name" 
          value={School}   
          onChangeText={setSchool}
          />
        </View> */}

        <DropdownComponent getinfo={getCollegeAndCourseId} hello={'name'} />

        {/* <View style={Styler.InputBox}>
          <TextInput placeholder="Course Name" 
          value={Course}   
          onChangeText={setCourse}
          />
        </View> */}

        <View style={Styler.InputBox}>
          <TextInput
            placeholder="Password"
            value={Password}
            onChangeText={setPassword}
            secureTextEntry={true}
            onBlur={() => PasswordValidation(Password)}
          />
        </View>
        <View style={Styler.InputBox}>
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            onBlur={() => PasswordConfirmation(confirmPassword)}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            Register();
          }}>
          <LinearGradient
            colors={['#28A8CD', '#1B6AA5']}
            style={{
              backgroundColor: '#1B6AA5',
              height: 40,
              width: '70%',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              marginVertical: 30,
            }}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>
              Create
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Registration;
