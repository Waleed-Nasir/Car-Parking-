import React, { Component } from 'react';

import fire, { database } from './Fire'

import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { black } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase'
import IconButton from 'material-ui/IconButton';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  tabs: {
   width: 20,
    
  }
};




 class SignUp extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        value: 'a',
        email:'',
        password:'',
        FullName:'',
        CompanyName:'',
        error:{
        message:''
        }
    
      };
    }
  
    handleChange = (value) => {
      this.setState({
        value: value,
      });
    };
     SignupStudent(){
      
       console.log('this.state', this.state)
       const {FullName,email, password} = this.state;
       // firebase.auth().currentUser.uid
       firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
           localStorage.setItem('Name',FullName)
           
        firebase.database().ref('users/').child(user.uid).set({
            Category:'Customer',
            Name: FullName,
            email: email,
            password: password,
        })
           this.props.history.push('/user')}
       )
        
       
       .catch(error =>{
           // console.log('error', error)
           this.setState({error});
       
       })
       
       
     }
    
    addMessage(e){
      e.preventDefault(); // <- prevent form submit from reloading the page
      /* Send the message to Firebase */
      if(SignUp == null){}
      else{
     
       
      }
  }
  Signin(){
  
    this.props.history.push('/')      


}
    
  render() {
    return (

  <div>
  <AppBar
    title="Online-Parking-Registry"
    iconElementLeft={<IconButton></IconButton>}

    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
  
  <div zDepth={5} style={{width:'40%',textAlign:'center',marginLeft:'30%', marginTop:"5%"}}>

            
          <Paper zDepth={5} style={{width:'100%',textAlign:'center',backgroundColor:'#b1b1b15c' }} >
          <h2 style={styles.headline}>SignUp</h2>
<br/>
<form onSubmit={this.addMessage.bind(this)}>

   <TextField 
   type='text'
floatingLabelText="Full-Name"
onChange={event => this.setState({FullName: event.target.value})}
    /><br />
             
   
   <TextField
      hintText="Example@mail.com"
      floatingLabelText="Email"
      onChange={event => this.setState({email: event.target.value})}
      
      type="email"
    /><br />
    <TextField
      hintText="Some-Thing 123"
      floatingLabelText="Password"
      onChange={event => this.setState({password: event.target.value})}
      
      type="password"
   /><br />
   <br />
   <br />
   
   <RaisedButton label="Sign-Up" primary={true} onClick={()=>this.SignupStudent()} />
   </form>
   <br/>
   <p>For sign in   <RaisedButton label="Sign-in" primary={true} onClick={()=>this.Signin()}  />
    </p>
   <br/>
   <div>{this.state.error.message}</div>
   <br/>
   
   </Paper>
 </div>
 </div>
          
  )};
  
 }
export default SignUp;
