import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import SwipeableViews from 'react-swipeable-views';
import fire, { database } from './Fire'
import * as firebase from 'firebase'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import toc from 'material-ui/svg-icons/action/home';
import SvgIcon from 'material-ui/SvgIcon';
import DropDownMenu from 'material-ui/DropDownMenu';
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



import {grey900,lightGreenA200, pink800, green500, green700} from 'material-ui/styles/colors';
import ParkingArea from './ParkingArea';
import BookedSide from './BookedSide';
import Feedback from './Feedback';



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
 class View extends Component {
  
    constructor(props) {
        super(props);
        let message = {}
        this.state = {
          Viewjobs:'',
          InfCom:'',
          
          slideIndex: 0,
          logged: true,
          open: false,

          count: +1,
          Viewname:[],
          Applyjobs:'',
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
  
 

      componentDidMount(key) {
        this.setState({
          key: key
        })
        const data = this.state.Viewjobs
        var user = firebase.auth().currentUser;
        // let keys = this.state.key
        if(View == null){}
        else{
        fire.auth().onAuthStateChanged(user=>{
            if(user){
            
                var userj = firebase.auth().currentUser;
///////////////////////////Name////////////////////////////
                firebase.database().ref(`users/${user.uid}`).on('value', (usern) => {
                 let name = usern.val() 
                   name = Object.values(name)
                  ;
                 this.setState({
                      Viewname: name,
                  })
              }) 


               }
            
            
            else{
            
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
            <Tab label="Book Parking" value={0}  />
               </Tabs>
                  <Tabs onChange={this.handleChange} value={this.state.slideIndex} inkBarStyle={{background: 'white'}}>
                <Tab label="View Booking" value={1} />
             </Tabs>
             <Tabs  onChange={this.handleChange}value={this.state.slideIndex} inkBarStyle={{background: 'white'}}>
                <Tab label="Feedback" value={2} />
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
       
  <ParkingArea/>
          <div  style={styles.slide}>
         
          <BookedSide/>
          </div>
    <div style={styles.slide}>
   
           <Feedback/>
 </div>
 <div style={styles.slide}>
   
   <Feedback/>
</div> 
         
          
        </SwipeableViews>
        
      </div>
  </div>
  )};
  
 }
export default View;
