
import React , {Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';






export default class UserProfile extends Component{


  
  render(){


    return(

      
      <View
        style={{
          flex:1,
          alignItems:"center",
          paddingBottom:20,
          paddingTop:10
        }}
      >




        {/* User Profile Picture */}
        <View
          style={{
            width:200,
            height:200,
            padding:20,

          }}
        >

          <Image
            source={require("./MyProfilePic.jpg")}
            style={{
              flex:1,
              width:null,
              alignSelf:"stretch",
              borderRadius:90,
              borderColor:"#fff",
              borderWidth:3,

            }}
          />

        </View>
        {/* User Profile Picture */}










        {/* Username */}
        <Text
          style={{
            marginTop:5,
            color:"#fff",
            fontSize:16,
            // fontFamily:
          }}
        >
          Yongyut Rattana 
        </Text>

        <Text
          style={{
            marginTop:5,
            color:"#fff",
            fontSize:12,
            // fontFamily:
          }}
        >
          UserID: 5910110267
        </Text>


        <Text
          style={{
            marginTop:5,
            color:"#fff",
            fontSize:12,
            // fontFamily:
          }}
        >
          E-mail: 5910110267@psu.ac.th
        </Text>
        {/* Username */}



      </View>

    );

  }
}

