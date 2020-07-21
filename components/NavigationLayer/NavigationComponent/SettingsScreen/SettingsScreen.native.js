
import React , {Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';


import UserProfile from "./UserProfile/UserProfile.native";

import EditProfile from "./SettingsMenu/EditProfile.native";
import LocatePositionWithBLE from "./SettingsMenu/LocatePositionWithBLE.native";
import BackgroundScanning from "./SettingsMenu/BackgroundScanning.native"
import AcceptNotification from "./SettingsMenu/AcceptNotification.native";
import Help from "./SettingsMenu/Help.native"
import Logout from "./SettingsMenu/Logout.native";

export default class SettingsScreen extends Component{


  
  render(){
    return(

      <ScrollView
        style={{
          flex:1,
          backgroundColor:"rgb(107, 183, 255)"
          
        }}
      >
        <UserProfile/>
        <EditProfile/>
        <LocatePositionWithBLE/>
        <BackgroundScanning/>
        <AcceptNotification/>
        <Help/>
        <Logout/>


      </ScrollView>
      
    );
  }
}

