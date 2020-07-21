

import BLEbeaconBroadcaster from "./BLEbeaconBroadcaster.native";


export default class BLEbeaconBroadcasterList {

  constructor(){
    this.list = []
  }

  push(broadcaster){
    if(broadcaster instanceof BLEbeaconBroadcaster){
      this.list.push(broadcaster);
      return true;
    }else{
      return false;
    }
  }

  getBroadcaster(index){
    return this.list[index];
  }

  getSize(){
    return this.list.length;
  }

}

