


import React , {Component, version} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, ImageBackground, Animated } from 'react-native';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


import { GlobalScreenState,HomeScreenState,MapScreenState,SettingScreenState } from "../../../../../SharedNavigationState.native";


export default class StatusBar extends Component{

  constructor(props){
    super(props);
    this.animatedValueOpacityDefaultValue = 0.0;
    this.animatedValueOpacity = new Animated.Value(0.0);

  }

  componentDidMount(){
    Animated.timing(this.animatedValueOpacity,{
      toValue:1.0,
      duration:3000,
      useNativeDriver: true,
    }).start();
  }






















  getTimeInString = (numberTime)=>{
    let t = new Date(numberTime);
    let strTime = this.formatDateToHHMM(t) + "  " + this.formatDateToDDMMYY(t);
    return strTime;
  }

  formatDateToHHMM = (currentTime)=>{
    if(currentTime instanceof Date){
      return currentTime.getHours().toString().padStart(2,"0") + ":" + currentTime.getMinutes().toString().padStart(2,"0");
    }else{
      return "time error";
    }
  }
  
  formatDateToDDMMYY = (currentTime)=>{
    if(currentTime instanceof Date){
      return currentTime.getDate() + "/" + currentTime.getMonth() + "/" + currentTime.getFullYear();
    }else{
      return "time error";
    }
  }


  render(){


    const animatedStyle = {
      
    }
    
    return(

      <MapScreenState.Consumer>
      {(MapScreenProps)=>(

      
            
      <Animated.View
        style={{
          opacity:this.animatedValueOpacity,
          position:"absolute",
          left:0,
          bottom:0,
          // backgroundColor:"rgba(27, 27, 27, 0.58)",
          paddingVertical:3,
          paddingHorizontal:7,
          // borderRadius:20,
          elevation:3
        }}
      >
        
        {/* Body */}
        

        <View>
          
          


          <Text
            style={{
              marginBottom:5,
              paddingLeft:2,
              color:"#000",
              fontWeight:"bold",
              fontSize:12,
              // fontFamily:
            }}
          >
            Last Known Location
          </Text>




          <View
            style={{
              flexDirection:"row"
            }}
          >

            <Text
              style={{
                marginBottom:5,
                paddingLeft:2,
                color:"#000",
                fontSize:9,
                // fontFamily:
              }}
            >
              Map Name: 
            </Text>

            <Text
              style={{
                marginBottom:5,
                paddingLeft:2,
                color:"#000",
                fontSize:9,
                // fontFamily:
              }}
            >
              {MapScreenProps.userLocationMapName}
            </Text>

          </View>










          <View
            style={{
              flexDirection:"row"
            }}
          >

            <Text
              style={{
                marginBottom:5,
                paddingLeft:2,
                color:"#000",
                fontSize:9,
                // fontFamily:
              }}
            >
              Last Update: 
            </Text>

            <Text
              style={{
                marginBottom:5,
                paddingLeft:2,
                color:"#45CE30",
                fontSize:9,
                // fontFamily:
              }}
            >
              {this.getTimeInString(MapScreenProps.lastUpdate)}
            </Text>


          </View>




          <View
            style={{
              flexDirection:"row"
            }}
          >

          <Text
            style={{
              marginBottom:5,
              paddingLeft:2,
              color:"#000",
              fontSize:9,
              // fontFamily:
            }}
          >
            Detect Method:
          </Text>

          <Text
            style={{
              marginBottom:5,
              paddingLeft:2,
              color:"#45CE30",
              fontSize:9,
              // fontFamily:
            }}
          >
            {MapScreenProps.detectMethod} 
          </Text>


          
          </View>





        </View>
        
          

        {/* Body */}

        

      </Animated.View>
              
      )}
      </MapScreenState.Consumer>


    );
  }
} 


// flex:1,
// height:"100%",
// backgroundColor:"rgb(107, 183, 255)",
// alignItems:"center",
// justifyContent:"center",