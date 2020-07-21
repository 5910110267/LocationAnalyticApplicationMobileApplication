


import React , {Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';


export default class NavigationTab extends Component{


  
  render(){
    return(
    
      <View
        style={navigationTabStyleSheet.container}
      >
        <Text>
          This is Navigation Tab
        </Text>
      </View>
    
    );
  }
}


const navigationTabStyleSheet = StyleSheet.create({
  container:{
    backgroundColor:"blue",
    width:"100%",
    flex:2
  },
});