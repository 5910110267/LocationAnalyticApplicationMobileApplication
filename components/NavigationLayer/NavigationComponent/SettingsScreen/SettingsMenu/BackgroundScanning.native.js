
import React , {Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, Switch } from 'react-native';



import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Foundation from "react-native-vector-icons/Foundation"


import { GlobalScreenState,HomeScreenState,MapScreenState,SettingScreenState } from "../../../../../SharedNavigationState.native";


export default class BackgroundScanning extends Component{


  
  render(){
    return(

      // State Consumer
      <SettingScreenState.Consumer>
      {(SettingScreenProps)=>(




    

      <View
        style={{
          flexDirection:"row",
          marginHorizontal:16,
          padding:12,
          borderTopColor:"#fff",
          borderTopWidth:1

        }}
      >
        <View
          style={{
            flex:1,
            flexDirection:"row"
          }}
        >

          <MaterialIcons
            name="tap-and-play" size={28}
            color="#fff"
            style={{
              marginHorizontal:4,
            }}
          />

          <Text
            style={{
              color:"#fff",
              fontSize:18,
              marginHorizontal:4,

            }}
          >
            Background Scanning
          </Text>

        </View>



        <Switch
          value={SettingScreenProps.backgroundScanning}
          onValueChange={SettingScreenProps.toggleBackgroundScanning}
          trackColor={{
            true:"#43BE31",
            false:"#fff"
          }}
          thumbColor="#fff"
          
        />



      </View>





      )}
      </SettingScreenState.Consumer>
      // State Consumer
      
    );
  }


}

