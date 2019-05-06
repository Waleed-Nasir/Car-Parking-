

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import SwipeableViews from 'react-swipeable-views';
import fire, { database } from './Fire'
import TimePicker from 'material-ui/TimePicker';
import * as firebase from 'firebase'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import toc from 'material-ui/svg-icons/action/home';
import SvgIcon from 'material-ui/SvgIcon';
import DropDownMenu from 'material-ui/DropDownMenu';
import SignIn from './SignIn';
import {cyan500, darkBlack, white} from 'material-ui/styles/colors';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import DatePicker from 'material-ui/DatePicker';
import BookedSide from './BookedSide';
import index from 'material-ui/TimePicker';
import Admin from './Admin';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#ff7804',
    textColor:'black'

  }
});

 class ParkingArea extends Component {
constructor(){
  super()
    this.state={
      Viewname:'',
      Slots:"",
      valueTo:'',
      valueFrom:'',
      valueDate:'',
      GetInfoBoob:'',
      date:'',
      Booltals:'',
      BookTIme:'',
      Username:'',
      key:'',
      arrSlots:[],
      CheckInfo:''
    }
  
}
  componentDidMount() {
      
    // let keys = this.state.key
     if(ParkingArea == null){}
     else{
     fire.auth().onAuthStateChanged(user=>{
         if(user){
             console.log('user is signed in'+ (user.uid) );
         
             var userj = firebase.auth().currentUser;
///////////////////////////Name////////////////////////////
             firebase.database().ref(`location/`).on('value', (usern) => {
              let name = usern.val() 
            this.setState({
                   Viewname: name,
               })
            })
          
            firebase.database().ref(`users/${user.uid}`).on('value', (usern) => {
              let uname = usern.val() 
                uname = Object.values(uname)
               ;
               console.log(uname)
              this.setState({
                   Username: uname,
               })
           }) 
            //   firebase.database().ref(`users/${user.uid}`).on('value', (usern) => {
            //     let name = usern.val() 
            //       name = Object.values(name)
            //      ;
            //      console.log(name)
            //     this.setState({
            //          Username: name,
            //      })
            //  })   
             firebase.database().ref(`BookedSide/`).on('value', (usern) => {
              let name = usern.val() 
                // name = Object.values(name)
               ;
              //  Object.value()
              this.setState({
                Booltals: name,
               })
           }) 
        //    firebase.database().ref(`BookedSide/`).on('value', (usern) => {
        //     let name = usern.val() 
        //       // name = Object.values(name)
        //      ;
        //     //  Object.value()
        //     this.setState({
        //       CheckInfo: name,
        //      })
        //  }) 
         firebase.database().ref('BookedSide/').on('value', (userb) => {
                      let Bookindata = userb.val() 
                      let dataarray = [];
                 let areakey = [];
                  for(var key in Bookindata){
                    console.log(Bookindata[key])
                    dataarray.push(Bookindata[key]);
                    areakey.push(key);
                    console.log(areakey)
                  }
                    this.setState({
                      CheckInfo:  dataarray
                       })
                    
                       
                   }) 


           
            }
         
         
         else{
             console.log('user is  signed out');
         
     };
 });
     }
  
   }
   Viewdelet(key){
    firebase.database().ref(`location//${key}`).remove();
  
  }
  
  Viewloc(key){
    this.setState({
      key: key
    })

    
// alert(key)
    // alert(key)
    document.getElementById('vive').style.transform='scale(1)'
    // document.getElementById('vive').style.background='#9e9e9e52'
    document.getElementById('ss').style.display='none'

    // document.getElementById("myP").style.visibility = "hidden";
  } 
  Viewclose(){
    document.getElementById('vive').style.transform='scale(0)'
    document.getElementById('ss').style.display='block'

    // document.getElementById("myP").style.visibility = "hidden";
  } 
// Slo(Sl){
// this.setState({
//   Sl: Sl
// })

// let user=fire.auth().currentUser
// console.log(Sl)
//  fire.database().ref(`location/${this.state.key}/Space/`).update({
//    [Sl]:'booked'
// })
// fire.database().ref('BookedSide/').push({
//   TimeTo: this.state.to,
//   TimeFrom:this.state.From,
//   Date: this.state.date,
//   ByUser: user.uid,
//   [Sl]:'booked',
//   ByBookedLoc:this.state.key,
//   book: Sl,
//   Username:this.state.Username[1],
//   Name: this.state.Viewname[this.state.key].Location
// })
// }

SetBooking(key){
  if( this.state.valueTo === '' || this.state.valueFrom === '' || this.state.valueDate === '' ){
    alert('Please Update Time')
  }
  else{
  var todaytime =  new Date().getHours()+":"+new Date().getMinutes()+":"
  console.log(todaytime)

  let totime= this.state.valueTo.getHours()+":"+this.state.valueTo.getMinutes()
  console.log(totime)
let fromtime=  this.state.valueFrom.getHours()+":"+this.state.valueFrom.getMinutes()
 console.log(fromtime)
 let user=fire.auth().currentUser

 var setdaytime = this.state.valueDate.getHours()+":"+this.state.valueDate.getMinutes()+":"
console.log(setdaytime)
var today =  new Date().getFullYear()+":"+ (new Date().getMonth()+1)+":"+ new Date().getDate()

  let date=   this.state.valueDate.getFullYear()+":"+( this.state.valueDate.getMonth()+1)+":"+ this.state.valueDate.getDate()
console.log(date)
console.log(today)

switch(true){
  case date < today:
    alert('Date must Be Greater Than Today`s')
    break;
    case totime === fromtime:
    alert('Please Set 1 Hours Different Between From-time To To-time')
    break;
    case fromtime < setdaytime:
    alert('Time Must Be Greater Than Today`s')
    break;
    case totime < fromtime:
    alert('To Time Is Greater Than From Timw')
    break;

    default:
    this.setState({
      to:totime,
    From:fromtime,
        date:date
      })
}
}
// if(  fromtime === totime || fromtime <= todaytime || fromtime > totime){
//   alert('OOO Chay Time Set kar')
// }
// // this.state.valueDate <= today ||
// else{
// if(  date <= today ){
 
//   this.setState({
//     // to:totime,
//     // from:fromtime,
//     date:''
//   })
//   alert('Date must Be Greater Than Today`s')

// }else{
// this.setState({
//   // to:totime,
//   // from:fromtime,
//   date:date
// })}

}
// componentWillMount(){
//   console.log('lkkk')
//   console.log(this.state.key)
//   // firebase.database().ref(`location/${this.state.key}`).on('value', (usern) => {
//   //   let name = usern.val() 
//   //   console.log(name)
//   //   // Object.keys(name).map((key,index)=>{
//   //   //   return console.log(name[key].Space)
//   //   // })

//   // })
// }
 setCon(index,a){
   alert((index+1))
  //  index.push(index)
    //  this.state.arrSlots.push(false)
a.splice(index, 1, false);
console.log( this.state.arrSlots)
let user=firebase.auth().currentUser 
   console.log(a)
   fire.database().ref('BookedSide/').push({
      TimeTo: this.state.to,
      TimeFrom:this.state.From,
      Date: this.state.date,
      ByUser: user.uid,
      // [Sl]:'booked',
      ByBookedLoc:this.state.key,
      book: index,
      Username:this.state.Username[1],
      Name: this.state.Viewname[this.state.key].Location
    })
  //  this.setState({
  //   arrSlots:a
  //  })
  //  index.push(false)
 }
  render() {
    return (

 
<div>
<div   className="Toview" id="ss">
        <h1 >Parking Area`s</h1>
        <Table >
          <TableHeader displaySelectAll={false}>
            <TableRow>
            <TableHeaderColumn>Number</TableHeaderColumn>
        <TableHeaderColumn>Location</TableHeaderColumn>
        <TableHeaderColumn>For Booking</TableHeaderColumn>
           
      </TableRow>
    </TableHeader>

    
    
    <TableBody  displayRowCheckbox={false}>
    {this.state.Viewname?
          Object.keys(this.state.Viewname).map((key,index)=>{
          if( this.state.Username[0] === 'Admin'){
            return<TableRow style={{color:'black'}}>
            <TableRowColumn>{(index+1)}</TableRowColumn>

            <TableRowColumn>{this.state.Viewname[key].Location}
</TableRowColumn>


<TableRowColumn><RaisedButton label="Delet"  primary={true}  onClick={this.Viewdelet.bind(this, key)}></RaisedButton>
</TableRowColumn>


</TableRow>
          }
          else{       
               if( this.state.Username[0] === 'Customer'){

return  <TableRow style={{color:'black'}}>
<TableRowColumn>{(index+1)}</TableRowColumn>

<TableRowColumn>{this.state.Viewname[key].Location}
</TableRowColumn>


<TableRowColumn><RaisedButton label="Add"  primary={true} onClick={this.Viewloc.bind(this, key)}></RaisedButton>

</TableRowColumn>


</TableRow>

} }
 }): null}
       
    </TableBody>
  </Table>
 
              
        </div>


        

        <div id='vive' className="popup" >
     
        <h1>Parking Area`s</h1>
        <RaisedButton label="Close" className="setRight" primary={true} onClick={() => this.Viewclose()}></RaisedButton>

       <div>
        <MuiThemeProvider muiTheme={muiTheme}>

     
              <TimePicker
                  format="24hr"
                  hintText="From"
                  className="setLeft" 

                  value={this.state.valueFrom}
                  onChange={(event, Time) => this.setState({valueFrom:Time})}     
                       
                />
                <TimePicker
                  format="24hr"
                  hintText="To"
                  className="setLeft" 
                  onChange={(event, Time) => this.setState({valueTo:Time})}     

                  value={this.state.valueTo}
                />
         <DatePicker mode="landscape"      className="setLeft" 
           hintText="Set Date"
  onChange={(event, Date) => this.setState({valueDate:Date})}/>    
          <RaisedButton label="Set" className="setLeft"  primary={true} onClick={() => this.SetBooking()}></RaisedButton>

             </MuiThemeProvider>

        </div>
      <br/>
        <br/>
      <br/>
      <br/>
      
      {this.state.Viewname?
      
        Object.keys(this.state.Viewname).map((key )=>{
        if(this.state.key === key){
  let a =[]
let date=[]
  return <div>
  { Object.keys(this.state.Viewname[key].Space).map((Sl,index)=>{
       a.push(true)
     })}
    {console.log(a)}
   
{this.state.Booltals ?
  Object.keys(this.state.Booltals).map((key)=>{
 a.splice(this.state.Booltals[key].book, 1, false);
// a[this.state.Booltals[key].book+1]= false
date.push(this.state.Booltals[key].Date)
}
): null}

 { Object.values(a).map((Sl,index)=>{
 console.log(date)
//  console.log(this.state.Booltals[key].Date+ a)

      if(Sl === true){
        // console.log(a)

       return  <RaisedButton   primary={true} className="setLeft" onClick={this.setCon.bind(this,index,a)}>Slot{(index+1)}</RaisedButton>
   }
   else{

    if(Sl === false){
      for(var i=0; i<date.length; i++){
      if(date[i] === this.state.date){
        // if(this.state.Booltals[key].TimeFrom === this.state.fromtime || this.state.Booltals[key].TimeTo === this.state.to){
            return  <RaisedButton disabled={true}   primary={true} className="setLeft" onClick={this.setCon.bind(this,index)}>Slot{(index+1)}</RaisedButton>
      }else{
           return  <RaisedButton   primary={true} className="setLeft" onClick={this.setCon.bind(this,index,a)}>Slot{(index+1)}</RaisedButton>
       
         }
       } 
      }else{
         return  <RaisedButton   primary={true} className="setLeft" onClick={this.setCon.bind(this,index,a)}>Slot{(index+1)}</RaisedButton>
     
       
      }
  }
  
  // })
       })}
        {console.log(this.state.CheckInfo)
}
</div>
 }
 
   }):null}
  
        </div>

        {/* if(Sl === true){
         // console.log(a)
 
        return  <RaisedButton   primary={true} className="setLeft" onClick={this.setCon.bind(this,index,a)}>Slot{(index+1)}</RaisedButton>
    }
    else{
 
      if(Sl === false){
 if(this.state.Booltals[key].Date === this.state.date){
   if(this.state.Booltals[key].TimeFrom === this.state.fromtime || this.state.Booltals[key].TimeTo === this.state.to){
       return  <RaisedButton disabled={true}   primary={true} className="setLeft" onClick={this.setCon.bind(this,index)}>Slot{(index+1)}</RaisedButton>
    }else{
      return  <RaisedButton   primary={true} className="setLeft" onClick={this.setCon.bind(this,index,a)}>Slot{(index+1)}</RaisedButton>
  
    }
  } else{
    return  <RaisedButton   primary={true} className="setLeft" onClick={this.setCon.bind(this,index,a)}>Slot{(index+1)}</RaisedButton>

  }
   
  } */}
      </div>
  
  )};
  
 }
export default ParkingArea;

