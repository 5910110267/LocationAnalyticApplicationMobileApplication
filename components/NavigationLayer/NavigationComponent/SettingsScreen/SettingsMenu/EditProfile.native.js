
import React , {Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';


import AntDesign from "react-native-vector-icons/AntDesign";



export default class EditProfile extends Component{


  
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
        <AntDesign
          name="profile" size={28}
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
          Edit Profile
        </Text>

        




      </View>
      
    );
  }


}

