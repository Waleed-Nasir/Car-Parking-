

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';


import fire, { database } from './Fire'
import TimePicker from 'material-ui/TimePicker';
import * as firebase from 'firebase'

import RaisedButton from 'material-ui/RaisedButton';

import SignIn from './SignIn';

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
      to:'',
      From:'', 
      CurrTime:'',
      CurrDate:'',
      
    }
  
}
  componentDidMount() {
      
    // let keys = this.state.key
     if(ParkingArea == null){}
     else{
     fire.auth().onAuthStateChanged(user=>{
         if(user){
         
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
              this.setState({
                   Username: uname,
               })
           }) 
  
             firebase.database().ref(`BookedSide/`).on('value', (usern) => {
              let name = usern.val() 
 
              this.setState({
                Booltals: name,
               })
           }) 

       


           
            }
         
         
         else{
         
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

    document.getElementById('vive').style.transform='scale(1)'
    document.getElementById('ss').style.display='none'
    setTimeout(()=>{document.getElementById('outimg').style.display='none'},10000)
    // document.getElementById('outimg').style.display='none'

  } 
  Viewclose(){
    document.getElementById('vive').style.transform='scale(0)'
    document.getElementById('ss').style.display='block'
    this.setState({ valueFrom:'', valueTo:'', valueDate:'',date:''})

  } 

SetBooking(key){
  if( this.state.valueTo === '' || this.state.valueFrom === '' || this.state.valueDate === '' ){
    alert('Please set-Booking Time')
  }
  else{
  let todaytime =  new Date().getHours()+":"+new Date().getMinutes()
let totime= this.state.valueTo.getHours()+":"+this.state.valueTo.getMinutes()
let fromtime=''



 let user=fire.auth().currentUser

 let setdaytime = this.state.valueDate.getHours()+":"+this.state.valueDate.getMinutes()
let today =  new Date().getFullYear()+":"+ (new Date().getMonth()+1)+":"+ new Date().getDate()

  let date=   this.state.valueDate.getFullYear()+":"+( this.state.valueDate.getMonth()+1)+":"+ this.state.valueDate.getDate()
this.setState({
  CurrTime:todaytime,
  CurrDate:today,
})
if(this.state.valueFrom.getHours()===0){
  fromtime=  0-this.state.valueFrom.getHours()+":"+0+ this.state.valueFrom.getMinutes()}
  else{
if(this.state.valueFrom.getMinutes()<=9){
 fromtime=  this.state.valueFrom.getHours()+":"+0+ this.state.valueFrom.getMinutes()}
else{ fromtime=  this.state.valueFrom.getHours()+":"+this.state.valueFrom.getMinutes()
}}
console.log(fromtime)
console.log(totime)
if(date === today){
  if(  fromtime <= todaytime ){
    alert('**Please Set Start Booking Time /Must be Greater Than Current Time....** ')
    this.setState({date:''})
}
  else{ 
    if( fromtime > totime){
      alert('"⚠"👋 **End-Time Must be Greater Than Start-Time**"⚠"')
    this.setState({date:''})
}
  else
  { this.setState({ to:totime, From:fromtime, date:date})
}}
}
else{
if(  date < today ){
 this.setState({date:''})
  alert('Date must Be Greater Than Today`s')
}else{
  if(fromtime === totime){    alert('Give Approx 1 Hours different Between Start-Time TO  End-Time')
  this.setState({date:''})

}
  else{
    if( fromtime  > totime){
      alert('"⚠"👋 **End-Time Must be Greater Than Start-Time**"⚠"')
      this.setState({date:''})
   }else{
      this.setState({ to:totime, From:fromtime, date:date})

}}
}
}
}
}
 setCon(index,a){

a.splice(index, 1, false);
let user=firebase.auth().currentUser 
   fire.database().ref('BookedSide/').push({
      TimeTo: this.state.to,
      TimeFrom:this.state.From,
      Date: this.state.date,
      ByUser: user.uid,
      // [Sl]:'booked',
      ByBookedLoc:this.state.key,
      book: index,
      Username:this.state.Username[1],
      Name: this.state.Viewname[this.state.key].Location,
      BookingTime: this.state.CurrTime+ '  ' +'👏'+ '  '  + this.state.CurrDate,
    })
 
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
        <TableHeaderColumn>Slots Numbers</TableHeaderColumn>
        
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

<TableRowColumn>{this.state.Viewname[key].Num}</TableRowColumn>

<TableRowColumn><RaisedButton label="Delete"  primary={true}  onClick={this.Viewdelet.bind(this, key)}></RaisedButton>

</TableRowColumn>


</TableRow>
          }
          else{       
               if( this.state.Username[0] === 'Customer'){

return  <TableRow style={{color:'black'}}>
<TableRowColumn>{(index+1)}</TableRowColumn>

<TableRowColumn>{this.state.Viewname[key].Location}
</TableRowColumn>

<TableRowColumn>{this.state.Viewname[key].Num}</TableRowColumn>

<TableRowColumn><RaisedButton label="Add"  primary={true} onClick={this.Viewloc.bind(this, key)}></RaisedButton>

</TableRowColumn>


</TableRow>

} }
 }): null}
       
    </TableBody>
  </Table>
 
              
        </div>


        

        <div id='vive' className="popup" >
     
        <h1>    {this.state.Viewname?
          Object.keys(this.state.Viewname).map((key,index)=>{
            if(this.state.key === key){

            return this.state.Viewname[key].Location
            }


 }): null}
 </h1>
        <RaisedButton label="Close" className="setRight" primary={true} onClick={() => this.Viewclose()}></RaisedButton>

       <div>
        <MuiThemeProvider muiTheme={muiTheme}>

        {/* this.state.valueFrom.getMilliseconds() */}
              <TimePicker
                  hintText="From"
                  className="setLeft" 
                  minutesStep={5}
                  value={this.state.valueFrom}
                  onChange={(event, Time) => this.setState({valueFrom:Time})}     
                  autoOk={true}
                />
                <TimePicker
                  hintText="To"
                  minutesStep={5}
                  className="setLeft" 
                  onChange={(event, Time) => this.setState({valueTo:Time})}     
                  autoOk={true}
                  value={this.state.valueTo}
                />
                  
         <DatePicker mode="landscape"      className="setLeft" 
           hintText="Set Date" autoOk={true}
  onChange={(event, Date) => this.setState({valueDate:Date})}   
                                 value={this.state.valueDate}/> 
  
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
          if(this.state.date === ''){
          }else{
  let a =[]
let date=[]
  return <div>
  { Object.keys(this.state.Viewname[key].Space).map((Sl,index)=>{
       a.push(true)
     })}
   
{this.state.Booltals ?
  Object.keys(this.state.Booltals).map((key)=>{
 if(this.state.key === this.state.Booltals[key].ByBookedLoc){
   if(this.state.date === this.state.Booltals[key].Date){

    if((this.state.From <= this.state.Booltals[key].TimeFrom && this.state.to >=  this.state.Booltals[key].TimeFrom)||(this.state.From >= this.state.Booltals[key].TimeFrom && this.state.From <= this.state.Booltals[key].TimeTo)){

  console.log('work if')
  a.splice(this.state.Booltals[key].book, 1, false);

  } 
      else{  
        a.splice(this.state.Booltals[key].book, 1, true);

  }

  }
}

}
): null}
 {this.state.date ?
  Object.keys(this.state.date).map((key)=>{
 date.splice(this.state.date, 1, false);

}
): null}

 { Object.values(a).map((Sl,index)=>{

      if(Sl === true){

       return  <RaisedButton   primary={true} className="setLeft" onClick={this.setCon.bind(this,index,a)}>Slot{(index+1)}</RaisedButton>
   }
   else{

    if(Sl === false){
      return  <RaisedButton disabled={true}   primary={true} className="setLeft" onClick={this.setCon.bind(this,index)}>Slot{(index+1)}</RaisedButton>
      }
      else{
           return  <RaisedButton   primary={true} className="setLeft" onClick={this.setCon.bind(this,index,a)}>Slot{(index+1)}</RaisedButton>
       
         
       
      }

  }
  
  // })
       })}

</div>
 }}
 
   }):null}
  <div  className="Info" id="outimg"> 
  </div>
        </div>

      </div>
  
  )};
  
 }
export default ParkingArea;

