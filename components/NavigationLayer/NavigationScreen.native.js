


import React , {Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';


// import NavigationTab from "./NavigationComponent/NavigationTab.native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


import HomeScreen from "./NavigationComponent/HomeScreen/HomeScreen.native"
import MapScreen from "./NavigationComponent/MapScreen/MapScreen.native"
import SettingsScreen from "./NavigationComponent/SettingsScreen/SettingsScreen.native"


const BottomTabNavigator = createBottomTabNavigator();

export default class NavigationScreen extends Component{

  

  constructor(props){
    super(props);
    // this.
  }

  
  render(){
    return(

      <NavigationContainer>
        <BottomTabNavigator.Navigator>

          <BottomTabNavigator.Screen 

            name="Home" 
            component={HomeScreen}
            options={{
              tabBarIcon:({focused,tintColor})=>{
                let iconColor = focused ? "rgb(2, 117, 216)" : "rgb(108, 117, 125)";
                return(
                  <MaterialCommunityIcons name="home" size={25} color={iconColor}/>
                );
              }
            }}
          />
          <BottomTabNavigator.Screen 

            name="Map" 
            component={MapScreen}
            options={{
              tabBarIcon:({focused,tintColor})=>{
                let iconColor = focused ? "rgb(2, 117, 216)" : "rgb(108, 117, 125)";
                return(
                  <MaterialCommunityIcons name="map" size={25} color={iconColor}/>
                );
              }
            }}
          
          />
          <BottomTabNavigator.Screen 

            name="Settings" 
            component={SettingsScreen}
            options={{
              tabBarIcon:({focused,tintColor})=>{
                let iconColor = focused ? "rgb(2, 117, 216)" : "rgb(108, 117, 125)";
                return(
                  <MaterialCommunityIcons name="settings" size={25} color={iconColor}/>
                );
              }
            }}
          
          />

        </BottomTabNavigator.Navigator>
      </NavigationContainer>
      
    );
  }
}

