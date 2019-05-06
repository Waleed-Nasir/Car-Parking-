

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
      Viewcat:'',
      key:'',
      arrSlots:[]
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
              firebase.database().ref(`users/${user.uid}`).on('value', (usern) => {
                let name = usern.val() 
                  name = Object.values(name)
                 ;
                 console.log(name)
                this.setState({
                     Viewcat: name,
                 })
             })   
             firebase.database().ref(`BookedSide/`).on('value', (usern) => {
              let name = usern.val() 
                // name = Object.values(name)
              //  ;
              //  Object.value()
              this.setState({
                Booltals: name,
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
Slo(Sl){
this.setState({
  Sl: Sl
})

let user=fire.auth().currentUser
console.log(Sl)
 fire.database().ref(`location/${this.state.key}/Space/`).update({
   [Sl]:'booked'
})
fire.database().ref('BookedSide/').push({
  TimeTo: this.state.to,
  TimeFrom:this.state.From,
  Date: this.state.date,
  ByUser: user.uid,
  [Sl]:'booked',
  ByBookedLoc:this.state.key,
  book: Sl,
  Username:this.state.Username[1],
  Name: this.state.Viewname[this.state.key].Location
})
}
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
  this.setState({

    date:''
  })
    alert('Date must Be Greater Than Today`s')
  
    break;
    case totime === fromtime:
    this.setState({

      date:''
    })
    alert('Please Set 1 Hours Different Between From-time To To-time')

    break;
    case date === today:
    case fromtime <= todaytime:
 
    alert('Time Must Be Greater Than Today`s')

    break;
    case totime < fromtime:
    this.setState({

      date:''
    })
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
 setCon(index){
   alert(index)
  //  this.setState({
  //   [index]:'fasle'
  //  })
  //  index.push(false)
 }
  render() {
    return (

 
<div>
<div   className="Toview" id="ss">
        <h1 >Parking Area`s</h1>
        <Table >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
            <TableHeaderColumn>Number</TableHeaderColumn>
        <TableHeaderColumn>Location</TableHeaderColumn>
        <TableHeaderColumn>For Booking</TableHeaderColumn>
           
      </TableRow>
    </TableHeader>

    
    
    <TableBody  displayRowCheckbox={false}>
    {this.state.Viewname?
          Object.keys(this.state.Viewname).map((key,index)=>{
          if( this.state.Viewcat[0] === 'Admin'){
            return<TableRow style={{color:'black'}}>
            <TableRowColumn>{(index+1)}</TableRowColumn>

            <TableRowColumn>{this.state.Viewname[key].Location}
</TableRowColumn>


<TableRowColumn><RaisedButton label="Delet"  primary={true}  onClick={this.Viewdelet.bind(this, key)}></RaisedButton>
</TableRowColumn>


</TableRow>
          }
          else{       
               if( this.state.Viewcat[0] === 'Customer'){

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

  return <div>
     { Object.keys(this.state.Booltals).map((Sc,index)=>{
       console.log(this.state.Booltals[Sc].Date)
       if(this.state.Booltals[Sc].Date=== this.state.date && this.state.Booltals[Sc].TimeFrom === this.state.From || this.state.Booltals[Sc].TimeTo === this.state.to ){
         return    <RaisedButton   primary={true} className="setLeft" disabled={true}>{[Sc].book}</RaisedButton>

       }
       
       })}
  { Object.values(this.state.Viewname[key].Space).map((Sl,index)=>{
      //  return a.push(true)
       if(this.state.date === ''){}else{

      if('booked' === Sl){
            return  <div>
            <RaisedButton   primary={true} className="setLeft" disabled={true}  onClick={this.Slo.bind(this,index)}>{Sl}</RaisedButton>
          
            </div>
          }
        else{
        
          return  <div>
          <RaisedButton   primary={true} className="setLeft" onClick={this.Slo.bind(this,index)}>{Sl +(index+1)}</RaisedButton>
        
          </div>
        }
      }
      
    })}
    {/* {console.log(a)} */}
   
</div>
 }
 
   }):null}
  
        </div>

      </div>
  
  )};
  
 }
export default ParkingArea;

