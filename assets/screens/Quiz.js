import React, {useState,useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {Styler} from './RegistrationCSS';
import LinearGradient from 'react-native-linear-gradient';
// import {CheckBox} from 'react-native-elements';
import {Icon, CheckBox} from 'react-native-elements';
import CountDown from 'react-native-countdown-component';

const DATA = [
  {title: 'hello'},
  {title: 'hi'},
  {title: 'namaste'},
  {title: 'hey'},
];

const Quiz = ({navigation}) => {

  const [count, setCount] = useState(1);
  const [Optional, setOptional] = useState(false);

  // const [Question,setQuestion]=useState(null);

  // useEffect(() => {
  //   fetchQuestion();
  // }, []);

  // const fetchQuestion = () => {
  //   // alert('hi')
  //   fetch(global.api + 'users/fetch-particular-question', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       question_id :'4', 
  //       subject_quiz_id : '2',
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(json => {
  //       // alert('hi');
  //       console.warn(json)
  //       if (json.status) {
  //         // alert('2nd api');
  //         setQuestion(json.data);
  //       } else {
  //         setQuestion([]);
  //       }
  //     })
  //     .catch(error => {
  //       console.warn(error);
  //     })
  //     .finally(() => {
  //       // this.setState({isLoading: false});
  //     });
  // };

  const renderOptions = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          //   borderWidth: 1,
          marginBottom: 15,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 10,
          shadowColor: 'black',
          elevation: 3,
          backgroundColor: 'white',
        }}>
        <CheckBox
          checked={count === 0}
          onPress={() => setCount(0)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
        />
        <Text style={{fontSize: 23, alignSelf: 'center'}}>{item.title}</Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#28A8CD', '#1B6AA5']}
        style={[Styler.linearGradient, {marginBottom: '45%'}]}></LinearGradient>
      <CountDown
        size={20}
        until={60}
        style={{
          alignSelf: 'flex-end',
          position: 'absolute',
          top: 10,
          right: 15,
        }}
        digitStyle={{}}
        // onFinish={() => this.setState({status: true})}
        digitTxtStyle={{color: '#fff'}}
        // timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      />
      <View style={Styler.QuestionBox}>
        <Text
          style={{
            color: '#28A8CD',
            fontSize: 20,
            alignSelf: 'center',
            marginBottom: 20,
            fontWeight: '500',
          }}>
          Question<Text style={{fontWeight: '700'}}> 20/100 </Text>
        </Text>
        <Text style={{fontSize: 20, color: 'black', textAlign: 'center'}}>
          {/* {Question.question_name} */}In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
        </Text>
      </View>
      {Optional == true ? (
        <ScrollView>
          <TextInput
            style={Styler.InputBox2}
            placeholder="write answer here...."
            editable={true}
            multiline={true}
            numberOfLines={4}
          />
        </ScrollView>
      ) : (
        <FlatList
          data={DATA}
          renderItem={renderOptions}
          keyExtractor={item => item.id}
          numColumns={1}
        />
      )}

      <View
        style={{
          flexDirection: 'row',
          //   width: Dimensions.get('screen').width / 1,
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity>
          <LinearGradient
            colors={['#28A8CD', '#1B6AA5']}
            style={{
              backgroundColor: '#1B6AA5',
              height: 40,
              width: 120,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginVertical: 30,
            }}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>
              Prev
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('checksheet')}
          style={{
            backgroundColor: 'white',
            height: 40,
            width: 120,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginVertical: 30,
            shadowColor: 'black',
            elevation: 2,
          }}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: '500'}}>
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient
            colors={['#28A8CD', '#1B6AA5']}
            style={{
              backgroundColor: '#1B6AA5',
              height: 40,
              width: 120,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginVertical: 30,
            }}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>
              Submit
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Quiz;
