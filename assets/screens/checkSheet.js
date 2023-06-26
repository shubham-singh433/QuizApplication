import React, {useState} from 'react';
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
import {Icon, CheckBox} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const DATA = [
    {id: '1',color:'green'},
    {id: '2',color:'red'},
    {id: '3',color:'green'},
    {id: '4',color:'#E5E4E2'},
    {id: '5',color:'green'},
    {id: '6',color:'#E5E4E2'},
    {id: '7',color:'#E5E4E2'},
    {id: '8',color:'green'},
    {id: '9',color:'#E5E4E2'},
    {id: '10',color:'#E5E4E2'},
    {id: '12',color:'red'},
    {id: '13',color:'green'},
    {id: '14',color:'green'},
    {id: '15',color:'green'},
    {id: '16',color:'green'},
    {id: '17',color:'green'},
    {id: '18',color:'green'},
    {id: '19',color:'green'},
    {id: '20',color:'green'},
    {id: '21',color:'green'},
    {id: '22',color:'red'},
    {id: '23',color:'green'},
    {id: '24',color:'red'},
    {id: '25',color:'green'},
    {id: '26',color:'red'},
    {id: '27',color:'#E5E4E2'},
    {id: '28',color:'#E5E4E2'},
    {id: '29',color:'red'},
    {id: '30',color:'green'},
    {id: '31',color:'red'},
    {id: '32',color:'red'},
    {id: '33',color:'green'},
    {id: '34',color:'#E5E4E2'},
    {id: '35',color:'green'},
    {id: '36',color:'green'},
    {id: '37',color:'green'},
    {id: '38',color:'green'},
    {id: '39',color:'green'},
    {id: '40',color:'green'},
    {id: '41',color:'#E5E4E2'},
  ];

const CheckSheet=({navigation})=>{

    const renderOptions = ({item}) => {
        return (
          <View
            style={{height:60,width:60,borderRadius:50,backgroundColor:item.color,alignItems:'center',justifyContent:'center',marginHorizontal:10,marginBottom:15
            }}>
            <Text style={{color:'black',fontSize:25,fontWeight:'700'}}>{item.id}</Text>
          </View>
        );
      };

    return(
        <View style={{flex:1}}>
         <LinearGradient
          colors={['#28A8CD', '#1B6AA5']}
          style={{height:50,backgroundColor:'skyblue',borderBottomLeftRadius:10,borderBottomRightRadius:10,marginBottom:20}}>
         </LinearGradient>
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon name="ellipse" type="ionicon" size={20} color="red"/>
                <Text style={{fontWeight:'700',color:'black',fontSize:20}}>wrong</Text>
            </View>
            <View style={{flexDirection:'row',flexDirection:'row',alignItems:'center'}}>
                <Icon name="ellipse" type="ionicon" size={20} color="green"/>
                <Text style={{fontWeight:'700',color:'black',fontSize:20}}>correct</Text>
            </View>
            <View style={{flexDirection:'row',flexDirection:'row',alignItems:'center'}}>
                <Icon name="ellipse" type="ionicon" size={20} color="grey"/>
                <Text style={{fontWeight:'700',color:'black',fontSize:18}}>unattempted</Text>
            </View>
          </View>
          <View style={{marginTop:30,paddingLeft:6,marginBottom:20}}>
          <FlatList
          data={DATA}
          renderItem={renderOptions}
          keyExtractor={item => item.id}
          numColumns={5}
          />
          </View>

          <TouchableOpacity onPress={()=>navigation.navigate('res')}>
          <LinearGradient
            colors={['#28A8CD', '#1B6AA5']}
            style={{
              backgroundColor: '#1B6AA5',
              height:50,
              width: 200,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              marginVertical:10,
            }}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}} >
              Proceed
            </Text>
          </LinearGradient>
          </TouchableOpacity>
          
        </View>

    );
}

export default CheckSheet;