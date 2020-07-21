


export default class Position2D{

  constructor(x,y){
    if((typeof x !== "number") || (typeof y !== "number") ){
      throw "Error on creating class (in Position2D's constructor) x or y is not number"
    }
    this.x = x;
    this.y = y;
  }

}

