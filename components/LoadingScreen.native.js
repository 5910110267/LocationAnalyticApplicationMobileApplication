import React , {Component, version} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, ImageBackground, Animated, Easing } from 'react-native';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { GlobalScreenState,HomeScreenState,MapScreenState,SettingScreenState } from "../SharedNavigationState.native";

export default class LoadingScreen extends Component{

  constructor(props){
    super(props);
    // this.lo
    this.rotateAnimatedValue = new Animated.Value(0)
    this.rotateInterpolateValue = this.rotateAnimatedValue.interpolate({
      inputRange:[0,720],
      outputRange:["0deg","720deg"]
    });

    this.shouldContinueRotate = false;
    this.animateRotateLoadingSymbol = Animated.timing(this.rotateAnimatedValue,{
      toValue:720,
      duration:2600,
      useNativeDriver: true,
      easing: Easing.linear
    })

    this.animatedValueTransition = new Animated.ValueXY({x:4000,y:4000});


    // this.performRotateLoadingSymble.start(()=>{
    //   this.rotateAnimatedValue.setValue(0);
    //   this.performRotateLoadingSymble.start();
    // })
  }


  performRotateLoadingSymbol = ()=>{
    this.rotateAnimatedValue.setValue(0);
    this.animateRotateLoadingSymbol.start(()=>{
      if(this.shouldContinueRotate){
        this.performRotateLoadingSymbol();
      }
    })
  }


  startRotateLoadingSymbol = ()=>{
    this.shouldContinueRotate = true;
    this.performRotateLoadingSymbol();
  }

  stopRotateLoadingSymblo = ()=>{
    this.shouldContinueRotate = false;
    this.animateRotateLoadingSymbol.stop();
  }


  showLoadingScreen = ()=>{
    this.startRotateLoadingSymbol();
    this.animatedValueTransition.setValue({x:0,y:0});
  }


  hideLoadingScreen =()=>{
    this.stopRotateLoadingSymblo();
    this.animatedValueTransition.setValue({x:4000,y:4000});
  }
  























  componentDidMount(){
    
  }



  render(){

    const animatedStyle = {
      transform:[
        ...this.animatedValueTransition.getTranslateTransform()
      ]
    }
    return(



      
      
      <Animated.View
        style={[{
          ...StyleSheet.absoluteFillObject,
          elevation:20,
          backgroundColor:"#fff",
          justifyContent:"center",
          alignItems:"center",
        },animatedStyle]}
        onLayout={()=>{
          this.props.initialLoadingScreenFunction(this.showLoadingScreen,this.hideLoadingScreen);
        }}
      >

        <Animated.View
          style={
            {
              transform:[
                {
                  rotate:this.rotateInterpolateValue
                }
              ]
            }
          }
        >

          <MaterialIcons
            name="refresh" size={64} color="rgb(107, 183, 255)"
          />
        </Animated.View>
        


      </Animated.View>
      
      



    );
  }
} 