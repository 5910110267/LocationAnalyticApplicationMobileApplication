import React , {Component, version} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, ImageBackground, Animated } from 'react-native';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default class AuthenticationLayer extends Component{

  constructor(props){
    super(props);

    this.state={
      username:"",
      password:""
    }
  }

  render(){
    return(
      <View
        style={{
          flex:1,
          height:"100%",
          backgroundColor:"rgb(107, 183, 255)",
          alignItems:"center",
          justifyContent:"center",
          // zIndex:10   
             
        }}
      >
        <View
          style={{
            width:"100%",
          }}
        >

          <View
            // ref={(element)=>{
            //   this.
            // }}
            style={{
              backgroundColor:"rgba(255, 255, 255, 0.34)",
              marginVertical:10,
              marginHorizontal:32,
              paddingVertical:6,
              paddingHorizontal:22,
              borderRadius:28
            }}

          >

            <TextInput
              style={{
                fontSize:18,
                padding:4,
              }}
              value={this.state.username}
              onChangeText={(username)=>{
                this.setState({
                  username:username
                })
              }}
              placeholder="Username"
            />

          </View>

          <View
            style={{
              backgroundColor:"rgba(255, 255, 255, 0.34)",
              marginVertical:10,
              marginHorizontal:32,
              paddingVertical:6,
              paddingHorizontal:22,
              borderRadius:28
            }}
          >

            <TextInput
              secureTextEntry={true}
              style={{
                fontSize:18,
                padding:4,
              }}
              value={this.state.password}
              onChangeText={(password)=>{
                this.setState({
                  password:password
                })
              }}
              placeholder="Password"
            />

          </View>





          
          <View
            style={{
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems:"center",
              marginVertical:10,
              marginHorizontal:32,
            }}
          >
            {/* Log In button */}
            <TouchableOpacity onPress={()=>{
              this.props.performLogin(this.state.username,this.state.password);
            }}>
            <View
              style={{
                flexDirection:"row",
                backgroundColor:"#45CE30",
                paddingVertical:6,
                paddingHorizontal:18,
                borderRadius:28,
                alignItems:"center",
                justifyContent:"center",
                borderColor:"#fff",
                borderWidth:2
              }}
            >
              <Feather
                name="log-in" size={28}
                color="#fff"
                style={{
                  marginRight:4,
                }}
              />

              <Text
                style={{
                  color:"#fff",
                  fontSize:18,
                  padding:4,
                  marginHorizontal:2
                }}
              >
                Log In
              </Text>

              

            </View>
            </TouchableOpacity>
            {/* Log In button */}
            

            {/* Sign Up button */}
            <View
              style={{
                flexDirection:"row",
                backgroundColor:"rgba(255, 255, 255, 0.22)",
                paddingVertical:6,
                paddingHorizontal:18,
                borderRadius:28,
                alignItems:"center",
                justifyContent:"center",
                borderColor:"#fff",
                borderWidth:2
              }}
            >
              <Feather
                name="edit-3" size={28}
                color="#fff"
                style={{
                  marginRight:4,
                }}
              />

              <Text
                style={{
                  color:"#fff",
                  fontSize:18,
                  padding:4,
                  marginHorizontal:2
                }}
              >
                Sign Up
              </Text>

              

            </View>
            {/* Sing Up button */}

           

          
          </View>
    

        </View>

        <View
          style={{
            position:"absolute",
            bottom:16,
            right:16,
          }}
        >

          <MaterialCommunityIcons 
            name="settings" 
            size={48} 
            color="rgba(255, 255, 255, 0.4)"
          />
          
        </View>

      </View>


    );
  }
} 