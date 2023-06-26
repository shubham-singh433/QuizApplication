import React, {useRef} from 'react';
import {Animated, Dimensions, Easing, StyleSheet, View} from 'react-native';

const {width, height} = Dimensions.get('window');
const circleSize = width / 2;
const Apk = () => {
  const move = useRef(new Animated.Value(0)).current;
  const breathIn = Easing.out(Easing.sin);
  const breathOut = Easing.in(Easing.sin);
  Animated.loop(
    Animated.sequence([
      Animated.timing(move, {
        toValue: 1,
        duration: 5000,
        easing: breathIn,
        useNativeDriver: true,
      }),
      Animated.timing(move, {
        toValue: 2,
        duration: 3000,
        easing: breathOut,
        useNativeDriver: true,
      }),
      Animated.timing(move, {
        toValue: 0.0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]),
  ).start();
  const translate = move.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, circleSize / 6, 0],
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          ...StyleSheet.absoluteFill,
          opacity: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'blue',
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
          }}
        />
      </View>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
        const rotation = move.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [
            `${item * 45}deg`, //
            `${item * 45 + 180}deg`,
            `${item * 45 + 360}deg`,
          ],
        });
        return (
          <View
            key={item}
            style={{
              ...StyleSheet.absoluteFill,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Animated.View
              style={{
                opacity: 0.12,
                backgroundColor: 'black',
                width: circleSize,
                height: circleSize,
                borderRadius: circleSize / 2,
                transform: [
                  {
                    rotateZ: rotation,
                  },
                  {translateX: translate},
                  {translateY: translate},
                ],
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Apk;