import React,{useState}  from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Animated,Easing
} from 'react-native';
import {Styler} from './RegistrationCSS';
import LinearGradient from 'react-native-linear-gradient';
// import {CheckBox} from 'react-native-elements';
import {Icon, CheckBox} from 'react-native-elements';
// import CountDown from 'react-native-countdown-component';


const Result = () => {
  const [scaleValue] = useState(new Animated.Value(1))

  const BreatheAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ]).start(() => BreatheAnimation());
  };

  React.useEffect(() => {
    BreatheAnimation();
  }, []);

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#28A8CD', '#1B6AA5']}
        style={[
          Styler.linearGradient1,
          {marginBottom: '45%'},
        ]}></LinearGradient>
      <Animated.View
        style={{
          height: 190,
          width: 190,
          borderRadius: 190/2,
          transform: [
            {
              scale: scaleValue
            }],
          top: 45,
          backgroundColor: '#52A9CD',
          position: 'absolute',
          alignSelf: 'center',
        }}></Animated.View>
      <Animated.View
        style={{
          height: 140,
          width: 140,
          borderRadius: 140/2,
          transform: [
            {
              scale: scaleValue
            }],
          top: 70,
          backgroundColor: '#76B7D4',
          position: 'absolute',
          alignSelf: 'center',
        }}></Animated.View>
      <Animated.View
        style={{
          height: 125,
          width: 125,
          borderRadius: 125/2,
          top: 77,
          backgroundColor: '#B4D6E7',
          position: 'absolute',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#1B6AA5',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '800',
          }}>
          Your score is
        </Text>
        <Text
          style={{
            fontSize:30,
            color: '#1B6AA5',
            textAlign: 'center',
            // fontSize: 18,
            fontWeight: '800',
          }}>
          10/10
        </Text>
      </Animated.View>
      <View style={Styler.Box1}>
        <View style={{flexDirection: 'row', width: '100%', height: '50%'}}>
          <View style={{flexDirection: 'row', width: '50%'}}>
            <View style={{paddingTop: 5}}>
              <Icon name="ellipse" type="ionicon" size={25} color="#1B6AA5" />
            </View>
            <View>
              <Text style={{color: '#1B6AA5', fontWeight: '700', fontSize: 25}}>
                100%{' '}
              </Text>
              <Text style={Styler.resultText}>completion</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingTop: 5}}>
              <Icon name="ellipse" type="ionicon" size={25} color="#1B6AA5" />
            </View>
            <View>
              <Text style={{color: '#1B6AA5', fontWeight: '700', fontSize: 25}}>
                100{' '}
              </Text>
              <Text style={Styler.resultText}>Total Question</Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row', width: '100%', height: '50%'}}>
          <View style={{flexDirection: 'row', width: '50%'}}>
            <View style={{paddingTop: 5}}>
              <Icon name="ellipse" type="ionicon" size={25} color="red" />
            </View>
            <View>
              <Text style={{color: 'red', fontWeight: '700', fontSize: 25}}>
                0%
              </Text>
              <Text style={Styler.resultText}>Wrong</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingTop: 5}}>
              <Icon name="ellipse" type="ionicon" size={25} color="green" />
            </View>
            <View>
              <Text style={{color: 'green', fontWeight: '700', fontSize: 25}}>
                100%{' '}
              </Text>
              <Text style={Styler.resultText}>correct</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity>
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
            marginTop: 60,
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>
            Complete
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Result;
