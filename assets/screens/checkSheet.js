import React, {useState,useEffect} from 'react';
import Modal from 'react-native-modal';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Styler} from '../styles/RegistrationCSS';
import {Icon, CheckBox} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
// import ModalTester from './Modal';

// const DATA = [
//   {id: '1', color: 'green'},
//   {id: '2', color: 'red'},
//   {id: '3', color: 'green'},
//   {id: '4', color: '#E5E4E2'},
//   {id: '5', color: 'green'},
//   {id: '6', color: '#E5E4E2'},
//   {id: '7', color: '#E5E4E2'},
//   {id: '8', color: 'green'},
//   {id: '9', color: '#E5E4E2'},
//   {id: '10', color: '#E5E4E2'},
//   {id: '12', color: 'red'},
//   {id: '13', color: 'green'},
//   {id: '14', color: 'green'},
//   {id: '15', color: 'green'},
//   {id: '16', color: 'green'},
//   {id: '17', color: 'green'},
//   {id: '18', color: 'green'},
//   {id: '19', color: 'green'},
//   {id: '20', color: 'green'},
//   {id: '21', color: 'green'},
//   {id: '22', color: 'red'},
//   {id: '23', color: 'green'},
//   {id: '24', color: 'red'},
//   {id: '25', color: 'green'},
//   {id: '26', color: 'red'},
//   {id: '27', color: '#E5E4E2'},
//   {id: '28', color: '#E5E4E2'},
//   {id: '29', color: 'red'},
//   {id: '30', color: 'green'},
//   {id: '31', color: 'red'},
//   {id: '32', color: 'red'},
//   {id: '33', color: 'green'},
//   {id: '34', color: '#E5E4E2'},
//   {id: '35', color: 'green'},
//   {id: '36', color: 'green'},
//   {id: '37', color: 'green'},
//   {id: '38', color: 'green'},
//   {id: '39', color: 'green'},
//   {id: '40', color: 'green'},
//   {id: '41', color: '#E5E4E2'},
// ];

const CheckSheet = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [questionType, setQuestionType] = useState('abc');
  const [Option, setOption] = useState(['hello', 'hi', 'ok', 'bye']);
  const [Questions, setQuestions] = useState([]);
  
  useEffect(() => {
    getResult();
  }, []);

  //result 
  
  const getResult = () => {
    // alert('hi')
    // alert(question.id);
    // alert(question.subject_quiz_id);
    // alert(question.question_type);
    fetch(global.api + 'fetch-result', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYmNiZTYxNjdiNGY0ZTY3YWQ5YTI2NzliYTZlYzJhNGFiYjBkYTY2Nzg2NDk1NDJjZWNhZWQyNjdkZjk1MjIxODY0OTdiY2EyMTE5NjZlMmIiLCJpYXQiOjE2ODc4NDYxNTguMzAwMzE5LCJuYmYiOjE2ODc4NDYxNTguMzAwMzIzLCJleHAiOjE3MDM2NTczNTguMjkzMTYyLCJzdWIiOiI0MyIsInNjb3BlcyI6W119.kVUAx2fTvlWrq_BrQsAYr2-D_JinO3AcWjfTlbcOdp-3jf2FHp-wWVpWYjvlA1avz29hLrUjkPj8lfjQfYGhBaVb495AG0ObIPAUumz8GmRfIicR1X06mJSB2IMcF7JqfX8d3sh7EQaK-75EiKCIXY6JLs2FUkSPnh1h5136xCsRPCMsXjaytjfBjp6Fbg5JADZAdtf-XhKj3Vx4ovpiwrWxJpUBlt-0PiU7B-10xXvwJvhBbJ5_Yutooq1VrccPejqIRR5oX0iwCt1Yci6vrYoSU2lMhti1C9MqP9x2M-U7FsMq--qjKTvhiXT-gmwFHCouOgCaEBWzx0XjYuSkC77YekfVTe6F_M3TJ15alKhThWZMRwu5QpGXInTfvfB0bYY-q3DstEw-EmMw4lZ5mRDTRVWGEIm81no1rYEu9SWd1FfG8xbciw9rR4bjJd18pfV5fS41wFcBhpUH-bNztj7gb7SxamTPgzWwxeZOyyWNBAjn8MlTsIkTs9sLd6NkbXMPm6wIU-9Ekfvc9uhCFQjuj_FD-EMBT897Xs82Jt7c_Hbiqcl06m_3idGTrDzadMxfJyMv_JLt5T-SQKZ7AiYqkJrnJFnynyxghKp_ZTnfnr-oQtzFbpMGAKWvVuU4r1fyxQQKLAg1PljRyzQ7JMjKtL1USbgjFRrDkG1legw',
      },
      body: JSON.stringify({
        "subject_quiz_id" : "6",
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.warn(json)
        // console.warn(json.status);
        if (json.status) {
          // alert('hihgjgjhg');
          setQuestions(json.data);
          console.warn(json.data);
      }})
      .catch(error => {
        console.warn(error);
      })
      .finally(() => {}
      )}
      
        // this.setState({isLoading: false});Result

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderOptions = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => toggleModal()}
        style={{
          height: 60,
          width: 60,
          borderRadius: 50,
          backgroundColor: item.no_attempt!=1?(item.correct==1?('green'):('red')):('gray'),
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 10,
          marginBottom: 15,
        }}>
        <Text style={{color: 'black', fontSize: 15, fontWeight: '700'}}>
          {item.question_id}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#28A8CD', '#1B6AA5']}
        style={{
          height: 50,
          backgroundColor: 'skyblue',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          marginBottom: 20,
        }}></LinearGradient>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="ellipse" type="ionicon" size={20} color="red" />
          <Text style={{fontWeight: '700', color: 'black', fontSize: 20}}>
            wrong
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name="ellipse" type="ionicon" size={20} color="green" />
          <Text style={{fontWeight: '700', color: 'black', fontSize: 20}}>
            correct
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name="ellipse" type="ionicon" size={20} color="grey" />
          <Text style={{fontWeight: '700', color: 'black', fontSize: 18}}>
            unattempted
          </Text>
        </View>
      </View>
      <View style={{marginTop: 30, paddingLeft: 6, marginBottom: 20}}>
        <FlatList
          data={Questions}
          renderItem={renderOptions}
          keyExtractor={item => item.id}
          numColumns={5}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('res')}>
        <LinearGradient
          colors={['#28A8CD', '#1B6AA5']}
          style={{
            backgroundColor: '#1B6AA5',
            height: 50,
            width: 200,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            marginVertical: 10,
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>
            Proceed
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View
          style={{
            flex: 0.7,
            backgroundColor: 'white',
            borderRadius: 5,
            width: '100%',
            padding: 15,
          }}>
          <TouchableOpacity
            style={{width: 30, alignSelf: 'flex-end'}}
            onPress={toggleModal}>
            <Icon name="close-circle-outline" type="ionicon" size={25} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              marginBottom: 10,
            }}>
            <View style={{paddingTop: 3}}>
              <Text style={{fontSize: 15}}>2.</Text>
            </View>
            <View style={{width: '90%'}}>
              <Text style={{fontSize: 19}}>
                A car is a means of transport used for traveling from one place
                to another. This is a four-wheeler used by individuals or family
                members. We all use cars in our daily lives to go from one place
                to another for work. A car is a beautiful vehicle that has
                comfortable seats, AC, and windows.
              </Text>
            </View>
          </View>
          { questionType!='abc' ? (
            <View style={{width: '83%', alignSelf: 'center'}}>
              <View style={Styler2.option}>
                <Text style={Styler2.txt}>{Option[0]}</Text>
              </View>
              <View style={Styler2.option}>
                <Text>{Option[1]}</Text>
              </View>
              <View style={Styler2.option}>
                <Text>{Option[2]}</Text>
              </View>
              <View style={Styler2.option}>
                <Text>{Option[3]}</Text>
              </View>
            </View>
          ) : (
            <View style={{width: '85%', alignSelf: 'center',borderRadius:5,borderWidth:1,height:'45%',padding:5,}}>
              <Text style={{fontSize: 18,color:'black'}}>
                We all use cars in our daily lives to go from one place to
                another for work. A car is a beautiful vehicle that has
                comfortable seats, AC, and windows.
              </Text>
            </View>
          )}

          {/* <Button title="Hide modal" /> */}
        </View>
      </Modal>
    </View>
  );
};

export default CheckSheet;

const Styler2 = StyleSheet.create({
  option: {
    // borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: 'black',
    borderRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
});
