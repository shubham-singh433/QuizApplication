import React, {useState, useContext} from 'react';
import {Signupstyle} from '../styles/Signupstyle';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView, Text, View, Image, TextInput} from 'react-native';

import {Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import {AuthContext} from '../../AuthContextProvider';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation=useNavigation();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const {login, logout, setToken} = useContext(AuthContext);
  const [isvalid, setValid] = useState(false);

  const emailRegx = () => {
    var re = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    var isvalid = re.test(this.state.email);

    if (isvalid) {
      setValid(true);
    }
  };

  const logined = () => {
    fetch(global.api_key + 'user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: mail,
        password: password,
      }),
    })
      .then(response => response.json())

      .then(json => {
        // console.warn(json);
        if (json.status) {
          setToken(json.token);
          global.token = json.token;
          AsyncStorage.setItem('@auth', JSON.stringify(token));
          AsyncStorage.setItem('@name', JSON.stringify(json.data.firstname));

          login(token, json.data);

          // console.warn('firstname', json.firstname);
        } else {
          setToken('');
          setData([]);
          setIsLogin(false);
          global.token = '';
          AsyncStorage.setItem('@auth', JSON.stringify(''));
          AsyncStorage.setItem('@name', JSON.stringify(''));
          // if we did not recieve any data then
          logout();
        }
      })
      .catch(error => {
        console.log('gggg', error);
      })
      .finally(() => {
        // getData();
      });
  };

  // get name stored in  async storage
  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@auth');
  //     console.warn('getdata', value);
  //     if (value !== null) {
  //       // setToken(value);
  //     }
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // };

  return (
    <>
      <SafeAreaView style={Signupstyle.safe_area}>
        <LinearGradient
          colors={['#28A8CD', '#1B6AA5']}
          style={Signupstyle.linear}>
          <Image
            source={require('../src/logo.png')}
            style={{width: '75%', height: '45%', marginTop: 35}}
          />
        </LinearGradient>
        <ScrollView>
          <View style={Signupstyle.external_view}>
            <View style={Signupstyle.login_view}>
              <Text style={Signupstyle.mainText}>Login</Text>
              <Pressable onPress={()=>{
                navigation.navigate('Registration');
              }}>
                <Text style={Signupstyle.mainText}>/Register </Text>
              </Pressable>
            </View>
            <View style={Signupstyle.container}>
              <TextInput
                placeholder=" Email / Mobile Number"
                value={mail}
                onChangeText={setMail}
                style={Signupstyle.email_input}
              />
            </View>
            <View style={Signupstyle.container}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                // onBlur={alert(password)}
                placeholder="  Password"
                secureTextEntry={true}
                style={Signupstyle.email_input}
              />
            </View>
            <LinearGradient
              colors={['#28A8CD', '#1B6AA5']}
              style={Signupstyle.button_external}>
              <Pressable
                onPress={() => {
                  logined();
                  // if (global.token > 0) {
                  //   navigation.navigate('Home');
                  //   Toast.show('Succesfully loged in ', Toast.LONG, {
                  //     backgroundColor: 'green',
                  //   });
                  // }
                }}
                style={Signupstyle.button}>
                <Text style={Signupstyle.btn_text}>Login</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default Signup;
