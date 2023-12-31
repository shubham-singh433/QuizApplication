import React, {useState, useEffect, useContext, startTransition} from 'react';
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

// import HorizontalFlatList from './Horizontalflatlist';
import {Signupstyle} from '../styles/Signupstyle';
import {Header, Icon} from 'react-native-elements';
// import VerticalFlatlist from './VerticalFlatlist';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../../AuthContextProvider';
import MyProfileScreen from './MyProfileScreen';
import Modal from 'react-native-modal';
import Verticalskeleton from './Verticalskeleton';
import Skeleton from './Skeleton';
import Quiz from './Quiz';
import TextTicker from 'react-native-text-ticker';
import {useNavigation} from '@react-navigation/native';

//home component
const Home = props => {
  const navigation = useNavigation();
  const {token} = useContext(AuthContext);
  const [name, changename] = useState('');
  const [quiz_list, setQuiz] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [quizLoader, setQuizLoader] = useState(true);
  const [selected_cat, setSelected] = useState('');
  const [selected_quiz, set_SelectedQuiz] = useState('');
  const [featured, setFeatured] = useState([]);
  const [show, changeShow] = useState(false);
  const [showDesc, changeDesc] = useState(false);
  const [instruction,setIns]=useState("");
  const [quiz_name,setQuizname]=useState('');
  

  //receive name from async storage
  const getData = async () => {
    try {
      const firstname = JSON.parse(await AsyncStorage.getItem('@name'));
      if (firstname !== null) {
        changename(firstname);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  //useeffect
  useEffect(() => {
    getData();
    fetch_subjects();
  }, []);

  //render left component
  const renderLeft = () => {
    return (
      <View style={Signupstyle.headerleft_divider}>
        <Text style={Signupstyle.header_text}>Welcome {name}</Text>
      </View>
    );
  };

  //render right component
  const renderRight = () => {
    return (
      <Pressable
        style={Signupstyle.headerright_divider}
        onPress={() => {
          {
            navigation.navigate('MyProfileScreen');
          }
        }}>
        <Icon name="person" type="ionicon" size={30} color={'white'} />
      </Pressable>
    );
  };

  const fetch_subjects = () => {
    fetch(global.api_key + 'user/course/subject', {
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
        if (json.status) {
          if (json.data.length > 0) {
            setFeatured(json.data);
            setSelected(json.data[0].id);
            fetch_quiz(json.data[0].id);
          }
        } else {
          setFeatured([]);
        }
      })
      .catch(error => {
        console.log('err', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetch_quiz = subject_id => {
    setQuizLoader(true);
    fetch(global.api_key + 'user/course/subject/quiz', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        college_subject_id: subject_id,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.status) {
          console.warn(json.data);
          setQuiz(json.data);
          setIns(json.data[0].quiz_instruction.instructions);
        } else {
          setQuiz([]);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setQuizLoader(false);
      });
  };

  const flatlistHorizontal = ({item}) => {
    return (
      <Pressable
        style={[
          Signupstyle.sub_btn,
          {
            marginBottom: 5,
            backgroundColor: selected_cat == item.id ? 'blue' : 'white',
          },
        ]}
        onPress={() => {
          fetch_quiz(item.id);
          setSelected(item.id);
        }}>
        <View>
          <TextTicker
            style={[
              Signupstyle.sub_text,
              {duration: 150, repeatSpacer: 50, marqueeDelay:0},
            ]}>
            {item.subject_name}
          </TextTicker>
        </View>
      </Pressable>
    );
  };

  const renderFlatlist = ({item}) => {
    return (
      <LinearGradient
        colors={['#28A8CD', '#1B6AA5']}
        style={{
          height: Dimensions.get('screen').height / 5,
          width: Dimensions.get('screen').width / 1.05,
          marginTop: 20,
          borderRadius: 20,
          alignSelf: 'center',
        }}>
        <View
          style={{
            height: Dimensions.get('screen').height / 5.5,
            width: Dimensions.get('screen').width / 1.1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: Dimensions.get('screen').width / 1.1,
              height: Dimensions.get('screen').height / 15,
              justifyContent: 'space-between',

              //   backgroundColor: 'red',
            }}>
            <View
              style={{
                height: Dimensions.get('screen').height / 15,
                width: Dimensions.get('screen').width / 1.8,
                // backgroundColor: 'green',
                justifyContent: 'center',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <View>
                <Icon
                  name="play-circle-outline"
                  type="ionicon"
                  size={30}
                  color={'white'}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: RFValue(18, 580),
                    fontFamily: 'Poppins-SemiBold',
                    color: 'white',
                  }}>
                  {item.subject_quiz_name}
                </Text>
              </View>
            </View>
            {/* timer icon */}
            <View
              style={{
                height: Dimensions.get('screen').height / 14,
                width: Dimensions.get('screen').width / 3.9,
                // backgroundColor: 'pink',
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'flex-start',
                // alignSelf: 'flex-end',
              }}>
              <View>
                <Icon
                  name="timer-outline"
                  type="ionicon"
                  size={20}
                  color={'white'}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: RFValue(14, 580),
                    fontFamily: 'Poppins-SemiBold',
                    color: 'white',
                  }}>
                  {'30 min'}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: Dimensions.get('screen').height / 13,
              width: Dimensions.get('screen').width / 1.2,
              paddingLeft: 8,
              // borderRadius: 20,
            }}>
            {item.quizdescription != null ? (
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: RFValue(13, 580),
                  fontFamily: 'Poppins-SemiBold',
                  color: 'white',
                }}>
                {item.quizdescription.quiz_description}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              height: Dimensions.get('screen').height / 22,
              width: Dimensions.get('screen').width / 1.2,
              //   backgroundColor: 'yellows',
              //   justifyContent: 'flex-end',
              alignSelf: 'center',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Pressable
              onPress={() => {
                set_SelectedQuiz(item.id);
                setQuizname(item.subject_quiz_name);
                changeShow(!show);
              }}
              style={{
                height: Dimensions.get('screen').height / 22,
                width: Dimensions.get('screen').width / 3.5,
                backgroundColor: '#CBE7FF',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: RFValue(14, 580),
                  fontFamily: 'Poppins-SemiBold',
                  color: '#1B6AA5',
                }}>
                Start Quiz
              </Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    );
  };
  const start_quiz = () => {
    fetch(global.api_key + 'users/quiz-starts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        subject_quiz_id: selected_quiz,
      }),
    })
      .then(response => response.json())

      .then(json => {
        console.warn(json);
        if (json.status) {
          alert(selected_cat);
          navigation.navigate('Quiz', {quiz_id: selected_quiz});
        } else {
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {});
  };

  //home component render
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
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={featured}
                    renderItem={flatlistHorizontal}
                    keyExtractor={item => item.id}
                    horizontal={true}
                  />
                )}
              </View>
              <View>
                {/* <VerticalFlatlist
                  data={quiz_list}
                  navigation={props.navigation}
                  isLoading={quizLoader}
                /> */}

                {isLoading ? (
                  <Verticalskeleton />
                ) : (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={quiz_list}
                    renderItem={renderFlatlist}
                    keyExtractor={item => item.id}
                    horizontal={false}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </>

        <Modal
          isVisible={show}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onBackdropPress={() => changeShow(!show)}>
          <View style={Signupstyle.centeredView}>
            <View style={Signupstyle.modalView}>
              <View
                style={{
                  width: Dimensions.get('screen').width / 1.1,
                  // justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <Pressable
                  onPress={() => {
                    changeShow(!show);
                  }}>
                  <Icon name="close-circle-outline" type="ionicon" size={35} />
                </Pressable>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: RFValue(15, 580),
                    fontFamily: 'Poppins-SemiBold',
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  Are you sure you want to start the Quiz
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginVertical:10,
                }}>
                <Pressable
                  onPress={() => {
                    changeShow(!show);
                    changeDesc(!showDesc);
                  }}
                  style={{
                    width: Dimensions.get('screen').width / 3.1,
                    height: Dimensions.get('screen').height / 18,
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: '#437E14',
                    opacity: 0.7,
                    justifyContent: 'center',
                    borderRadius: 25,
                    marginLeft: 10,
                    shadowColor: 'black',
                    elevation: 4,
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(17, 580),
                      fontFamily: 'Poppins-SemiBold',
                      color: 'white',
                    }}>
                    Yes
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    changeShow(!show);
                  }}
                  style={{
                    width: Dimensions.get('screen').width / 3.1,
                    height: Dimensions.get('screen').height / 18,
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F83030',
                    opacity: 0.7,
                    justifyContent: 'center',
                    borderRadius: 25,
                    marginLeft: 10,
                    shadowColor: 'black',
                    elevation: 4,
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(17, 580),
                      fontFamily: 'Poppins-SemiBold',
                      color: 'white',
                    }}>
                    No
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={showDesc}
          animationType="fade"
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onBackdropPress={() => changeShow(!showDesc)}>
          <View style={Signupstyle.centeredView}>
            <View style={Signupstyle.modalView}>
              <View
                style={{
                  width: Dimensions.get('screen').width / 1.1,
                  // justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <Pressable
                  onPress={() => {
                    changeDesc(!showDesc);
                  }}>
                  <Icon name="close-circle-outline" type="ionicon" size={35} />
                </Pressable>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: Dimensions.get('screen').width / 1.1,
                  height: Dimensions.get('screen').height / 15,
                  justifyContent: 'space-between',
                  // backgroundColor: 'red',
                }}>
                <View
                  style={{
                    height: Dimensions.get('screen').height / 15,
                    width: Dimensions.get('screen').width / 1.8,
                    // backgroundColor: 'green',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Icon
                      name="play-circle-outline"
                      type="ionicon"
                      size={35}
                      color={'black'}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: RFValue(18, 580),
                        fontFamily: 'Poppins-Bold',
                        color: 'black',
                      }}>
                       {quiz_name}
                      </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: Dimensions.get('screen').height / 15,
                    width: Dimensions.get('screen').width / 2.8,
                    // backgroundColor: 'green',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Icon
                      name="timer-outline"
                      type="ionicon"
                      size={30}
                      color={'black'}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: RFValue(14, 580),
                        fontFamily: 'Poppins-SemiBold',
                        color: 'black',
                      }}>
                      {'30 min'}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: RFValue(15, 580),
                    fontFamily: 'Poppins-SemiBold',
                    color: 'black',
                    textAlign: 'left',
                  }}>
                  Instructions
                </Text>
              </View>
              <Text
                style={{
                  fontSize: RFValue(13, 580),
                  fontFamily: 'Poppins-regular',
                  color: 'black',
                  textAlign: 'left',
                  justifyContent: 'space-evenly',
                }}>
                <View>
                  <Icon
                    name="ellipse"
                    type="ionicon"
                    size={8}
                    color={'black'}
                  />
                </View>
                {instruction?(instruction):("Once you have answered all of the questions in the quiz, select Finish attempt")} 
              </Text>
              <Pressable
                onPress={() => {
                  start_quiz();
                  changeDesc(!showDesc);
                }}
                style={{
                  width: Dimensions.get('screen').width / 3.2,
                  height: Dimensions.get('screen').height / 19,
                  alignSelf: 'center',
                  alignItems: 'center',
                  backgroundColor: '#1B6AA5',
                  // opacity: '2',
                  opacity: 0.8,
                  justifyContent: 'center',
                  borderRadius: 5,
                  marginLeft: 10,
                  shadowColor: 'black',
                  elevation: 4,
                }}>
                <Text
                  style={{
                    fontSize: RFValue(17, 580),
                    fontFamily: 'Poppins-SemiBold',
                    color: 'white',
                  }}>
                  Start
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Home;

