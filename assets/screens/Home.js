import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  FlatList,
  View,
  Text,
  TextInput,
  Pressable,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import HorizontalFlatList from './Horizontalflatlist';
import {Signupstyle} from '../styles/Signupstyle';
import {Header, Icon} from 'react-native-elements';
import VerticalFlatlist from './VerticalFlatlist';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../AuthContextProvider';
const Home = () => {
  const [name, changename] = useState('');

  //receive name from async storage
  const getData = async () => {
    try {
      const firstname = JSON.parse(await AsyncStorage.getItem('@name'));
      console.warn('name' + firstname);
      if (firstname !== null) {
        changename(firstname);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderLeft = () => {
    return (
      <View style={Signupstyle.headerleft_divider}>
        <Text style={Signupstyle.header_text}>Welcome {name}</Text>
      </View>
    );
  };

  const renderRight = () => {
    return (
      <View style={Signupstyle.headerright_divider}>
        <Icon name="person" type="ionicon" size={30} color={'white'} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <>
          <Header
            leftComponent={renderLeft}
            rightComponent={renderRight}
            containerStyle={Signupstyle.headerContainer}
            backgroundColor="transparent"
          />
          <ScrollView>
            {/* external view start */}
            <View style={Signupstyle.external_view}>
              <View style={Signupstyle.search_container}>
                <View style={Signupstyle.icon_style}>
                  <Icon name="search" type="ionicon" size={30} color={'grey'} />
                </View>
                <TextInput
                  placeholder=" search for any quiz"
                  style={Signupstyle.search_text}
                />
              </View>
              {/* details container */}
              <View style={Signupstyle.top_container}>
                <View style={Signupstyle.details}>
                  <Text style={Signupstyle.details_text}>
                    Total Quiz Attempted
                  </Text>
                </View>
                <View style={Signupstyle.details}>
                  <Text style={Signupstyle.details_text}>Marks</Text>
                </View>
              </View>
              {/* flat list function horizonatal  */}
              <View>
                <HorizontalFlatList />
              </View>
              <View>
                <VerticalFlatlist />
              </View>
            </View>
          </ScrollView>
        </>
      </View>
    </SafeAreaView>
  );
};

export default Home;
