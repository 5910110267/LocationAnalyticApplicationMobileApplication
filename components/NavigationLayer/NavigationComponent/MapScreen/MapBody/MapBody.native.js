import React , {Component, version} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, ImageBackground , PanResponder , Animated} from 'react-native';
import Svg, {Image as SvgImage,Text as SvgText,Circle as SvgCircle} from "react-native-svg"

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

import { GlobalScreenState,HomeScreenState,MapScreenState,SettingScreenState } from "../../../../../SharedNavigationState.native";




export default class MapBody extends Component{


  constructor(props){
    super(props);
    

    this.clientXlocation = 119;
    this.clientYlocation = 300;

    // this.searchedDeviceXlocation = 100;
    // this.searchedDeviceYlocation = 100;

    this.mapImageWidth = 410;
    this.mapImageHeight = 567;

    // this.svgViewPadding = 160;
    this.svgImagePadding = 40;

    this.state = {
      componentDimensionWidth:undefined,
      componentDimensionHeight:undefined,
      shouldRenderBLEbroadcaster:true,       
    }
    

    this.isAnimationRunning = false;

    this.animatedValueLocalAreaMapOpacity = new Animated.Value(0.0);

    this.animatedBLEbroadcasterVisibleValue = new Animated.Value(1.0);
    this.animatedBLEbroadcasterInterpolatedVisibleValue = this.animatedBLEbroadcasterVisibleValue.interpolate({
      inputRange:[0.0,1.0],
      outputRange:["rgba(15,18,173,0.0)","rgba(15,18,173,1.0)"]
    })

    this.animatedScaleCurrentValue = 1.0;
    this.animatedValueScaleDefaultValue = 0.4;
    this.animatedValueScale = new Animated.Value(this.animatedValueScaleDefaultValue);
    
    this.animatedValueScale.addListener((animatedObject)=>{
      this.animatedScaleCurrentValue = animatedObject.value;
      // console.log(`current scale value is ${animatedObject.value}`);
    })


    this.lastXoffset = 0;
    this.lastYoffset = 0;
    this.animatedValueTransition = new Animated.ValueXY(0);
    this.animatedValueTransition.addListener((value)=>{
      // this.lastXoffset = value.x;
      // this.lastYoffset = value.y;
      // console.log(`${this.lastXoffset} \t ${this.lastYoffset}`);
    })
    this.mapPanResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.animatedValueTransition.extractOffset();
        // this.animatedValueTransition.setOffset({x:this.lastXoffset,y:this.lastYoffset});
        // this.animatedValueTransition.setValue({x:0,y:0});
        // this.animatedValueTransition.
      },
      onPanResponderMove:(evt, gestureState) => {
        // if(this.isAnimationRunning){
        //   return false;
        // }

        this.animatedValueTransition.x.setValue(gestureState.dx);
        this.animatedValueTransition.y.setValue(gestureState.dy);

      },
    });
  }

  focusLocation = (xPositionToFocus,yPositionToFocus,shouldFadeIn)=>{
    this.animatedValueTransition.setOffset({x:0,y:0});
    this.animatedValueScale.setValue(this.animatedValueScaleDefaultValue);
    // let xTr = -((this.svgImagePadding/2) + xPositionToFocus - (this.state.componentDimensionWidth/2));
    // let yTr = -((this.svgImagePadding/2) + yPositionToFocus - (this.state.componentDimensionHeight/2))
    let xTr = -((this.svgImagePadding/2) + xPositionToFocus - (this.state.componentDimensionWidth/2));
    let yTr = -((this.svgImagePadding/2) + yPositionToFocus - (this.state.componentDimensionHeight/2))
    
    console.log(`x tr is ${this.state.componentDimensionWidth}\ny tr is ${this.state.componentDimensionHeight}`);
    this.animatedValueTransition.setValue({
      x:xTr,
      y:yTr
    });

    if(shouldFadeIn === true){
      // this.animatedValueLocalAreaMapOpacity.setValue(0.0);

      Animated.parallel([
        Animated.timing(this.animatedValueLocalAreaMapOpacity,{
          toValue:1.0,
          duration:1500,
          useNativeDriver: true,
        }),
        Animated.timing(this.animatedValueScale,{
          toValue:1.0,
          duration:1500,
          useNativeDriver: true,
        })
      ]).start();
      
    }else{
      Animated.timing(this.animatedValueScale,{
        // toValue:this.animatedValueScaleDefaultValue+0.4,
        toValue:1.0,
        duration:1500,
        useNativeDriver: true,
      }).start();
    }


  }

  defocusLocation =(defocusLocalAreaLocationCallback)=>{
    Animated.parallel([
      Animated.timing(this.animatedValueLocalAreaMapOpacity,{
        toValue:0.0,
        duration:1500,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedValueScale,{
        toValue:0.5,
        duration:1500,
        useNativeDriver: true,
      })
    ]).start(()=>{
      if(defocusLocalAreaLocationCallback){
        defocusLocalAreaLocationCallback();
      }
    });
  }

  setComponentDimension = (onLayoutEvent)=>{
    const {x,y,height,width} = onLayoutEvent.nativeEvent.layout;
    console.log(`x tr is ${width}\ny tr is ${height}`);
    this.setState({
      componentDimensionWidth:width,
      componentDimensionHeight:height
    });
    
  }

  setUpHandlerForOutsideRequest = (setupFunction) =>{
    setupFunction(this.handleZoomInRequest,this.handleZoomOutRequest);
  }

  handleZoomInRequest = ()=>{
    if(this.animatedScaleCurrentValue<2.2){
      Animated.timing(this.animatedValueScale,{
        toValue:this.animatedScaleCurrentValue+0.4,
        duration:750,
        useNativeDriver: true,
      }).start();
    }
    
  }

  handleZoomOutRequest = ()=>{

    if(this.animatedScaleCurrentValue>0.6){
      Animated.timing(this.animatedValueScale,{
        toValue:this.animatedScaleCurrentValue-0.4,
        duration:750,
        useNativeDriver: true,
      }).start();
    }
  }

  getRelativeXpositionForIconSize48(x){
    return (x + (this.svgImagePadding/2) - (48/2));
  }
  
  getRelativeYpositionForIconSize48(y){
    return (y + (this.svgImagePadding/2) - 42 );
  }






  
  render(){
    const animatedStyle = {
      transform:[
        {
          scale:this.animatedValueScale
        },
        ...this.animatedValueTransition.getTranslateTransform()
      ]
    }

    const svgStyle = {
      width:this.mapImageWidth + this.svgImagePadding,
      height:this.mapImageHeight + this.svgImagePadding,
    }



    const renderSvgMap = ()=>{

      if((this.state.componentDimensionHeight != undefined) && (this.state.componentDimensionWidth != undefined)){

        return(
          <MapScreenState.Consumer>
          {(MapScreenProps)=>(
            





          <Animated.View // Wrapper View
            style={[mapComponentStyle.wrapper,animatedStyle,{
              opacity:this.animatedValueLocalAreaMapOpacity
            }]}
            onLayout = {()=>{
              this.setUpHandlerForOutsideRequest(MapScreenProps.setUpMapToolBottonHandler);
              MapScreenProps.intialNaviationMapZoom(2,{
                focusLocalAreaLocation:this.focusLocation,
                defocusLocalAreaLocation:this.defocusLocation
              });
            }}
          >
            <Svg 
              style={[svgStyle,{
                borderColor:"#000",
                borderWidth:2,
              }]}
            >
              
              <SvgImage
                x={this.svgImagePadding/2}
                y={this.svgImagePadding/2}
                href={require('./RentedHouse.png')}
                // clipPath="url(#clip)"
              />

              { MapScreenProps.beaconBroadcasterListDetectingUserLocation !== undefined ?
                MapScreenProps.beaconBroadcasterListDetectingUserLocation.map((value,index)=>{
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        opacity:this.animatedBLEbroadcasterVisibleValue
                      }}
                    >
                    <MaterialIcons
                      name="bluetooth-searching" size={48}
                      // color={}
                      style={{
                        position:"absolute",
                        top:this.getRelativeYpositionForIconSize48(value.y),
                        left:this.getRelativeXpositionForIconSize48(value.x),
                        width:48,
                        height:48,
                        color:"#0A79DF",
                        // overflow:"hidden"
                        // zIndex:2
                      }}
                    />
                    </Animated.View>
                  );
                }):null
              }

              {/* {MapScreenProps.beaconBroadcasterListDetectingUserLocation.map((value,index)=>{
                return (
                  <Animated.View
                    key={index}
                    style={{
                      opacity:this.animatedBLEbroadcasterVisibleValue
                    }}
                  >
                  <MaterialIcons
                    name="bluetooth-searching" size={48}
                    // color={}
                    style={{
                      position:"absolute",
                      top:this.getRelativeYpositionForIconSize48(value.y),
                      left:this.getRelativeXpositionForIconSize48(value.x),
                      width:48,
                      height:48,
                      color:"#0A79DF",
                      // overflow:"hidden"
                      // zIndex:2
                    }}
                  />
                  </Animated.View>
                );
              })} */}

              {( (MapScreenProps.userLocationX !== null) && (MapScreenProps.userLocationY !== null) ) ? 
                <MaterialIcons
                  
                  name="location-on" size={48}
                  color="#E8290B"
                  style={{
                    position:"absolute",
                    top:this.getRelativeYpositionForIconSize48(MapScreenProps.userLocationY),
                    left:this.getRelativeXpositionForIconSize48(MapScreenProps.userLocationX),
                    width:48,
                    height:48,
                    // overflow:"hidden"
                    // zIndex:2
                  }}
                />:null
              }


              
              

                



            
            
            </Svg>
          </Animated.View>



          )}
          </MapScreenState.Consumer>

        );
      }
    }

    return(
      <View // Container View
        style={[this.props.style,mapComponentStyle.container]}
        {...this.mapPanResponder.panHandlers}
        onLayout = {this.setComponentDimension}
      >
        {renderSvgMap()}


      </View> // Container View
    );
  }
}


const mapComponentStyle = StyleSheet.create({
  container:{
    // backgroundColor:"rgb(2, 117, 216)",
  },
  wrapper:{
    elevation:1
  },
  zoomInIcon:{
    position:"absolute",
    bottom:72,
    right:16,
    zIndex:2
  },
  zoomOutIcon:{
    position:"absolute",
    bottom:16,
    right:16,
    zIndex:2
  }
  
})