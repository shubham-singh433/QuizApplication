import { StyleSheet,Dimensions } from "react-native";

const  Styler= StyleSheet.create(
    {
        font:{
            color:'#1B6AA5',
            fontSize: 25,
            fontWeight:'600',
            marginVertical:'6%',
            alignSelf:'center'
        },
        logo:{
            height:100,
            width:250,
        },
        linearGradient: {
            height:Dimensions.get('screen').height/5,
            justifyContent:'center',
            alignItems:'center',
            borderBottomLeftRadius:100,
            borderBottomRightRadius:100,
            // borderWidth:2
          },
        InputBox:{
            // borderWidth:1,
            paddingHorizontal:10,
            justifyContent:'center',
            borderRadius:10,
            height:60,
            width:'90%',
            alignSelf:'center',
            marginVertical:8,
            shadowColor:'black',
            elevation:3,
            shadowRadius:5,
            shadowOpacity:0.5,
            backgroundColor:"#fff"           
          },
          QuestionBox:{
            height:230,
            width:'90%',
            backgroundColor:'white',
            alignSelf:'center',
            borderRadius:15,
            position:'absolute',
            top:70,
            shadowColor:'black',
            elevation:5,
            padding:10
          },
          InputBox2:{
            height:230,
            width:'90%',
            backgroundColor:'white',
            alignSelf:'center',
            borderRadius:15,
            shadowColor:'black',
            elevation:5,
            textAlignVertical:'top',
            fontSize:20,
            paddingHorizontal:10,
            marginBottom:10,
          },
          linearGradient1: {
            height:Dimensions.get('screen').height/2.5,
            justifyContent:'center',
            alignItems:'center',
            borderBottomLeftRadius:70,
            borderBottomRightRadius:70,
            // borderWidth:2
          },
          Box:{
            height:230,
            width:'90%',
            backgroundColor:'white',
            alignSelf:'center',
            borderRadius:15,
            position:'absolute',
            top:280,
            shadowColor:'black',
            elevation:5,
            padding:10
          },
          Box1:{
            height:190,
            width:'90%',
            backgroundColor:'white',
            alignSelf:'center',
            borderRadius:15,
            position:'absolute',
            top:280,
            shadowColor:'black',
            elevation:5,
            paddingVertical:20,paddingHorizontal:15
          },
          resultText:{
            fontSize:20,
            fontWeight:'700',

          }



    }
)

export {Styler};