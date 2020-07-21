
import React , {Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, Switch } from 'react-native';


import Feather from "react-native-vector-icons/Feather";



export default class Help extends Component{


  

  
  render(){
    return(

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
          name="help-circle" size={28}
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
          Help
        </Text>

        




      </View>
      
    );
  }


}

