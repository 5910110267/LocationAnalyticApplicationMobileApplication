
import React , {Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';


import MaterialIcons from "react-native-vector-icons/MaterialIcons";




export default class SearchBar extends Component{


  
  render(){


    return(

      
      <View
        style={{
          // alignItems:"center",
        }}
      >
        <View
          style={{
            flexDirection:"row",
            backgroundColor:"#fff",
            paddingVertical:5,
            paddingHorizontal:18,
            marginVertical:8,
            marginHorizontal:24,
            borderRadius:24
          }}
        >
          <TextInput
            style={{
              flex:1,
              fontSize:18,
              padding:4
             }}
            placeholder="Search..."
          />

          <View
            style={{
              justifyContent:"center",
              alignItems:"center"
            }}
          >
            <MaterialIcons
              name="search" size={28} color="#000"
            />
          </View>
          

        </View>

      </View>

    );

  }
}

