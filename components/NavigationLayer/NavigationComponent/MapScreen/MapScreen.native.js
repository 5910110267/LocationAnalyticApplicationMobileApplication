import React , {Component, version} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, ImageBackground } from 'react-native';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";


import MapTools from "./MapTools/MapTools.native"
import MapBody from './MapBody/MapBody.native';
import WorldMap from "./WorldMap/WorldMap.native";
import StatusBar from "./StatusBar/StatusBar.native";


export default class MapScreen extends Component{


  
  render(){


    return(

      
      <View
        style={{
          backgroundColor:"#fff",
          flex:1
        }}
      >
        <MapBody/>
        <MapTools/>
        <WorldMap/>
        <StatusBar/>
        

      </View>

    );

  }
}

