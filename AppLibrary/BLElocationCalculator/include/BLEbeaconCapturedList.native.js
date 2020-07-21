
import BLEbeaconCaptured from "./BLEbeaconCaptured.native";
import BLEbeaconBroadcaster from "./BLEbeaconBroadcaster.native";


export default class BLEbeaconCapturedList{
  constructor(){
    this.list = []
  }

  push(captured){
    if(captured instanceof BLEbeaconCaptured){

      let isAlreadyInList = false;
      for(let i=0;i<this.list.length;i++){

        if(
          captured.uuid === this.list[i].uuid &&
          captured.major === this.list[i].major &&
          captured.minor === this.list[i].minor
        ){
          isAlreadyInList = true;
          break;
        }
      }

      if(isAlreadyInList === false){
        this.list.push(captured);
        return true;
      }
      
      return false;


    }else{
      return false;
    }
  }

  isInCaptureList(broadcaster){
    if(broadcaster instanceof BLEbeaconBroadcaster){
      
      for(let i=0;i<this.list.length;i++){

        if(
          broadcaster.uuid === this.list[i].uuid &&
          broadcaster.major === this.list[i].major &&
          broadcaster.minor === this.list[i].minor
        ){
          return this.list[i];
        }
      }

      return null;

    }else{
      return null;
    }
  }

  getCapture(index){
    return this.list[index];
  }

  getSize(){
    return this.list.length;
  }

  printDumpString(){
    for(let i=0;i<this.list.length;i++){
      console.log("Number " + i);
      this.list[i].printDumpString();
    }
  }

}

