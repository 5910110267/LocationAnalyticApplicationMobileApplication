import React , {Component, version} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, ImageBackground, Animated } from 'react-native';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import MapView ,{Marker, Callout} from "react-native-maps";


import { GlobalScreenState,HomeScreenState,MapScreenState,SettingScreenState } from "../../../../../SharedNavigationState.native";


export default class WorldMap extends Component{

  constructor(props){
    super(props);
    this.firstLoadMap = true;
    this.animatedValueScaleDefaultValue = 1.0;
    this.animatedValueOpacityDefaultValue = 1.0;
    this.animatedValueScale = new Animated.Value(1.0);
    this.animatedValueOpacity = this.animatedValueScale.interpolate({
      inputRange:[1.0,2.7,3.0],
      outputRange:[1.0,0.8,0.1]
    })
    this.animatedValueTransition = new Animated.ValueXY({x:0,y:0});
    this.referenceToMapView = undefined;
    this.referenceToMarker = undefined;
    this.isCalloutViewShown = false;

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




  zoomInToLocalAreaMap = (zoomInToLocalAreaMapCallBack)=>{

    if(this.animatedValueScale !== undefined){
      Animated.timing(this.animatedValueScale,
        {
          toValue:3.0,
          duration:3000,
          useNativeDriver: true,
        }
      ).start(()=>{
        this.removeWorldMapFromScreen();
        if(zoomInToLocalAreaMapCallBack){
          zoomInToLocalAreaMapCallBack();
        }
      });
    }else{
      console.error("\n\nanimatedValueScale is undefined on calling zoomInToLocalAreaMap\n\n");
    }
    
  }

  zoomOutToWorldMap = (zoomOutToWorldMapCallBack)=>{
    
    this.animatedValueTransition.setValue({x:0,y:0})

    if(this.animatedValueScale !== undefined){
      Animated.timing(this.animatedValueScale,
        {
          toValue:1.0,
          duration:3000,
          useNativeDriver: true,
        }
      ).start(()=>{
        if(zoomOutToWorldMapCallBack){
          zoomOutToWorldMapCallBack();
        }
      });
    }else{
      console.error("\n\nanimatedValueScale is undefined on calling zoomOutOfLocalAreaMap\n\n");
    }
    
  }

  removeWorldMapFromScreen =()=>{
    this.animatedValueTransition.setValue({x:4000,y:4000})
  }

  showOrHideCalloutView = ()=>{
    if(this.referenceToMarker !== undefined){
      if(this.isCalloutViewShown){
        this.referenceToMarker.hideCallout();
        this.isCalloutViewShown = false;
      }else{
        this.referenceToMarker.showCallout();
        this.isCalloutViewShown = true;
      }
    }
  }

  

  render(){


    const animatedStyle = {
      transform:[
        {
          scale:this.animatedValueScale
        },
        ...this.animatedValueTransition.getTranslateTransform()
      ]
    }
    
    return(

      <MapScreenState.Consumer>
      {(MapScreenProps)=>(

      <Animated.View
        style={[{
          ...StyleSheet.absoluteFillObject,
          opacity:this.animatedValueOpacity,
          elevation:5          
        },animatedStyle]}
      >
        {/* <View
          style={{
            width:360,
            height:604,
          }}
        > */}

          <MapView
            ref={(mapRef)=>{this.referenceToMapView = mapRef}}
            style={{
              ...StyleSheet.absoluteFillObject
            }}
            initialRegion={{
              latitude:6.996812,
              longitude:100.501788,
              latitudeDelta:0.0045,
              longitudeDelta:0.0025
            }}
            onMapReady={()=>{
              MapScreenProps.intialNaviationMapZoom(1,{
                zoomInToLocalAreaMap:this.zoomInToLocalAreaMap,
                zoomOutToWorldMap:this.zoomOutToWorldMap,

              });
            }}
            
          >
            <Marker
              ref={(markerRef)=>{this.referenceToMarker = markerRef}}
              coordinate={{
                latitude:6.996812,
                longitude:100.501788,
              }}
              onPress={this.showOrHideCalloutView}
              onCalloutPress={MapScreenProps.intialNaviationMapZoom}

            >
              <Callout
                tooltip={true}
                // onPress={()}
              >
                <View
                  style={{
                    backgroundColor:"rgba(27, 27, 27, 0.58)",
                    paddingVertical:3,
                    paddingHorizontal:7,
                    borderRadius:20
                  }}
                >
                  {/* Header */}
                  <View
                    style={{
                      flexDirection:"row",
                      marginVertical:2,
                      marginHorizontal:2,
                      paddingVertical:6,
                      borderBottomColor:"#fff",
                      borderBottomWidth:1,
                    }}
                  >
                    <View
                      // backgroundColor
                      style={{
                        // backgroundColor:"blue",
                        height:40,
                        width:40,
                        borderRadius:20,
                        overflow:"hidden",
                        justifyContent:"center",
                        alignItems:"center",
                        borderWidth:2,
                        borderColor:"#25CCF7",
                        marginHorizontal:4

                      }}
                    >
                      <MaterialCommunityIcons
                        name="cellphone-text" size={32}
                        color="#25CCF7"
                      />

                    </View>
                    <View
                      style={{
                        justifyContent:"center",
                        // alignItems:"center",
                        marginHorizontal:4
                      }}
                    >
                      <Text
                        style={{
                          fontSize:16,
                          color:"#fff",
                          fontWeight:"bold"
                        }}
                      >
                        Device Name
                      </Text>
                      <Text
                        style={{
                          fontSize:14,
                          color:"#fff"
                        }}
                      >
                        Frost ViVo 
                      </Text>
                    </View>

                  </View>
                  {/* Header */}
                  
                  
                  {/* Body */}
                  <View
                    style={{
                      flexDirection:"row",
                      marginVertical:2,
                      marginHorizontal:2,
                      paddingVertical:4,
                    }}
                  >

                    <View>

                      
                      <View
                        style={{
                          flexDirection:"row"
                        }}
                      >
                        <Text
                          style={{
                            marginBottom:5,
                            color:"#fff",
                            fontWeight:"bold",
                            fontSize:14,
                            // fontFamily:
                          }}
                        >
                          Device Type: 
                        </Text>

                        <Text
                          style={{
                            marginBottom:5,
                            paddingLeft:2,
                            color:"#25CCF7",
                            fontSize:14,
                            // fontFamily:
                          }}
                        >
                          Phone
                        </Text>

                      </View>


                      <Text
                        style={{
                          marginBottom:5,
                          color:"#fff",
                          fontWeight:"bold",
                          fontSize:14,
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
                            color:"#fff",
                            fontSize:11,
                            // fontFamily:
                          }}
                        >
                          Map Name: 
                        </Text>

                        <Text
                          style={{
                            marginBottom:5,
                            paddingLeft:2,
                            color:"#fff",
                            fontSize:11,
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
                            color:"#FFF",
                            fontSize:11,
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
                            fontSize:11,
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
                          color:"#FFF",
                          fontSize:12,
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
                          fontSize:12,
                          // fontFamily:
                        }}
                      >
                        {MapScreenProps.detectMethod} 
                      </Text>


                      
                      </View>



































                    </View>
                    
                    

                  </View>
                  {/* Body */}

                  

                </View>
              </Callout>
              
            </Marker>

          </MapView>

        {/* </View> */}

        

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