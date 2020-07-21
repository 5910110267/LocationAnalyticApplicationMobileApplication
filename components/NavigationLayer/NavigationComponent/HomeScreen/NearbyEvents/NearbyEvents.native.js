


import React , {Component, version} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, ImageBackground } from 'react-native';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";





export default class NearbyEvents extends Component{


  
  render(){


    return(

      
      <View
        style={{
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
          








          <View
            style={{
              width:58,
              height:58,
              marginRight:14
            }}
          >

            <Image
              source={require("./EventIcon.png")}
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


          <View
            style={{
              justifyContent:"center",
              // alignItems:"center"              
            }}
          >

            <Text
              style={{
                marginBottom:5,
                color:"#fff",
                fontSize:16,
                // fontFamily:
              }}
            >
              Nearby Events
            </Text>

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
              width:"100%",
              // height:240,
              padding:4,
              height:220,


            }}
          >

            <ImageBackground
              resizeMode="stretch"
              source={require("./NSC-event.jpg")}
              style={{
                flex:1,
                // width:"100%",
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                height:"100%",
                borderRadius:16,
                borderColor:"#2C3335",
                borderWidth:2,
                overflow:"hidden"

              }}
            >
              <View
                style={{
                  width:38,
                  height:38,
                  // backgroundColor:"rgba(255, 255, 255, 0.21)",
                  alignItems:"center",
                  justifyContent:"center",
                  borderRadius:19
                }}
              >

                <MaterialIcons
                  name="chevron-left" size={36}
                  color="rgba(0, 0, 0, 0.21)"
                  
                />

              </View>


              <View
                style={{
                  width:38,
                  height:38,
                  // backgroundColor:"rgba(255, 255, 255, 0.21)",
                  alignItems:"center",
                  justifyContent:"center",
                  borderRadius:19
                }}
              >

                <MaterialIcons
                  name="chevron-right" size={36}
                  color="rgba(0, 0, 0, 0.21)"
                  
                />

              </View>



            </ImageBackground>

          </View>
  





        </View>




      </View>

    );

  }
}

