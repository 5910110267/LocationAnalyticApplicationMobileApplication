import React , {Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';


import Header from "./Header/Header.native"
import SearchBar from "./SearchBar/SearchBar.native"
import UserDetail from "./UserDetail/UserDetail.native"
import NearbyEvents from "./NearbyEvents/NearbyEvents.native"

export default class HomeScreen extends Component{


  onLayoutCallbackFuncton = () => {

  }


  
  render(){
    return(
    
      <ScrollView
        onLayout={(layoutChangeEvent) => {
          let {x,y,height,width} = layoutChangeEvent.nativeEvent.layout;
          console.log(`x is ${x} y is ${y}\n`);
          console.log(`height is ${height} width is ${width}\n`);
        }}

        style={{
          backgroundColor:"rgb(107, 183, 255)",
          flex:1
        }}
      >
        <Header/>
        <SearchBar/>
        <UserDetail/>
        <NearbyEvents/>
      </ScrollView>

    );
  }
}


const homeScreenStyleSheet = StyleSheet.create({
  container:{
    
  },
});