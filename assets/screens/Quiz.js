import React, {useState, useEffect,useContext} from 'react';
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
import {Styler} from '../styles/RegistrationCSS';
import LinearGradient from 'react-native-linear-gradient';
import {Icon, CheckBox} from 'react-native-elements';
import CountDown from 'react-native-countdown-component';
import {AuthContext} from '../../AuthContextProvider';
import {useNavigation} from '@react-navigation/native';


const Quiz = props => {
 const navigation = useNavigation();
 const selected_quiz = props.route.params.quiz_id;
    const {token} = useContext(AuthContext);
  const [count, setCount] = useState(0);
  const [question, setQuestion] = useState([]);
  const [options, setOptions] = useState([]);
  const [Total, setTotal] = useState([]);
  

  const getQuestion = () => {
    fetch(global.api_key + 'users/fetch-first-question', {
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
        if (json.status) {
          // alert(json.status)
          setQuestion(json.data[0]);
          setTotal(json.count);
          setOptions(json.data[0].quiz_answers[0]);

          // console.warn(Total);
          // console.warn(options);
        } else {
          // setCourses([]);
        }
      })
      .catch(error => {
        console.warn(error);
      })
      .finally(() => {
        // this.setState({isLoading: false});
      });
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const getNextQuestion = () => {
    // alert(question.id);
    // alert(question.subject_quiz_id);
    // alert(question.question_type);
    fetch(global.api_key + 'users/fetch-next-question', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:token
      },
      body: JSON.stringify({
        option_id: count,
        question_id: question.id,
        subject_quiz_id: question.subject_quiz_id,
        question_type: question.question_type,
      }),
    })
      .then(response => response.json())
      .then(json => {
        // console.warn(json);
        // alert(count);
        setCount('');
        if (json.status) {
          // alert('hi');
          // if()
          setQuestion(json.data[0]);
          setTotal(json.count);
          if (question.question_type == 'Objective')
            setOptions(json.data[0].quiz_answers[0]);
        } else {
          // setCourses([]);
        }
      })
      .catch(error => {
        console.warn(error);
      })
      .finally(() => {
        // this.setState({isLoading: false});
      });
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
        <View style={{paddingTop: 10}}>
          <Text
            style={{
              color: '#28A8CD',
              fontSize: 20,
              alignSelf: 'center',
              marginBottom: 20,
              fontWeight: '500',
            }}>
            Question
            <Text style={{fontWeight: '700'}}>
              {question.question_number}/{Total}
            </Text>
          </Text>
        </View>
        <View style={{height: '75%', justifyContent: 'center'}}>
          <Text style={{fontSize: 20, color: 'black', textAlign: 'center'}}>
            {question.question_name}
          </Text>
        </View>
      </View>
      {question.question_type == 'Descriptive' ? (
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
        <>
          <View style={Styler.Mcq}>
            <CheckBox
              checked={count === 1}
              onPress={() => setCount(1)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <Text style={{fontSize: 23, alignSelf: 'center'}}>
              {options.option1}
            </Text>
          </View>

          <View style={Styler.Mcq}>
            <CheckBox
              checked={count === 2}
              onPress={() => setCount(2)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <Text style={{fontSize: 23, alignSelf: 'center'}}>
              {options.option2}
            </Text>
          </View>

          <View style={Styler.Mcq}>
            <CheckBox
              checked={count === 3}
              onPress={() => setCount(3)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <Text style={{fontSize: 23, alignSelf: 'center'}}>
              {options.option3}
            </Text>
          </View>

          <View style={Styler.Mcq}>
            <CheckBox
              checked={count === 4}
              onPress={() => setCount(4)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <Text style={{fontSize: 23, alignSelf: 'center'}}>
              {options.option4}
            </Text>
          </View>
        </>
      )}

      <View
        style={{
          flexDirection: 'row',
          //   width: Dimensions.get('screen').width / 1,
          justifyContent: 'space-around',
          marginTop: 80,
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
        <TouchableOpacity
          onPress={() => {
            if (question.question_number < Total) {
              // alert('hi');
              getNextQuestion();
            }
            else {
              setQuestion([]);
              setOptions([]);
              setTotal('');
              navigation.navigate('checksheet');
            }
          }}>
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
