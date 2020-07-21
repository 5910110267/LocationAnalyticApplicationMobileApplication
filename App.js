/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  DeviceEventEmitter,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";


import Beacons from "react-native-beacons-manager";

import LoadingScreen from "./components/LoadingScreen.native";
import NavigationScreen from "./components/NavigationLayer/NavigationScreen.native";
// import SettingsScreen from "./components/NavigationLayer/NavigationComponent/SettingsScreen/SettingsScreen.native"
import AuthenticationLayer from "./components/AuthenticationLayer/AuthenticationLayer.native"


import { GlobalScreenState,HomeScreenState,MapScreenState,SettingScreenState } from "./SharedNavigationState.native";

import BLElocationCalculator from "./AppLibrary/BLElocationCalculator/BLElocationCalculator.native";
import BLEbeaconCaptured from "./AppLibrary/BLElocationCalculator/include/BLEbeaconCaptured.native";
import BLEbeaconCapturedList from "./AppLibrary/BLElocationCalculator/include/BLEbeaconCapturedList.native";



export default class App extends Component{




  // Constructor and Life Cycle


  constructor(props){
    super(props);

    // let locationCalculator = new BLElocationCalculator();
    

    // console.log(locationCalculator.objBeaconBroadcasterList);
    // console.log(locationCalculator.objBeaconCapturedList);

    // State
    this.state={

      
      


      // Authentication state
      authenState:{
        isLogin:false,
      },
      // Authentication state

      // Authenticated screen loading state
      isLoadingNavigationLayer:false,
      // Authenticated screen loading state





      // Navigation Screen State




      // // Map Screen State

      // objBeaconBroadcasterList:locationCalculator.objBeaconBroadcasterList.list,
      // objBeaconCapturedList:locationCalculator.objBeaconCapturedList,
      // possibleSingleResult:locationCalculator.possibleSingleResult,
      objBeaconBroadcasterList:null,
      objBeaconCapturedList:null,
      possibleSingleResult:null,
      
      userLocationMapId:null,
      userLocationMapName:null,
      userLocationMapImageLocation:null,
      userLocationMapImageSize:null,
      userLocationMaplatitude:null,
      userLocationMaplongitude:null,
      userLocationX:null,
      userLocationY:null,
      detectMethod:null,
      lastUpdate:null,


      // // Map Screen State







      // // Setting Screen State
      
      locatePositionWithBLE:false,
      backgroundScanning:false,
      acceptNotification:false,


      // // Setting Screen State





      // Navigation Screen State
      
      

    }
    // State



    this.isShowingLoadingScreen = false;
    this.showLoadingScreen = undefined;
    this.hideLoadingScreen = undefined;


    this.zoomInButtonHandler = undefined;
    this.zoomOutButtonHandler = undefined;

    this.isGlobalMapLayoutComplete = false;
    this.isLocalAreaMapLayoutComplete = false;

    this.zoomInToLocalAreaMap = undefined;
    this.zoomOutToWorldMap = undefined;
    this.focusLocalAreaLocation = undefined;
    this.defocusLocalAreaLocation = undefined;
    this.unfilteredBeaconCapturedList = new BLEbeaconCapturedList();

    this.currentUserLocationObj = undefined;
    this.userLocation = undefined;
    this.beaconBroadcasterListDetectingUserLocation = undefined;

    this.beaconBackgroundScaningInterval = undefined;

    this.initialBeacon();


    


  }

  componentDidMount(){
    // this.scanBeacon();

    // this.fetchDataFromExpress();

    
  }






  // Constructor and Life Cycle






































  // Fetch data from express

  fetchDataFromExpress = async ()=>{
    let urlToFetch = "http://192.168.1.112:9002/findMapById";
    let queryString = "?mapId=A74F32F2E2459288C912D0937D11FE7A";
    let fetchResponse = undefined;
    let fetchResponseInJSON = undefined;
    try {
      fetchResponse = await fetch(urlToFetch+queryString);
      fetchResponseInJSON = await fetchResponse.json();
      console.log(fetchResponseInJSON);
    } catch (error) {
      console.log("Error occored in fetch");
    }
  
  }
  

  // Fetch data from express





  // Perform Beacon Background Scanning

  performStartBeaconBackgroundScaningInterval = ()=>{
    this.beaconBackgroundScaningInterval = setInterval(()=>{
      this.performScanBeaconBackground();
    },15000);
  }

  performStopBeaconBackgroundScaningInterval = ()=>{
    if(this.beaconBackgroundScaningInterval){
      clearInterval(this.beaconBackgroundScaningInterval);
    }
  }


  // beaconBackgroundScaningInterval





  // Perform Beacon Background Scanning













  // Initial Loading Screen Function

  initialLoadingScreenFunction = (showLoadingScreen,hideLoadingScreen)=>{
    this.showLoadingScreen = showLoadingScreen;
    this.hideLoadingScreen = hideLoadingScreen;
  }

  performShowLoadingScreen = ()=>{
    if(this.showLoadingScreen !== undefined){
      this.isShowingLoadingScreen = true;
      this.showLoadingScreen();
    }else{
      console.log("Error in App.js performShowLoadingScreen get call before get initialied")
    }
  }

  performHideLoadingScreen = ()=>{
    if(this.isShowingLoadingScreen === false){
      return;
    }

    if(this.showLoadingScreen !== undefined){
      this.hideLoadingScreen();
    }else{
      console.log("Error in App.js performHideLoadingScreen get call before get initialied")
    }
  }




  // Initial Loading Screen Function








  // Login log out function

  performLogin = async (username,password) =>{

    this.performShowLoadingScreen();

    
    console.log("username is " + username);
    console.log("password is " + password);

    let userId = "5910110267";

    let fetchUserLocationURL = "http://192.168.1.112:9002/findUserLocationById?userId=" + userId;
    let fetchUserSettingURL = "http://192.168.1.112:9002/findUserSettingById?userId=" + userId;


    let fetchUserLocationResponse = undefined;
    let fetchUserLocationResponseInJSON = undefined;

    let fetchUserSettingResponse = undefined;
    let fetchUserSettingResponseInJSON = undefined;

    let fetchMapResponse = undefined;
    let fetchMapResponseInJSON = undefined;


    let urlToFetch = "http://192.168.1.112:9002/findMapById?mapId=";
    let mapIdQueryString = "A74F32F2E2459288C912D0937D11FE7A";

    let isFetchUserInfomationSuccess = false;


    try {
      fetchUserLocationResponse = await fetch(fetchUserLocationURL);
      fetchUserLocationResponseInJSON = await fetchUserLocationResponse.json();

      fetchUserSettingResponse = await fetch(fetchUserSettingURL);
      fetchUserSettingResponseInJSON = await fetchUserSettingResponse.json();

      if(fetchUserLocationResponseInJSON.hasOwnProperty("errorMessage") || 
         fetchUserSettingResponseInJSON.hasOwnProperty("errorMessage")
      ){
        console.error("error on fetchUserLocationResponse fetchUserSettingResponse");
        isFetchUserInfomationSuccess = false;
      }else{

        fetchMapResponse = await fetch("http://192.168.1.112:9002/findMapById?mapId=" + fetchUserLocationResponseInJSON.userLastKnownLocation[0].mapId);
        fetchMapResponseInJSON = await fetchMapResponse.json();

        if(fetchMapResponseInJSON.hasOwnProperty("errorMessage")){

          console.error("error on fetchMapResponseInJSON");
          isFetchUserInfomationSuccess = false;

        }else{



          this.setState({

            userLocationMapId:fetchMapResponseInJSON.mapId,
            userLocationMapName:fetchMapResponseInJSON.mapName,
            userLocationMapImageLocation:fetchMapResponseInJSON.mapImageLocation,
            userLocationMapImageSize:fetchMapResponseInJSON.mapImageSize,
            userLocationMaplatitude:fetchMapResponseInJSON.latitude,
            userLocationMaplongitude:fetchMapResponseInJSON.longitude,
            userLocationX:fetchUserLocationResponseInJSON.userLastKnownLocation[0].x,
            userLocationY:fetchUserLocationResponseInJSON.userLastKnownLocation[0].y,
            detectMethod:fetchUserLocationResponseInJSON.userLastKnownLocation[0].detectMethod,
            lastUpdate:fetchUserLocationResponseInJSON.userLastKnownLocation[0].lastUpdate,
            locatePositionWithBLE:fetchUserSettingResponseInJSON.locatePositionUsingBLE,
            backgroundScanning:fetchUserSettingResponseInJSON.backgroundScanning,
            acceptNotification:fetchUserSettingResponseInJSON.acceptNotification,
  
          });
          this.currentUserLocationObj = fetchUserLocationResponseInJSON;
          isFetchUserInfomationSuccess = true;


        }




        
      }



      console.log("\n\nUser location is ");
      console.log(fetchUserLocationResponseInJSON);
      console.log("\n\nUser setting is ");
      console.log(fetchUserSettingResponseInJSON);
      console.log("\n\nMap info is ");
      console.log(fetchMapResponseInJSON);



    }catch (error) {
      console.log("Error occored in fetch user infomation" + error);
      isFetchUserInfomationSuccess = false;
    }

    if(isFetchUserInfomationSuccess){
      if(this.state.backgroundScanning === true){
        this.performStartBeaconBackgroundScaningInterval();
      }
      this.setState({
        authenState:{
          isLogin:true
        }
      })
    }else{

    }

    
    



    this.performHideLoadingScreen();
  }

  performLogout = () =>{
    this.setState({
      authenState:{
        isLogin:false
      }
    })
  }

  clearSession = () =>{

  }

  // Login log out function


  


  // Map tool botton handler


  intialNaviationMapZoom = (componentThatInitialComplete,objOfFunctionToInitail)=>{
    if(componentThatInitialComplete === 1){
      this.zoomInToLocalAreaMap = objOfFunctionToInitail.zoomInToLocalAreaMap;
      this.zoomOutToWorldMap = objOfFunctionToInitail.zoomOutToWorldMap;
    }else if(componentThatInitialComplete === 2){
      this.focusLocalAreaLocation = objOfFunctionToInitail.focusLocalAreaLocation;
      this.defocusLocalAreaLocation = objOfFunctionToInitail.defocusLocalAreaLocation;
    }

    if((this.focusLocalAreaLocation !== undefined) && (this.zoomInToLocalAreaMap !== undefined)){
      this.zoomInToLocalAreaMap(()=>{
        if( (this.state.userLocationX !== null) && (this.state.userLocationY !== null)  ){
          this.focusLocalAreaLocation(this.state.userLocationX,this.state.userLocationY,true);
        }
      });
    }
  }


  // // Setup Map tool botton handler

  setUpMapToolBottonHandler = (zoomInButtonHandler,zoomOutButtonHandler) =>{
    this.zoomInButtonHandler = zoomInButtonHandler;
    this.zoomOutButtonHandler = zoomOutButtonHandler;
  }

  // // Setup Map tool botton handler

  performDefocusLocalAreaLocation = (defocusLocalAreaLocationCallback) =>{
    if(this.defocusLocalAreaLocation === undefined){
      console.log("Error in App.js performDefocusLocalAreaLocation get call before get initialied")
    }else{
      this.defocusLocalAreaLocation(defocusLocalAreaLocationCallback);
    }
  }

  performNavigationToWorldMap = () => {
    this.performDefocusLocalAreaLocation(this.zoomOutToWorldMap);
  }

  performZoomIn = () =>{
    if(this.zoomInButtonHandler === undefined){
      console.log("Error in App.js performZoomIn get call before this.zoomInButtonHandler get initialied")
    }else{
      this.zoomInButtonHandler();
    }
  }

  performZoomOut = () =>{
    if(this.zoomOutButtonHandler === undefined){
      console.log("Error in App.js performZoomOut get call before this.zoomOutButtonHandler get initialied")
    }else{
      this.zoomOutButtonHandler();
    }
  }

  // Map tool botton handler




  
















  // Setting Function

  toggleLocatePositionWithBLE = () =>{

    this.setState({
      locatePositionWithBLE:!this.state.locatePositionWithBLE
    })

  }

  toggleBackgroundScanning= () =>{

    this.setState({
      backgroundScanning:!this.state.backgroundScanning
    })

  }

  toggleAcceptNotification= () =>{

    this.setState({
      acceptNotification:!this.state.acceptNotification
    })

  }


  // Setting Function















  // Beacon Function


  /**
   * This function should only be called in constructor
   */
  initialBeacon = () =>{

    Beacons.detectIBeacons();
    Beacons.setForegroundScanPeriod(2600);
    DeviceEventEmitter.addListener("beaconsDidRange",(data)=>{
      // console.log("Found Beacon",data.beacons);
      data.beacons.forEach((element,index) => {
        try {

          let beaconCapture = new BLEbeaconCaptured(
            element.uuid.split("-").join("").toUpperCase(),
            element.major,
            element.minor,
            element.distance
          )
          if((element.distance < 50) && (element.distance > 0)){

            
            if(this.unfilteredBeaconCapturedList.push(beaconCapture) === false){
              console.log("\nFail to add beaconCapture to list beacause beacon is already in list\n")
            }
            
          }else{
            console.log("\nFail to add beaconCapture to list beacause distance value is invalid\n");
          }

        } catch (error) {
          console.log(`\nFail to create beaconCapture obj from Captured beacon ${data.beacon}\n`);
        }

      });
    });

  }


  performScanBeacon = ()=>{
    this.scanBeacon(false);
  }


  performScanBeaconBackground = ()=>{
    this.scanBeacon(true);
  }


  /**
   * This function scan iBeacon
   */
  scanBeacon = (isScanBackGround) =>{
    if(!isScanBackGround){
      this.showLoadingScreen();
    }

    Beacons.startRangingBeaconsInRegion("Region1")
    .then(()=>{
      console.log("Starting reanging");
      setTimeout(()=>{
        Beacons.stopRangingBeaconsInRegion("Region1")
        .then(()=>{
          console.log("Stop reanging");
          this.calculateLocationFromCapturedBeacon()

        }).catch(()=>{
          console.log("Error on stopRangingBeaconsInRegion");
        })
        
      },6000);
    }).catch(()=>{
      console.log("Error on startRangingBeaconsInRegion");
    })
  }


  
  calculateLocationFromCapturedBeacon = async () =>{
    let filteredCapturedList = [];
    let isCalculateResultValid = false;
    let beaconBroadcasterList = undefined;
    this.unfilteredBeaconCapturedList.printDumpString();
    while(this.unfilteredBeaconCapturedList.list.length > 0){
      filteredCapturedList = this.unfilteredBeaconCapturedList.list.filter((eachElement)=>{ 
        if(eachElement.uuid === this.unfilteredBeaconCapturedList.list[0].uuid){
          return true;
        }else{
          return false;
        }
      });

      
      if(filteredCapturedList.length >= 3){

        // fetch Map info from database and calculate location
        let urlToFetch = "http://192.168.1.112:9002/findMapById?mapId=";
        let mapIdQueryString = "A74F32F2E2459288C912D0937D11FE7A";
        let fetchResponse = undefined;
        let fetchResponseInJSON = undefined;
        try {
          fetchResponse = await fetch(urlToFetch+mapIdQueryString);
          fetchResponseInJSON = await fetchResponse.json();
          console.log(fetchResponseInJSON);
          if(!fetchResponseInJSON.hasOwnProperty("errorMessage")){
            let iBeaconDeviceList = fetchResponseInJSON.iBeaconDevice;
            beaconBroadcasterList = iBeaconDeviceList.filter((eachiBeaconDevice)=>{
              if((eachiBeaconDevice.deviceType === "BroadcasterAndScanner") ||  (eachiBeaconDevice.deviceType === "Broadcaster")){
                return true;
              }else{
                return false;
              }
            });

            console.log("\n\nloggin beaconBroadcasterList\n\n");
            console.log(beaconBroadcasterList);
            console.log("\n\nloggin beaconBroadcasterList\n\n");


            // don't foget to multiply distance with 100 to centi meter
            for(let j=0;j<filteredCapturedList.length;j++){
              if(filteredCapturedList[j].minor === 4){
                filteredCapturedList[j].distance *= 54; 
              }else{
                filteredCapturedList[j].distance *= 88; 
              }
            }

            let locationCalculatorObj = new BLElocationCalculator(beaconBroadcasterList,filteredCapturedList);
            if(locationCalculatorObj.isResultLocationValid){
              let currentDate = new Date();
              this.userLocation = {
                mapId:fetchResponseInJSON.mapId,
                x:locationCalculatorObj.possibleSingleResult.x,
                y:locationCalculatorObj.possibleSingleResult.y,
                detectMethod:"iBeacon",
                lastUpdate:currentDate.getTime()
              }
              this.beaconBroadcasterListDetectingUserLocation = beaconBroadcasterList;
            }else{
              this.userLocation = undefined;
            }

          }
        } catch (error) {
          console.log("Error occored in fetch " + error);
          this.userLocation = undefined;
          isCalculateResultValid = false;
        }

      }

      // delete calculated captured beacon from list
      let newUnfilteredBeaconCapturedList = this.unfilteredBeaconCapturedList.list.filter((eachElement)=>{
        if(eachElement.uuid !== this.unfilteredBeaconCapturedList.list[0].uuid){
          return true;
        }else{
          return false;
        }
      });
      this.unfilteredBeaconCapturedList.list = newUnfilteredBeaconCapturedList;
      if(this.userLocation !== undefined){
        break;
      }
      
    }

    if(this.userLocation !== undefined){

      if( (Number.isFinite(this.userLocation.x) === false ) || (Number.isFinite(this.userLocation.y) === false ) ){
        this.userLocation = undefined;
      }

    }


    if(this.userLocation === undefined){
      // fetch last known location and use it
      console.log("fail to calculate new location");
    }else{


      // Update location data to database

        let userLocationObjToUpdate = {
          userId:this.currentUserLocationObj.userId,
          userLastKnownLocation:[
            this.userLocation
          ]
        }

        this.setState({
          userLocationX:this.userLocation.x,
          userLocationY:this.userLocation.y
        })

        try {
      
          let updateLocationFetchResult = await fetch('http://192.168.1.112:9002/updateUserLastKnownLocation', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userLocationObjToUpdate),
          });
    
          let updateLocationFetchResultInJSON = updateLocationFetchResult.json();
    
          console.log("\n\nupdateLocationFetchResult");
          console.log(updateLocationFetchResultInJSON);
    
        } catch (error) {
          console.error("Error occored on updating location")
        }


      // Update location data to database


      
      console.log("calculate location success");
      console.log(this.userLocation);
    }

    this.unfilteredBeaconCapturedList = new BLEbeaconCapturedList();


    

    

    

    this.performHideLoadingScreen();

    

  }
  



  // Beacon Function




















  // Render App

  renderLoadingScreen = () =>{
    if(this.state.isLoadingNavigationLayer){
      return(
        <View
          style={{
            width:Dimensions.get("window").width,
            height:Dimensions.get("window").height,
            position:"absolute",
            top:0,
            left:0,
            elevation:32,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"rgba(0, 0, 0, 0.5)"
          }}
        >

          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{
              zIndex:32
            }} 
          />


        </View>
      )
    }
  }


  renderAppComponent = () =>{
    
    if(this.state.authenState.isLogin){
      return(







        //Passing SharedNavigationState
        <GlobalScreenState.Provider value={{
          initialLoadingScreenFunction:this.initialLoadingScreenFunction
        }}
        >












        <HomeScreenState.Provider value={{
          onFindMyLocationPress:this.fetchMyLocation,
          userLocationMapId:this.state.userLocationMapId,
          userLocationMapName:this.state.userLocationMapName,
          userLocationMapImageLocation:this.state.userLocationMapImageLocation,
          userLocationMapImageSize:this.state.userLocationMapImageSize,
          userLocationMaplatitude:this.state.userLocationMaplatitude,
          userLocationMaplongitude:this.state.userLocationMaplongitude,
          userLocationX:this.state.userLocationX,
          userLocationY:this.state.userLocationY,
          detectMethod:this.state.detectMethod,
          lastUpdate:this.state.lastUpdate,
        }}>












        <MapScreenState.Provider
          value={{
            objBeaconBroadcasterList:this.state.objBeaconBroadcasterList,
            possibleSingleResult:this.state.possibleSingleResult,
            beaconBroadcasterListDetectingUserLocation:this.beaconBroadcasterListDetectingUserLocation,
            userLocation:this.userLocation,
            intialNaviationMapZoom:this.intialNaviationMapZoom,

            

            userLocationMapName:this.state.userLocationMapName,
            userLocationMaplatitude:this.state.userLocationMaplatitude,
            userLocationMaplongitude:this.state.userLocationMaplongitude,
            userLocationX:this.state.userLocationX,
            userLocationY:this.state.userLocationY,
            detectMethod:this.state.detectMethod,
            lastUpdate:this.state.lastUpdate,






            //Map Tool button handler
            
            setUpMapToolBottonHandler:this.setUpMapToolBottonHandler,
            performZoomIn:this.performZoomIn,
            performZoomOut:this.performZoomOut,
            performDefocusLocalAreaLocation:this.performDefocusLocalAreaLocation,
            performNavigationToWorldMap:this.performNavigationToWorldMap,
            performScanBeacon:this.performScanBeacon,
            //Map Tool button handler

          }}
        >











        <SettingScreenState.Provider value={{

          // Locate Position With BLE button handler
          locatePositionWithBLE:this.state.locatePositionWithBLE,
          toggleLocatePositionWithBLE:this.toggleLocatePositionWithBLE,

          // Background Scanning button handler
          backgroundScanning:this.state.backgroundScanning,
          toggleBackgroundScanning:this.toggleBackgroundScanning,

          // Accept Notification button handler
          acceptNotification:this.state.acceptNotification,
          toggleAcceptNotification:this.toggleAcceptNotification,
          
          // Log out button handler
          performLogout:this.performLogout
        
        
        }}>
          

































          <NavigationScreen/>
        









        </SettingScreenState.Provider>
        </MapScreenState.Provider>
        </HomeScreenState.Provider>
        </GlobalScreenState.Provider>



      );
    }else{
      return(
        <AuthenticationLayer performLogin={this.performLogin} />
      );
    }
  }

  
  render(){
    return(
      <View
        style={{
          flex:1
        }}
      >
        <LoadingScreen
          initialLoadingScreenFunction={this.initialLoadingScreenFunction}
        />



        {this.renderAppComponent()}


      </View>
    );
  
  }


  // Render App











}


































const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

