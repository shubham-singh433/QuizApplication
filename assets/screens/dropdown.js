import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
//import AntDesign from '@expo/vector-icons/AntDesign';
import {Icon, CheckBox} from 'react-native-elements';

const DropdownComponent = ({getinfo}) => {

  const [college_id, setCollege_id] = useState('');
  const [course_id, setCourse_id] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [Courses, setCourses] = useState([]);

  

  const fetch_collegeName = () => {
    fetch(global.api + 'user/colleges/all', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        // console.warn(json)
        if (json.status) {
          setColleges(json.data);
          fetch_courses(json.data[0].id)

        } else {
          setColleges([]);
        }
      })
      .catch(error => {
        console.warn(error);
      })
      .finally(() => {
        // this.setState({isLoading: false});
      });
  };

  const fetch_courses = (id) => {
    // alert('hi')
    fetch(global.api + 'user/courses/all', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        college_id: id,
      }),
    })
      .then(response => response.json())
      .then(json => {
        // console.warn(json)
        if (json.status) {
          // alert('2nd api')
          setCourses(json.data);
        } else {
          setCourses([]);
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
    fetch_collegeName();
  }, []);

  return (
    <View >
      <Dropdown
        style={[
          styles.dropdown,
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={colleges}
        search
        maxHeight={300}
        labelField="college_name"
        valueField="id"
        placeholder={!isFocus ? 'Select College' : '...'}
        searchPlaceholder="Search..."
        // value={'GEHU'}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
        }}
        onChange={item => {
          console.warn(item)
          setCollege_id(item.id);
          setIsFocus(false);
          // alert(item.id)
          fetch_courses(item.id);
        }}
      />
      {/* {true ?alert(value):<></>} */}

      <Dropdown
        style={[
          styles.dropdown,
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={Courses}
        search
        maxHeight={300}
        labelField="course_name"
        valueField="id"
        placeholder={!isFocus2 ? 'Select courses' : '...'}
        searchPlaceholder="Search..."
        // value={value2}
        onFocus={() => setIsFocus2(true)}
        onBlur={() => {
          setIsFocus2(false);
        }}
        onChange={item => {
          // setValue2(item.course_name);
          setIsFocus2(false);
          setCourse_id(item.id);
          getinfo(college_id,course_id);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 10,
    height: 60,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 8,
    shadowColor: 'black',
    elevation: 3,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
