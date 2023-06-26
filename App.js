import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, SafeAreaView} from 'react-native';
import Signup from './assets/screens/Signup';

import Home from './assets/screens/Home';
import Authstack from './assets/screens/Authstack';
import Appstack from './assets/screens/Appstack';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from './AuthContextProvider';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

global.api_key = 'http://192.168.1.5:8000/api/';
global.token = '';
const App = () => {
  const [token, setToken] = useState('');
  const [user_data, setData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [subject_id, setId] = useState(1);
  // const [course_id, setcourse_id] = useEffect("");
  useEffect(() => {
    AsyncStorage.getItem('@auth', (err, result) => {
      if (JSON.parse(result) != '') {
        // console.warn('aa', JSON.parse(result));
        setToken(JSON.parse(result));
        setIsLogin(true);
        getProfile(JSON.parse(result));
      } else {
        logout();
      }
    });
  }, []);

  const login = (tok, data) => {
    setToken(tok);
    setData(data);
    setIsLogin(true);
  };

  const logout = () => {
    // alert('loddes out');
    setToken('');
    AsyncStorage.setItem('@auth', JSON.stringify(''));
    AsyncStorage.setItem('@name', JSON.stringify(''));
    setData([]);
    setIsLogin(false);
  };

  const getProfile = token => {
    fetch(global.api_key + 'user', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(response => response.json())

      .then(json => {
        // console.warn(json);
        if (json.message == 'Unauthenticated.') {
          logout();
        }
        if (json.status) {
          login(token, json.data);
        } else {
          logout();
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        setData,
        login,
        logout,
        setToken,
        token: token,
        setId,
        subject_id: subject_id,
      }}>
      <NavigationContainer>
        {/* different stack */}
        {isLogin ? <Appstack /> : <Authstack />}
        {/* <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} /> */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export default App;
