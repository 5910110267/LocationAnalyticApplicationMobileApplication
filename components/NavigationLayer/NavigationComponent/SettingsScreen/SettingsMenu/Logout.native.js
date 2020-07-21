
import React , {Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';


import Feather from "react-native-vector-icons/Feather";


import { GlobalScreenState,HomeScreenState,MapScreenState,SettingScreenState } from "../../../../../SharedNavigationState.native";

export default class Logout extends Component{


  
  render(){
    return(

      // State Consumer
      <SettingScreenState.Consumer>
      {(SettingScreenProps)=>(
      





      <TouchableOpacity onPress={SettingScreenProps.performLogout}>
      <View
        style={{
          flexDirection:"row",
          marginHorizontal:16,
          padding:12,
          borderTopColor:"#fff",
          borderTopWidth:1

        }}
      >
        <Feather
          name="log-out" size={28}
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
          Logout
        </Text>

      </View>
      </TouchableOpacity>






      )}
      </SettingScreenState.Consumer>
      // State Consumer



    );
  }
}

