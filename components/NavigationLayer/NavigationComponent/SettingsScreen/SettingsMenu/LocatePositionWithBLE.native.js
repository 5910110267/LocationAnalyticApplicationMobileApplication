
import React , {Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, Switch } from 'react-native';



import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { GlobalScreenState,HomeScreenState,MapScreenState,SettingScreenState } from "../../../../../SharedNavigationState.native";


export default class LocatePositionWithBLE extends Component{


  
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
            name="bluetooth-searching" size={28}
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
            Locate Position With BLE
          </Text>

        </View>



        <Switch
          value={SettingScreenProps.locatePositionWithBLE}
          onValueChange={SettingScreenProps.toggleLocatePositionWithBLE}
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

