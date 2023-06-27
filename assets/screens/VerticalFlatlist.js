import React, {useState, useEffect, useContext} from 'react';
import {FlatList, View, Image, Dimensions, Text, Pressable} from 'react-native';
import {Signupstyle} from '../styles/Signupstyle';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {AuthContext} from '../../AuthContextProvider';
import Verticalskeleton from './Verticalskeleton';
// import {color} from 'react-native-elements/dist/helpers';

const VerticalFlatlist = () => {
  const {token, subject_id, setId} = useContext(AuthContext);
  const [quiz_list, setQuiz] = useState([]);
  const [show, changeShow] = useState(false);
  const [showDesc, changeDesc] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const fetch_quiz = (token, subject_id) => {
    // console.warn(' subject_id', subject_id);
    setLoading(true);
    // console.warn('toekns received at vertical flatlist', token);
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
        // console.warn('quizdata', json.data);
        if (json.status) {
          if (json.data.length > 0) {
            setQuiz(json.data);

            // console.warn('kya bolti tu', quiz_list);
          }
          // console.warn('features state', featured);
        } else {
          setQuiz([]);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch_quiz(token, subject_id);
  }, []);

  const renderFlatlist = ({item}) => {
    return (
      <LinearGradient
        colors={['#5071EA', '#04BAFA']}
        style={{
          height: Dimensions.get('screen').height / 5,
          width: Dimensions.get('screen').width / 1.05,
          marginTop: 20,
          borderRadius: 20,
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
            <Text
              style={{
                textAlign: 'left',
                fontSize: RFValue(13, 580),
                fontFamily: 'Poppins-SemiBold',
                color: 'white',
              }}>
              {item.quizdescription.quiz_description}
            </Text>
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
  const start_quiz=(token,subject_id)=>{
      fetch(global.api_key + 'users/quiz-starts', {
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
          // console.warn('quizdata', json.data);
          if (json.status) {
           
            // console.warn('features state', featured);
          } else {
            
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          
        });


  }

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        marginHorizontal: '2%',
        // height: Dimensions.get('screen').height / 10,
        justifyContent: 'center',
        // backgroundColor: 'green',
      }}>
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
                    {/* {quiz_list[0].subject_quiz_name} */}
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
                <Icon name="ellipse" type="ionicon" size={8} color={'black'} />
              </View>
              {/* {quiz_list[0].quiz_instruction
                ? quiz_list[0].quiz_instruction.instructions
                : ' Once you have answered all of the questions in the quiz, select “Finish attempt. '} */}
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
  );
};
export default VerticalFlatlist;
