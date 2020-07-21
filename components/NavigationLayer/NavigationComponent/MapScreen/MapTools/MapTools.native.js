import React , {Component, version} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, ImageBackground, Animated } from 'react-native';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


import { GlobalScreenState,HomeScreenState,MapScreenState,SettingScreenState } from "../../../../../SharedNavigationState.native";


export default class MapTools extends Component{


  constructor(props){
    super(props);

    this.state = {
      isExpand:false,
    }

    this.expandAnimatedValue = new Animated.Value(-300);
  }

  expandToolsBar = ()=>{
    Animated.timing(this.expandAnimatedValue,{
      toValue:0,
      duration:800,
      useNativeDriver: true,
    }).start();
  }

  hideToolsBar = ()=>{
    Animated.timing(this.expandAnimatedValue,{
      toValue:-300,
      duration:800,
      useNativeDriver: true,
    }).start();
  }

  componentDidMount(){
    // this.props
  }














  


  
  render(){


    const mapToolsStyle = StyleSheet.create({
      animationViewContainer:{
        
        position:"absolute",
        top:0,
        right:6,
        backgroundColor:"rgba(27, 27, 27, 0.4)",
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        elevation:2
        
      },

      toolContainer:{
        width:48,
        height:48,
        margin:6,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:36,
        borderColor:"#fff",
        borderWidth:2,
      }
    });

    const animatedStyle = {
      transform:[
        {
          translateY:this.expandAnimatedValue
        }
      ]
    }



    return(



      <MapScreenState.Consumer>
      {(MapScreenProps)=>(

      <Animated.View
        style={[mapToolsStyle.animationViewContainer,animatedStyle]}
      >



        <TouchableOpacity onPress={MapScreenProps.performScanBeacon}>
        <View
          style={mapToolsStyle.toolContainer}
        >
          <MaterialIcons
            name="refresh" size={32} color="#fff"
          />
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={MapScreenProps.performNavigationToWorldMap}>
        <View
          style={mapToolsStyle.toolContainer}
        >
          <MaterialCommunityIcons
            name="google-maps" size={32} color="#fff"
          />
        </View>
        </TouchableOpacity>



        <TouchableOpacity onPress={MapScreenProps.performZoomIn}>
        <View
          style={mapToolsStyle.toolContainer}
        >
          <Feather
            
            name="zoom-in" size={32} color="#fff"
          />
        </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={MapScreenProps.performZoomOut}>
        <View
          style={mapToolsStyle.toolContainer}
        >
          <Feather
            name="zoom-out" size={32} color="#fff"
          />
        </View>
        </TouchableOpacity>




        <View
          style={mapToolsStyle.toolContainer}
        >
          <Entypo
            name="help" size={30} color="#fff"
          />
        </View>

        

        <View
          style={mapToolsStyle.toolContainer}
        >
          <Feather
            name={this.state.isExpand? "chevrons-up":"chevrons-down"} size={42} color="#fff"
            onPress={()=>{
              if(this.state.isExpand){
                this.setState({
                  isExpand:false
                },()=>{
                  this.hideToolsBar();
                });
              }else{
                this.setState({
                  isExpand:true
                },()=>{
                  this.expandToolsBar();
                });
              }
              
            }}
          />
        </View>

        



        

      </Animated.View>

      )}
      </MapScreenState.Consumer>

    );

  }
}

