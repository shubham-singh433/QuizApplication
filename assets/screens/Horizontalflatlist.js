import React, {Component, useState, useEffect, useContext} from 'react';
import {
  FlatList,
  View,
  Image,
  Dimensions,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Signupstyle} from '../styles/Signupstyle';
// import skeleton from './skeleton';
import {RFValue} from 'react-native-responsive-fontsize';
import {AuthContext} from '../../AuthContextProvider';
// import skeleton from './skeleton';

// const [Data, setData] = useState([]);
const HorizontalFlatList = () => {
  const {token} = useContext(AuthContext);
  const flatlistHorizontal = ({item}) => {
    return (
      <Pressable style={Signupstyle.sub_btn}>
        <View>
          <Text style={Signupstyle.sub_text}>{item.subject_name}</Text>
        </View>
      </Pressable>
    );
  };
  const [featured, setFeatured] = useState([]);
  const [isloading, setLoading] = useState(false);

  const fetch_subjects = token => {
    setLoading(true);
    console.warn(isloading);
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
        console.warn(json);
        if (json.status) {
          if (json.data.length > 0) {
            setFeatured(json.data);
          } else {
            setFeatured([]);
          }
          console.warn('features state', featured);
        } else {
          setFeatured([]);
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
    fetch_subjects(token);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        // marginHorizontal: '4%',
        alignSelf: 'center',
        height: Dimensions.get('screen').height / 10,
        width: Dimensions.get('screen').width / 1.1,
        justifyContent: 'center',
        // backgroundColor: 'green',
      }}>
      {isloading ? (
        // <skeleton />
        <></>
      ) : (
        // <ActivityIndicator size={'large'} color="red" />
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={featured}
          renderItem={flatlistHorizontal}
          keyExtractor={item => item.id}
          horizontal={true}
        />
      )}
    </View>
  );
};
export default HorizontalFlatList;
