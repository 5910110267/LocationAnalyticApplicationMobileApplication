import React , {Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, ImageBackground ,Dimensions} from 'react-native';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default class Header extends Component{


  onLayoutCallbackFuncton = () => {

  }


  
  render(){
    return(
    
      <ImageBackground
        source={require("./Map10.jpg")}
        style={{
          // width:Dimensions.get("window").width,
          height:220
        }}
      >
        <View
          style={{
            position:"absolute",
            bottom:32,
            left:18,
          }}
        >

          <Text
            style={{
              color:"#fff",
              fontSize:18,
            }}
          >
            Location Analytic
          </Text>

          <Text
            style={{
              color:"#fff",
              fontSize:18
            }}
          >
            Application
          </Text>

          <Text
            style={{
              color:"#fff",
              fontSize:12
            }}
          >
            Version 1.06
          </Text>

          
        </View>




        <View
          style={{
            position:"absolute",
            bottom:82,
            right:22,
          }}
        >
          <MaterialIcons
            name="location-on" size={74}
            color="#E8290B"
          />

          <Text
            style={{
              color:"#E8290B",
              fontSize:12
            }}
          >
            Find Location
          </Text>
        
          
        
        </View>
        


      </ImageBackground>

    );
  }
}


const homeScreenStyleSheet = StyleSheet.create({
  
});