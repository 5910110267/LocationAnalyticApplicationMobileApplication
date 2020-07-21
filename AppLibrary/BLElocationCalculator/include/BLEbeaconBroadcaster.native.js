
import Position2D from "./Position2D.native";


export default class BLEbeaconBroadcaster extends Position2D{
  constructor(x,y,uuid,major,minor){
    super(x,y);
    if((typeof uuid !== "string") || (typeof major !== "number") || (typeof minor !== "number")){
      console.log("typeof uuid is " + (typeof uuid) );
      console.log("typeof major is " + (typeof major) );
      console.log("typeof minor is " + (typeof minor) );
      
      throw "Error on creating class (in BLEbeaconBroadcaster's constructor) uuid is not string or major or minor is not number"
    }
    this.uuid = uuid;
    this.major = major;
    this.minor = minor;
  }

}

