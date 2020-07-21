


import React , {Component, version} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, ImageBackground } from 'react-native';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { GlobalScreenState,HomeScreenState,MapScreenState,SettingScreenState } from "../../../../../SharedNavigationState.native";




export default class UserDetail extends Component{


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


    return(

      <HomeScreenState.Consumer>
      {(HomeScreenProps)=>(

      <View
        style={{
          // alignItems:"flex-start",
          padding:12,
          margin:16,
          backgroundColor:"rgba(0, 0, 0,0.21)",
          borderColor:"#fff",
          borderRadius:16
        }}
      >





        <View
          style={{
            flexDirection:"row",
            borderBottomColor:"#fff",
            borderBottomWidth:1,
            paddingBottom:8
          }}
        >


          {/* User Profile Picture */}
          <View
            style={{
              width:58,
              height:58,
              marginRight:14
            }}
          >

            <Image
              source={require("./MyProfilePic.jpg")}
              style={{
                flex:1,
                width:null,
                alignSelf:"stretch",
                borderRadius:90,
                borderColor:"#fff",
                borderWidth:2,

              }}
            />

          </View>
          {/* User Profile Picture */}







          <View
            style={{
              justifyContent:"center",
              // alignItems:"center"              
            }}
          >


            {/* Username */}
            
            <Text
              style={{
                marginBottom:2,
                color:"#fff",
                fontSize:16,
                fontWeight:"bold"
                // fontFamily:
              }}
            >
              User Detail
            </Text>

            <Text
              style={{
                marginBottom:1,
                color:"#fff",
                fontSize:13,
                // fontFamily:
              }}
            >
              Name: Yongyut Rattana 
            </Text>

            <Text
              style={{
                color:"#fff",
                fontSize:10,
                // fontFamily:
              }}
            >
              User ID: 5910110267
            </Text>

            
          
            {/* Username */}

          </View>



        </View>





        <View
            style={{
              flexDirection:"row",
              paddingVertical:10

            }}
          >






            <View
              style={{
                flex:1
              }}
            >


              {/* <Text
                style={{
                  marginBottom:5,
                  color:"#fff",
                  fontSize:14,
                  // fontFamily:
                }}
              >
                Current Location
              </Text>

              <Text
                style={{
                  marginBottom:5,
                  paddingLeft:2,
                  color:"#E8290B",
                  fontSize:11,
                  // fontFamily:
                }}
              >
                Unknown
              </Text> */}


              <Text
                style={{
                  marginBottom:5,
                  color:"#fff",
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
                  {HomeScreenProps.userLocationMapName}
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
                    color:"#fff",
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
                  {this.getTimeInString(HomeScreenProps.lastUpdate)}
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
                    color:"#fff",
                    fontSize:11,
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
                    fontSize:11,
                    // fontFamily:
                  }}
                >
                  {HomeScreenProps.detectMethod} 
                </Text>
              </View>



            </View>

            <View
              style={{
                justifyContent:"center",
                alignItems:"center"
              }}
            >

              <View
                style={{
                  width:120,
                  height:120,
                  marginRight:10
                }}
              >

                <ImageBackground
                  source={require("./RentedHouse.png")}
                  style={{
                    flex:1,
                    width:null,
                    alignSelf:"stretch",
                    borderRadius:16,
                    borderColor:"#2C3335",
                    borderWidth:2,
                    overflow:"hidden"
                  }}
                >
                  <MaterialIcons
                    name="location-on" size={18}
                    color="#E8290B"
                    style={{
                      position:"absolute",
                      bottom:40,
                      right:40,
                    }}
                  />

                </ImageBackground>

              </View>
  
            </View>








          </View>












      </View>
      
      )}
      </HomeScreenState.Consumer>

    );

  }
}

