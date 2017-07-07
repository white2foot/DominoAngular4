import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  private clockValue = 0;
  private topbottom = 1;
  private dominopoints: string[][];
  private scale = 1;
  private speed = 1;
  private showmenudomino = true;
  private points=[];
  private divs = [{id: 1, divclass:'dominohalf'},{id: 2, divclass:'dominohalf2'}];
  private dommenu = [
    {idd: 1},
    {idd: 2},
    {idd: 3},
    {idd: 4},
    {idd: 5},
    {idd: 6},
  ];

  constructor(){
    this.dominopoints = [];
    this.dominopoints[0] = ['vcenter gcenter'];
    this.dominopoints[1] = ['vtop gright', 'vbottom gleft'];
    this.dominopoints[2] = ['vtop gright', 'vcenter gcenter', 'vbottom gleft'];
    this.dominopoints[3] = ['vtop gleft', 'vtop gright', 'vbottom gleft', 'vbottom gright'];
    this.dominopoints[4] = ['vtop gleft', 'vtop gright', 'vcenter gcenter','vbottom gleft', 'vbottom gright'];
    this.dominopoints[5] = ['vtop gleft', 'vtop gright', 'vcenter gleft', 'vcenter gright', 'vbottom gleft', 'vbottom gright'];
  }

  removeStyleKeyFrame(){
    let styleKeyFrame = document.getElementById("styleKeyFrame");
    if(styleKeyFrame) document.head.removeChild(styleKeyFrame);
  }

  newDomino(){
    this.removeStyleKeyFrame();
    this.clockValue = 0;
    this.points=[];
    this.topbottom = 1;
    this.showmenudomino=true;
  }

  rotationdomino(direction:boolean){
    this.removeStyleKeyFrame();

    let style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'styleKeyFrame';
    
    let rbeg = this.clockValue * 30;
    let rend = direction ? rbeg + 90 : rbeg - 90;

    let keyFrames = '@keyframes rotate'+this.clockValue.toString()+
                    ' {0% {transform: rotate(' + rbeg.toString() +'deg'+
                    ') scale('+this.scale.toString()+
                    ') ;} 100% {transform: rotate('
                    +rend.toString()+'deg'+') scale('+this.scale.toString()+');}}';

    style.innerHTML = keyFrames; 
    document.head.appendChild( style );
    document.getElementById('domino').style.webkitAnimation = 
     'rotate'+this.clockValue.toString()+' '+this.speed.toString()+'s 1 linear forwards';
    
    this.clockValue = direction ? this.clockValue+3 : this.clockValue-3;

    if(this.clockValue==12 && direction) this.clockValue=0;
    if(this.clockValue==-3 && !direction) this.clockValue=9;
  }

  showpoint(di:number, po:number){
    if(di === po) return true;
    return false;
  }

  domadd(countpoint: number){
    this.dominoAdd(this.dominopoints[countpoint-1])
  }

  dominoAdd(pointsArr: string[]){
    for (var item of pointsArr) {
      let txtclass = 'dominopoint ' + item;
      this.points.push({id: 1, divclass: txtclass, halfid: this.topbottom});
    }
    this.topbottomServe();
  }

  topbottomServe(){
    this.topbottom++;
    if (this.topbottom===3) {
      this.topbottom = 1;
      this.showmenudomino=false;
    }
  }

  setSize(rangevalue: number){
    this.scale=rangevalue;
  }

  setSpeed(rangevalue: number){
    let speed = 1/rangevalue;
    speed = Math.floor(speed*10)/10;
    this.speed=speed;
  }

}

