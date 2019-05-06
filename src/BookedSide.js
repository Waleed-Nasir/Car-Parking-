import React, { Component } from 'react';


import Paper from 'material-ui/Paper';

import fire, { database } from './Fire'

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
import './App.css';

 class BookedSide extends Component {

  constructor(){
    super()
      this.state={
        ViewBooking:'',
        Viewcat:''
      }
    
  }
    componentDidMount() {
        
      // let keys = this.state.key
       if(BookedSide == null){}
       else{
       fire.auth().onAuthStateChanged(user=>{
           if(user){
           
               var userj = firebase.auth().currentUser;
  ///////////////////////////Name////////////////////////////
               firebase.database().ref(`BookedSide/`).on('value', (usern) => {
                let booked = usern.val() 
              this.setState({
                     ViewBooking:booked,
                 })
              })
            
              firebase.database().ref(`users/${user.uid}`).on('value', (usern) => {
                let name = usern.val() 
                  name = Object.values(name)
                 ;
                this.setState({
                     Viewcat: name,
                 })
             }) 
              }
           
           
           else{
           
       };
   });
       }
    
     }
     DelSlot(key){
     

      firebase.database().ref(`BookedSide/${key}`).remove();
      fire.database().ref(`location/${this.state.ViewBooking[key].ByBookedLoc}/Space/`).update({
        [this.state.ViewBooking[key].book]:'Slots'
     })
     }
  render() {
    return (

 
<div>
<div     className="Toview2">
          <h1>View Booking</h1>

         {this.state.ViewBooking ?
           Object.keys(this.state.ViewBooking).map((key)=>{
            if( this.state.Viewcat[0] === 'Admin'){
              return<div id={key} zDepth={5} className="BookView" >
              <Paper zDepth={1} style={{ height:'80px',color:'black', margin:'0px'  }} ><br/>
              <span  className="fSize">{this.state.ViewBooking[key].Name}</span>
               <h4>User Name: {this.state.ViewBooking[key].Username}</h4></Paper>
              <div zDepth={1} style={{ color:'White' , height:'140px' }} >
              <h4>Booked Time/Date: {this.state.ViewBooking[key].BookingTime}</h4>

              <h4>Booking Date: {this.state.ViewBooking[key].Date}</h4>
              <h5>Start Time:  <span  className="fSize"> {(this.state.ViewBooking[key].TimeFrom)}mins</span><br/>
              Ending Time:  <span  className="fSize"> {this.state.ViewBooking[key].TimeTo}mins</span><br/>
              Lot Number:   <span  className="fSize"> {(this.state.ViewBooking[key].book+1)}</span><br/>
                </h5>
              </div> 
             <br/>
       
     
              <RaisedButton label="Delete" primary={true} onClick={this.DelSlot.bind(this,key)} />
     </div>
          }else{
            if( this.state.Viewcat[0] === 'Customer'){
              let user = firebase.auth().currentUser
              if(this.state.ViewBooking[key].ByUser === user.uid){
               return<div id={key} zDepth={5} className="BookView" >
               <Paper zDepth={1} style={{ height:'80px',color:'black', margin:'0px'  }} ><br/>
               <span  className="fSize">{this.state.ViewBooking[key].Name}</span>
                <h4>User Name: {this.state.ViewBooking[key].Username}</h4></Paper>
               <div zDepth={1} style={{ color:'White' , height:'140px' }} >
               <h4>Booked Time/Date: {this.state.ViewBooking[key].BookingTime}</h4>

               <h4>Booking Date: {this.state.ViewBooking[key].Date}</h4>
<h5>Start Time:  <span s className="fSize"> {(this.state.ViewBooking[key].TimeFrom)}mins</span><br/>
               Ending Time:  <span  className="fSize"> {this.state.ViewBooking[key].TimeTo}mins</span><br/>
               Lot Number:   <span  className="fSize"> {(this.state.ViewBooking[key].book+1)}</span><br/>
                 </h5>
               </div> 
              <br/>
        
      
               <RaisedButton label="Delete" primary={true} onClick={this.DelSlot.bind(this,key)} />
      </div>
              }
              else{
              }
            }
          }
         }):null
        }
          </div>
      </div>
  
  )};
  
 }
export default BookedSide;
