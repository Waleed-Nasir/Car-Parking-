import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
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
import index from 'material-ui/DropDownMenu';



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
 class Addparkloc extends Component {
  
    constructor(props) {
        super(props);
        let message = {}
        this.state = {
        location:'',
            Slots:""

        };
        
      
      }
     
 
    
 

      componentDidMount() {
      
       // let keys = this.state.key
        if(Addparkloc == null){}
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
      Addlocation(){
 if(this.state.Slots === ''){
     alert('Fill The Location Adding Form')
 }else{
           firebase.database().ref('location/').push({
         Location:this.state.location,
         Num:this.state.Slots,
          Space : (()=>{

            let arr = [];
            arr.length = this.state.Slots;
            arr.fill('Slots')

            return arr
          })()
          })
          this.setState({
              location:'',
              Slots:''
          })
          alert(' Location Added Succesfully')

      }}

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

 
        <div  style={{width:'85%',float:'right'}} >
      
     
       <Paper           style={{width:'50%',float:'left', backgroundColor:'#2c2831',marginLeft:'15%', marginTop:'12%' ,height:'410px', padding:'4%'}}>
       <h1>Add Location</h1>
             
       <TextField 
       type='text'
       floatingLabelText="Add Location"
       style={{width:'95%'}}
       value={this.state.location}

       onChange={event => this.setState({location: event.target.value})} 
       />
       <TextField 
       type='number'
       floatingLabelText="Add Slots"
       style={{width:'80%'}}
       value={this.state.Slots}

       onChange={event => this.setState({Slots: event.target.value})} />
      
       <RaisedButton label="Add" primary={true} onClick={() => this.Addlocation()}></RaisedButton>
       </Paper>  
     
  </div>

  )};
  
 }
export default Addparkloc;
