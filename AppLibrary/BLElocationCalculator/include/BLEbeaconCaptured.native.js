


export default class BLEbeaconCaptured{
  constructor(uuid,major,minor,distance){
    if((typeof uuid !== "string") || (typeof major !== "number") || (typeof minor !== "number") || (typeof distance !== "number")){
      throw "Error on creating class (in BLEbeaconCaptured's constructor) uuid is not string or major, minor or range is not number"
    }
    this.uuid = uuid;
    this.major = major;
    this.minor = minor;
    this.distance = distance;
  
  }


  printDumpString(){
    console.log("uuid is " + this.uuid);
    console.log("major is " + this.major);
    console.log("minor is " + this.minor);
    console.log("distance is " + this.distance);
  }
}

