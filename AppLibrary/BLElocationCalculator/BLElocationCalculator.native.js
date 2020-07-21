

import Position2D from "./include/Position2D.native";
import BLEbeaconCaptured from "./include/BLEbeaconCaptured.native";
import BLEbeaconBroadcaster from "./include/BLEbeaconBroadcaster.native";
import BLEbeaconCapturedList from "./include/BLEbeaconCapturedList.native";
import BLEbeaconBroadcasterList from "./include/BLEbeaconBroadcasterList.native";


export default class BLElocationCalculator{

  constructor(beaconBroadcasterDataObj,beaconCaptureDataObj){

    this.possiblePairOfReult = [];
    this.possibleSingleResult = null;
    this.isResultLocationValid = false;

    // extract from json object

    let beaconBroadcasterList = new BLEbeaconBroadcasterList();
    for(let i=0;i<beaconBroadcasterDataObj.length;i++){
      console.log(beaconBroadcasterDataObj[i]);
      try {
        let beaconBroadcaster = new BLEbeaconBroadcaster(
          beaconBroadcasterDataObj[i].x,
          beaconBroadcasterDataObj[i].y,
          beaconBroadcasterDataObj[i].uuid,
          beaconBroadcasterDataObj[i].beaconMajor,
          beaconBroadcasterDataObj[i].beaconMinor    
        )
        beaconBroadcasterList.push(beaconBroadcaster);
        console.log(`\nbeaconBroadcaster index ${i} is added to beaconBroadcasterList\n`);
      } catch (error) {
        console.log(error);
        console.log(`\nFail to add beaconBroadcaster to beaconBroadcasterList at index ${i}\n`);
      }
      
    }

    console.log(beaconBroadcasterList);

    let beaconCapturedList = new BLEbeaconCapturedList();
    for(let i=0;i<beaconCaptureDataObj.length;i++){
      console.log(beaconCaptureDataObj[i]);
      try {
        let beaconCapture = new BLEbeaconCaptured(
          beaconCaptureDataObj[i].uuid,
          beaconCaptureDataObj[i].major,
          beaconCaptureDataObj[i].minor,
          beaconCaptureDataObj[i].distance
        )
        beaconCapturedList.push(beaconCapture);
        console.log(`\nbeaconCapture index ${i} is added to beaconCaptureList\n`);
      } catch (error) {
        console.log(`\nFail to add beaconCapture to beaconCaptureList at index ${i}\n`);
      }
      
    }

    console.log(beaconCapturedList);


    this.objBeaconBroadcasterList = beaconBroadcasterList;
    this.objBeaconCapturedList = beaconCapturedList;

    for(let i=0;i<beaconBroadcasterList.getSize();i++){
      let currentBeaconCaptureAcumulator = beaconCapturedList.isInCaptureList(beaconBroadcasterList.getBroadcaster(i));
      if(currentBeaconCaptureAcumulator !== null){

        console.log("Acumulator match");
        console.log(beaconBroadcasterList.getBroadcaster(i));
        console.log("Acumulator uuid" + currentBeaconCaptureAcumulator.uuid);
        console.log("Acumulator major" + currentBeaconCaptureAcumulator.major);
        console.log("Acumulator minor" + currentBeaconCaptureAcumulator.minor);
        console.log("Acumulator distance" + currentBeaconCaptureAcumulator.distance);


        

        for(let j=i+1;j<beaconBroadcasterList.getSize();j++){
          let currentBeaconCapture = beaconCapturedList.isInCaptureList(beaconBroadcasterList.getBroadcaster(j));
          if(currentBeaconCapture !== null){

            console.log("Performer match " + currentBeaconCapture.distance);
            console.log(beaconBroadcasterList.getBroadcaster(j));
            console.log("Performer uuid" + currentBeaconCapture.uuid);
            console.log("Performer major" + currentBeaconCapture.major);
            console.log("Performer minor" + currentBeaconCapture.minor);
            console.log("Performer distance" + currentBeaconCapture.distance);


            let distanceBetween2Broadcaster = this.calculateDistanceOf2PointIn2D(beaconBroadcasterList.getBroadcaster(i),beaconBroadcasterList.getBroadcaster(j))
            let distanceToBroadcaster1 = currentBeaconCaptureAcumulator.distance;
            let distanceToBroadcaster2 = currentBeaconCapture.distance;

            // distanceToBroadcaster1 + distanceToBroadcaster2 must greater than distanceBetween2Broadcaster
            if((distanceToBroadcaster1 + distanceToBroadcaster2) > distanceBetween2Broadcaster){
              console.log("Calculating possible pair location");
              console.log(beaconBroadcasterList.getBroadcaster(i));
              console.log("currentBeaconCaptureAcumulator.distance is " + currentBeaconCaptureAcumulator.distance);
              console.log(beaconBroadcasterList.getBroadcaster(j));
              console.log("currentBeaconCapture.distance is " + currentBeaconCapture.distance);
              this.calculatePosiblePairLocation(beaconBroadcasterList.getBroadcaster(i),
                                                beaconBroadcasterList.getBroadcaster(j),
                                                currentBeaconCaptureAcumulator.distance,
                                                currentBeaconCapture.distance
              )

              if(this.possibleSingleResult === null){// no possibleSingleResult yet
                if(this.possiblePairOfReult.length === 4){
                  this.choose1From4PossibleLocation();
                }else if(this.possiblePairOfReult.length>4){
                  console.error("\n\nError occored after calculatePosiblePairLocation with no possibleSingleResult yet -> possiblePairOfReult.size is > 4\n\n");
                }// else do nothing
              }else{
                if(this.possiblePairOfReult.length === 2){
                  this.choose1From2PossibleLocation();
                }else if(this.possiblePairOfReult.length>2){
                  console.error("\n\nError occored after calculatePosiblePairLocation with possibleSingleResult -> possiblePairOfReult.size is > 2\n\n");
                }// else do nothing
              }

            }else{
              console.log("Dist invalid");
              console.log("Dist b1 " + distanceToBroadcaster1);
              console.log("Dist b2 " + distanceToBroadcaster2);
              console.log("Dist btw " + distanceBetween2Broadcaster);
            }
          }// End of if(currentBeaconCapture !== null)
        }// End of for(let j=i+1;j<beaconBroadcasterList.getSize();j++)
      }// End of if(currentBeaconCaptureAcumulator !== null)
    }// End of for(let i=0;i<beaconBroadcasterList.getSize();i++)

    if(this.possibleSingleResult !== null){
      this.isResultLocationValid = true;
      console.log(
        "\nThe Valid location is\n" +
        "x: " + this.possibleSingleResult.x +
        "y: " + this.possibleSingleResult.y
      )
    }

  }

























  choose1From4PossibleLocation(){
    if(this.possiblePairOfReult.length != 4){
      console.error("\n\nError on calling choose 1 from 4 posible location with size is not equal to 4 no calculation perform\n\n");
      return;
    }
    let pos4 = this.possiblePairOfReult.pop();
    let pos3 = this.possiblePairOfReult.pop();
    let pos2 = this.possiblePairOfReult.pop();
    let pos1 = this.possiblePairOfReult.pop();
    
    let dis = [];
    dis.push(this.calculateDistanceOf2PointIn2D(pos1, pos3)); //disPos1Pos3
    dis.push(this.calculateDistanceOf2PointIn2D(pos1, pos4)); //disPos1Pos4
    dis.push(this.calculateDistanceOf2PointIn2D(pos2, pos3)); //disPos2Pos3
    dis.push(this.calculateDistanceOf2PointIn2D(pos2, pos4)); //disPos2Pos4
    
    let minIndex = 0;
    for(let i=1;i<4;i++){
      if(dis[i] < dis[minIndex]){
        minIndex = i;
      }
    }

    let midPoint;

    switch(minIndex){
      case 0:
        midPoint = this.calculateMiddleOf2PointIn2D(pos1, pos3);
        break;
      case 1:
        midPoint = this.calculateMiddleOf2PointIn2D(pos1, pos4);
        break;
      case 2:
        midPoint = this.calculateMiddleOf2PointIn2D(pos2, pos3);
        break;
      case 3:
        midPoint = this.calculateMiddleOf2PointIn2D(pos2, pos4);
        break;
      default:
        midPoint = null;
        console.error("\n\nError on choosing 1 from 4 midpoint in switch case\n\n");
    }

    if(midPoint === null){
      console.log("\npossibleSingleResult is set to null in choose1From4PossibleLocation function\n");
    }else{
      console.log("\npossibleSingleResult is set to Valid Point in choose1From4PossibleLocation function\n");
    }
    this.possibleSingleResult = midPoint;
  }












  choose1From2PossibleLocation(){
    if((this.possiblePairOfReult.length !== 2) || (this.possibleSingleResult === null)){
      console.error("\n\nError on calling choose 1 from 2 posible location with size is not equal to 2 or possibleSingleResult is still null\n\n");
      return;
    }
    let pos2 = this.possiblePairOfReult.pop();
    let pos1 = this.possiblePairOfReult.pop();

    let dis1 = this.calculateDistanceOf2PointIn2D(pos1,this.possibleSingleResult);
    let dis2 = this.calculateDistanceOf2PointIn2D(pos2,this.possibleSingleResult);

    if(dis1 < dis2){
      this.possibleSingleResult = this.calculateMiddleOf2PointIn2D(pos1, this.possibleSingleResult);
    }else{
      this.possibleSingleResult = this.calculateMiddleOf2PointIn2D(pos2, this.possibleSingleResult);
    }

    console.log("\npossibleSingleResult get updated in choose1From2PossibleLocation function\n");

  }









  calculateDistanceOf2PointIn2D(pos1,pos2){
    let result = Math.sqrt( ((pos1.x - pos2.x)**2) + ((pos1.y - pos2.y)**2) );
    return result;
  }


  calculateMiddleOf2PointIn2D(pos1,pos2){
    let middleX = (pos1.x + pos2.x)/2;
    let middleY = (pos1.y + pos2.y)/2;
    return new Position2D(middleX, middleY);
  }










  calculatePosiblePairLocation(broadcaster1
                              ,broadcaster2
                              ,distToBroadcaster1
                              ,distToBroadcaster2
  ){

    let x,y;
    let x1 = broadcaster1.x;
    let x2 = broadcaster2.x;
    let y1 = broadcaster1.y;
    let y2 = broadcaster2.y;
    let d1 = distToBroadcaster1;
    let d2 = distToBroadcaster2;

    let c1 = (d1**2) - (x1**2) - (y1**2); 
    let c2 = (d2**2) - (x2**2) - (y2**2);

    let c3 = 2*(x2 - x1);
    let c4 = 2*(y2 - y1);
    let c5 = c1-c2;

    if( (c3 === 0.0) && (c4 === 0.0) ){
      console.error("\n\nError occored in calculatePosiblePairLocation with 2 broadcaster has same coordinate no calculation perform\n\n");
    }else if( c3 === 0.0 ){
      y = c5/c4;

      // result 1
      x = -(  Math.sqrt( (d1**2) - ((y-y1)**2) )   ) + x1;
      try {
        let position = new Position2D(x, y);
        this.possiblePairOfReult.push(position);
      } catch (error) {
        console.error("\n\nError on pushing first of possible pair location to the list\n\n");
      }
      

      // result 2
      x = (  Math.sqrt( (d1**2) - ((y-y1)**2) )   ) + x1;
      try {
        let position = new Position2D(x, y);
        this.possiblePairOfReult.push(position);
      } catch (error) {
        console.error("\n\nError on pushing second of possible pair location to the list\n\n");
      }


    }else if( c4 == 0.0 ){
      x = c5/c3;

      // result 1
      y = -(Math.sqrt( (d1**2) - ((x-x1)**2) ) ) + y1;
      try {
        let position = new Position2D(x, y);
        this.possiblePairOfReult.push(position);
      } catch (error) {
        console.error("\n\nError on pushing first of possible pair location to the list\n\n");
      }

      // result 2
      y = (Math.sqrt( (d1**2) - ((x-x1)**2) ) ) + y1;
      try {
        let position = new Position2D(x, y);
        this.possiblePairOfReult.push(position);
      } catch (error) {
        console.error("\n\nError on pushing second of possible pair location to the list\n\n");
      }


    }else{
      let a = (c4**2) + (c3**2);
      let b = (2*x2*c3*c4) - (2*c5*c4) - (2*y2*(c3**2));
      let c = (c5**2) - 2*x2*c3*c5 - c2*(c3**2);

      let sqrtRootResult = (b**2) - (4*a*c);
      if(sqrtRootResult >= 0.0){
        sqrtRootResult = Math.sqrt(sqrtRootResult);

        // result 1
        y = (-b + sqrtRootResult)/(2*a);
        x = (c5 - (c4*y))/c3;
        try {
          let position = new Position2D(x, y);
          this.possiblePairOfReult.push(position);
        } catch (error) {
          console.error("\n\nError on pushing first of possible pair location to the list\n\n");
        }

        // result 2
        y = (-b - sqrtRootResult)/(2*a);
        x = (c5 - (c4*y))/c3;
        try {
          let position = new Position2D(x, y);
          this.possiblePairOfReult.push(position);
        } catch (error) {
          console.error("\n\nError on pushing second of possible pair location to the list\n\n");
        }

        
      }else{// else do nothing due to result is unsolvable
        console.error("\n\nError on calculate possible pair location result is unsolvable\n\n");
      }
    }// all 4 possible events has been checked

  }
  

}
















































const dummyBLEbroadcasterData01 = [
  {
    x:20,
    y:200,
    uuid:"505355486174456E0000000000410F03",
    major:1,
    minor:1,
  },
  {
    x:20,
    y:380,
    uuid:"505355486174456E0000000000410F03",
    major:1,
    minor:2,
  },
  {
    x:280,
    y:380,
    uuid:"505355486174456E0000000000410F03",
    major:1,
    minor:3,
  }
]

// const dummyBLEbroadcasterData02 = [
//   {
//     x:200,
//     y:200,
//     uuid:"505355486174456E0000000000410F03",
//     major:1,
//     minor:1,
//   },
//   {
//     x:200,
//     y:400,
//     uuid:"505355486174456E0000000000410F03",
//     major:1,
//     minor:2,
//   },
//   {
//     x:400,
//     y:400,
//     uuid:"505355486174456E0000000000410F03",
//     major:1,
//     minor:3,
//   }
// ]












const dummyBLEcapturedData01 = [
  {
    uuid:"505355486174456E0000000000410F03",
    major:1,
    minor:1,
    distance:60,
    rssi:-66,
  },
  {
    uuid:"505355486174456E0000000000410F03",
    major:1,
    minor:2,
    distance:160,
    rssi:-66,
  },
  {
    uuid:"505355486174456E0000000000410F03",
    major:1,
    minor:3,
    distance:180,
    rssi:-66,
  }
]

// const dummyBLEcapturedData02 = [
//   {
//     uuid:"505355486174456E0000000000410F03",
//     major:1,
//     minor:1,
//     distance:141,
//     rssi:-66,
//   },
//   {
//     uuid:"505355486174456E0000000000410F03",
//     major:1,
//     minor:2,
//     distance:141,
//     rssi:-66,
//   },
//   {
//     uuid:"505355486174456E0000000000410F03",
//     major:1,
//     minor:3,
//     distance:141,
//     rssi:-66,
//   }
// ]