import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import SwipeableViews from 'react-swipeable-views';
import fire, { database } from './Fire'
import * as firebase from 'firebase'
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';
import SignIn from './SignIn';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import index from 'material-ui/DropDownMenu';



import ParkingArea from './ParkingArea';
import BookedSide from './BookedSide';
import Feedback from './Feedback';
import AddparkLoc from './AddparkLoc';
import AllUserview from './AllUserview'
import FeedbackAm from './FeedbackAm';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 0.0,
    backgroundColor:'black'
  },
  customWidth: {
    width: 300,
  },
}



// 
 class Admin extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
        location:'',
          slideIndex: 0,
          Viewname:''
        };
      
      }
     
    
      handleChange = (event, logged) => {
        this.setState({logged: logged});
       
      };
      handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
      };
     
    
 

      componentDidMount() {
      
       // let keys = this.state.key
        if(Admin == null){}
        else{
        fire.auth().onAuthStateChanged(user=>{
            if(user){
                console.log('user is signed in'+ (user.uid) );
            
                var userj = firebase.auth().currentUser;
///////////////////////////Name////////////////////////////
                firebase.database().ref(`users/${user.uid}`).on('value', (usern) => {
                 let name = usern.val() 
                   name = Object.values(name)
                  ;
                  console.log(name)
                 this.setState({
                      Viewname: name,
                  })
              }) 

           
               }
            
            
            else{
                console.log('user is  signed out');
            
        };
    });
        }

       
      }


/////////////Sign out//////////////
      toggleSignIn(e) {
        
            // [START signout]
      
            firebase.auth().signOut()
        
            let Signout = new Promise((resolve, reject) => {
               
              resolve('Success!');
              if (resolve) {
        
                this.props.history.push("/")
        
              }
        
              reject("Error!");
            });
           
          }
     
  render() {

    return (

 <div>
 <div
              className="meanView"

      >

      
          <MenuItem onClick={this.handleClose}><h4>Name:  <span style={{fontSize:'25px'}}>{this.state.Viewname[1]}</span></h4></MenuItem>
          <RaisedButton label="Sign-out" primary={true} onClick={() => this.toggleSignIn()}/>
         
         
         <br/>
         <br/>
         <br/>
         <br/>
              {/* ////////////////////tabs/////////////////// */}
          <Tabs onChange={this.handleChange}value={this.state.slideIndex}  inkBarStyle={{background: 'white'}} >
            <Tab label="Add Parking Location" value={0}  />
               </Tabs>
                  <Tabs onChange={this.handleChange} value={this.state.slideIndex} inkBarStyle={{background: 'white'}}>
                <Tab label="View Parking Locations" value={1} />
             </Tabs>
           
                        <Tabs  onChange={this.handleChange}value={this.state.slideIndex} inkBarStyle={{background: 'white'}}>
                <Tab label="All Bookings" value={2} />
                        </Tabs>
                        <Tabs  onChange={this.handleChange}value={this.state.slideIndex} inkBarStyle={{background: 'white'}}>
                <Tab label="All User" value={3} />
                        </Tabs>
                        <Tabs  onChange={this.handleChange}value={this.state.slideIndex} inkBarStyle={{background: 'white'}}>
                <Tab label="Feedback" value={4} />
                        </Tabs>
                              </div>
            
            
              <AppBar 
               iconElementLeft={<IconButton></IconButton>}
              style={{width:'85%',float:'right'}} title="Online Parking System"  />


        <div  style={{width:'85%',float:'right'}} >
      
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}

          className="Swipback"


        >
       <AddparkLoc/>
      

          <div  style={styles.slide}>
          <ParkingArea/>

        
          </div>
    <div style={styles.slide}>
   
    <BookedSide/>
 </div>
 <div style={styles.slide}>
  <AllUserview/>
</div>
<div style={styles.slide}>
   
   <FeedbackAm/>
</div>
         
          
        </SwipeableViews>
        
      </div>
  </div>
  )};
  
 }
export default Admin;
