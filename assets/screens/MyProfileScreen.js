import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Header, Icon, Input} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Signupstyle} from '../styles/Signupstyle';
import moment from 'moment';

import {AuthContext} from '../../AuthContextProvider';

// Global StyleSheet Import

const school_name = [
  "St. Joseph's Academy",
  "St. Mary's Convent School",
  "St. Thomas' College",
  "St. Joseph's School",
  "St. Mary's School",
  "St. Thomas' School",
  "St. Xavier's School",
  "St. Francis' School",
  "St. George's School",
  "St. Jude's School",
  "St. John's School",
];

const course_name = [
  'B.A.',
  'B.Arch.',
  'B.Com.',
  'B.Ed.',
  'B.Pharma.',
  'B.Sc.',
  'B.Tech.',
  'BBA',
  'BCA',
  'BDS',
  'BHM',
  'BVSc.',
  'LLB',
  'MBBS',
  'Other',
];

const MyProfileScreen = () => {
  const {logout, token} = useContext(AuthContext);
  const navigation = useNavigation();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [dob, setDob] = useState('11-02-1998');

  const [isVisible, setIsVisible] = useState(false);

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
        if (json.message == 'Unauthenticated.') {
          logout();
        }
        if (json.status) {
          console.warn('getprogile', json);

          setFirstName(json.data[0].firstname);
          setLastName(json.data[0].lastname);
          setEmail(json.data[0].email);
          setContact(json.data[0].contact);
          setDob(json.data[0].date_of_birth);
        } else {
          logout();
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        // setLoading(false);
      });
  };
  useEffect(() => {
    getProfile(token);
  });

  logging_out = () => {
    fetch(global.api_key + 'user/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(json => {
        // console.warn(json);
        if (json.message == 'You have been successfully logged out!') {
          logout();
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {});
  };
  //for header left component
  const renderLeftComponent = () => {
    return (
      <View style={{width: win.width}}>
        <Text onPress={() => navigation.goBack()} style={{marginTop: 10}}>
          <Icon name="chevron-back" type="ionicon" color={'white'} />
        </Text>
      </View>
    );
  };

  //for header center component
  const renderCenterComponent = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={[styles.headerHeading, {color: 'white', marginTop: 8}]}>
          My Profile
        </Text>
      </View>
    );
  };

  //function to show date picker
  //   const showPicker = () => {
  //     setIsVisible(true);
  //   };

  //function to handle date picker
  //   const handlePicker = date => {
  //     if (dob == 'Select Your DOB') {
  //       setDob(dob);
  //     }
  //     setIsVisible(false);
  //     setDob(moment(date).format('DD-MM-YYYY'));
  //   };

  //function to hide date picker
  //   const hidePicker = () => {
  //     setIsVisible(false);
  //   };

  // function to render dropdown icon
  //   const renderIcon = () => {
  //     return <Icon name="chevron-down" type="ionicon" color="#000" size={20} />;
  //   };

  //function to update details
  //   const updateDetails = () => {
  //     navigation.goBack();
  //   };

  return (
    <SafeAreaView
      style={[styles.safeAreaView, {backgroundColor: '#1B6AA5', flex: 1}]}>
      <View style={styles.container}>
        {Platform.OS == 'ios' ? (
          <>
            <LinearGradient
              colors={['#5071EA', '#04BAFA']}
              style={styles.header}>
              <View
                style={{
                  flexDirection: 'row',
                  width: Dimensions.get('screen').width,
                }}>
                <View style={{width: '25%'}}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon
                      name="chevron-back"
                      type="ionicon"
                      color={'white'}
                      size={25}
                      style={{alignSelf: 'flex-start', marginTop: 3}}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{width: '50%'}}>
                  <Text
                    style={[
                      styles.headerHeading,
                      {color: 'white', marginTop: 3},
                    ]}>
                    My Profile
                  </Text>
                </View>
                <View style={{width: '25%'}}></View>
              </View>
            </LinearGradient>
          </>
        ) : (
          <>
            <Header
              statusBarProps={{barStyle: 'light-content'}}
              leftComponent={renderLeftComponent}
              centerComponent={renderCenterComponent}
              ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: ['#28A8CD', '#1B6AA5'],
              }}
              containerStyle={{
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
              backgroundColor="transparent"
            />
          </>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingBottom: 10}}>
            {/* input field for first name */}
            <Text
              style={[
                styles.h1,
                {color: '#ffffff', marginTop: 5, padding: 10},
              ]}>
              First Name
            </Text>
            <Input
              placeholderTextColor={'#6F6969'}
              value={first_name}
              placeholder="Enter Your First Name"
              returnKeyType="done"
              numberOfLines={1}
              blurOnSubmit={true}
              inputContainerStyle={{
                borderColor: 'transparent',
              }}
              style={{
                fontFamily: 'Poppins-SemiBold',
                top: 5,
                fontSize: RFValue(12, 580),
                color: '#6F6969',
              }}
              containerStyle={[
                styles.inputText,
                {borderRadius: 15, marginTop: 5},
              ]}
            />
            {/* input field for name */}
            <Text
              style={[
                styles.h1,
                {color: '#ffffff', marginTop: 5, padding: 10},
              ]}>
              Last Name
            </Text>
            <Input
              placeholderTextColor={'#6F6969'}
              value={last_name}
              onChangeText={e => {
                setName(e);
              }}
              placeholder="Enter Your Last Name"
              returnKeyType="done"
              numberOfLines={1}
              blurOnSubmit={true}
              inputContainerStyle={{
                borderColor: 'transparent',
              }}
              style={{
                fontFamily: 'Poppins-SemiBold',
                top: 5,
                fontSize: RFValue(12, 580),
                color: '#6F6969',
              }}
              containerStyle={[
                styles.inputText,
                {borderRadius: 15, marginTop: 5},
              ]}
            />
            {/* input field for email */}
            <Text
              style={[
                styles.h1,
                {color: '#ffffff', marginTop: 15, padding: 10},
              ]}>
              Email
            </Text>
            <Input
              placeholderTextColor={'#6F6969'}
              value={email}
              onChangeText={e => {
                setEmail(e);
              }}
              placeholder="Enter Your Email"
              returnKeyType="done"
              numberOfLines={1}
              blurOnSubmit={true}
              inputContainerStyle={{
                // width: Dimensions.get('window').width / 1.05,
                borderColor: 'transparent',
              }}
              style={{
                fontFamily: 'Poppins-SemiBold',
                top: 5,
                fontSize: RFValue(12, 580),
                color: '#6F6969',
              }}
              containerStyle={[
                styles.inputText,
                {borderRadius: 15, marginTop: 5},
              ]}
            />
            {/* input field for employee id */}
            <Text
              style={[
                styles.h1,
                {color: '#ffffff', marginTop: 15, padding: 10},
              ]}>
              Contact Number
            </Text>
            <Input
              placeholderTextColor={'#6F6969'}
              value={contact}
              onChangeText={e => {
                setContact(e);
              }}
              placeholder="Enter Your Contact Number"
              returnKeyType="done"
              maxLength={10}
              numberOfLines={1}
              blurOnSubmit={true}
              inputContainerStyle={{
                // width: Dimensions.get('window').width / 1.05,
                borderColor: 'transparent',
              }}
              style={{
                fontFamily: 'Poppins-SemiBold',
                top: 5,
                fontSize: RFValue(12, 580),
                color: '#6F6969',
              }}
              containerStyle={[
                styles.inputText,
                {borderRadius: 15, marginTop: 5},
              ]}
            />
            {/* button for dob */}
            <Text
              style={[
                styles.h1,
                {color: '#ffffff', marginTop: 15, padding: 10},
              ]}>
              Date Of Birth
            </Text>
            <Pressable
              onPress={() => showPicker()}
              style={[styles.inputText, {borderRadius: 15, marginTop: 5}]}>
              <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: RFValue(12, 580),
                    color: '#6F6969',
                    paddingTop: 10,
                  }}>
                  {dob}
                </Text>
              </View>
            </Pressable>
            {/* select dropdown for school name */}
            {/* <Text
              style={[
                styles.h1,
                {color: '#ffffff', marginTop: 15, padding: 10},
              ]}>
              School Name
            </Text>
            <View style={styles.textInputView}>
              <SelectDropdown
                buttonStyle={{
                  backgroundColor: 'white',
                  alignSelf: 'center',
                  marginTop: 10,
                  borderRadius: 15,
                  height: 50,
                  width: Dimensions.get('window').width / 1.1,
                  shadowColor: 'black',
                  shadowOffset: {height: 0, width: 2},
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 5,
                }}
                buttonTextStyle={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: RFValue(12, 580),
                  color: '#6F6969',
                  position: 'absolute',
                  right: 10,
                }}
                data={school_name}
                onSelect={(selectedSchool, index) => {
                  setSchool(selectedSchool);
                }}
                defaultButtonText={school}
                dropdownIconPosition="right"
                renderDropdownIcon={renderIcon}
                rowTextStyle={{
                  fontFamily: 'Poppins-Medium',
                  alignItems: 'flex-start',
                  position: 'absolute',
                  left: 0,
                  top: 12,
                }}
                dropdownStyle={{
                  alignContent: 'flex-start',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                }}
              />
            </View>

            {/* select dropdown for course name */}
            {/* <Text
              style={[
                styles.h1,
                {color: '#ffffff', marginTop: 15, padding: 10},
              ]}>
              Course Name
            </Text>
            <View style={styles.textInputView}>
              <SelectDropdown
                buttonStyle={{
                  backgroundColor: 'white',
                  alignSelf: 'center',
                  marginTop: 10,
                  borderRadius: 15,
                  height: 50,
                  width: Dimensions.get('window').width / 1.1,
                  shadowColor: 'black',
                  shadowOffset: {height: 0, width: 2},
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 5,
                }}
                buttonTextStyle={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: RFValue(12, 580),
                  color: '#6F6969',
                  position: 'absolute',
                  right: 10,
                }}
                data={course_name}
                onSelect={(selectedCourse, index) => {
                  setCourse(selectedCourse);
                }}
                defaultButtonText={course}
                dropdownIconPosition="right"
                renderDropdownIcon={renderIcon}
                rowTextStyle={{
                  fontFamily: 'Poppins-Medium',
                  alignItems: 'flex-start',
                  position: 'absolute',
                  left: 0,
                  top: 12,
                }}
                dropdownStyle={{
                  alignContent: 'flex-start',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                }}
              />
            </View>{' '} */}
            <LinearGradient
              colors={['#28A8CD', '#1B6AA5']}
              style={Signupstyle.button_external}>
              <Pressable
                onPress={() => {
                  logging_out();
                  // navigation.navigate('Signup');
                }}
                style={Signupstyle.button}>
                <Text style={Signupstyle.btn_text}>Logout</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  h1: {
    fontSize: Platform.OS == 'ios' ? RFValue(10, 580) : RFValue(11, 580),
    fontFamily: 'Poppins-Bold',
    color: '#28A8CD',
  },
  inputText: {
    width: Dimensions.get('window').width / 1.1,
    height: 50,
    alignSelf: 'center',
    borderRadius: 5,
    color: 'black',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pillButton: {
    width: Dimensions.get('window').width / 1.4,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },
  headerHeading: {
    fontSize: Platform.OS == 'ios' ? RFValue(13, 580) : RFValue(14, 580),
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  textInputView: {
    width: Dimensions.get('window').width / 1.1,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
  },
  textWhite: {
    color: 'white',
    fontSize: Platform.OS == 'ios' ? RFValue(13, 580) : RFValue(14, 580),
    fontFamily: 'Poppins-SemiBold',
  },
});

const win = Dimensions.get('window');
