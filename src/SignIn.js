import React, { Component } from 'react';


import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { black } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase';
import IconButton from 'material-ui/IconButton';
import fire from'./Fire';



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




 class SignIn extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        value: 'a',
        email:'',
        password:'',
        FullName:'',
        CompanyName:'',
        Viewcat:'',

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
 
    SigninStudent(){
      const {email, password} = this.state;

      firebase.auth().signInWithEmailAndPassword(email, password).then((user)=>{
        
        firebase.database().ref(`users/${user.uid}`).on('value', (usern) => {
          let name = usern.val() 
            name = Object.values(name)
           ;
          this.setState({
               Viewcat: name,
           })
           if( 'Admin' === this.state.Viewcat[0]){
            this.props.history.push('/admin') }
 
          else{ this.props.history.push('/user') }

       }) 
                  
                  
                  
               }
              
                  
              ) .catch(error =>{
                this.setState({error});
            
            })
          }
          SignUpStudent(){
            this.props.history.push('/signup') }

          
  
  render() {
    return (

  <div >
  <AppBar
    title="Online-Parking-Registry"
    iconElementLeft={<IconButton></IconButton>}

  />
  
  <div zDepth={5} style={{width:'40%',textAlign:'center',marginLeft:'30%', marginTop:"5%" }}>
   
          <div>
          <div style={{textAlign:'-webkit-center'}}>
          <br/>
       

          <Paper zDepth={5} style={{width:'100%',textAlign:'center', backgroundColor:'#b1b1b15c' }} >
          <h2>SignIn</h2>
<br/>
<form >

             
   
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
   
   <RaisedButton label="Sign-In" primary={true} onClick={()=>this.SigninStudent()} />
   </form>
   <br/>
   <p>For sign Up   <RaisedButton label="Sign-up" primary={true} onClick={()=>this.SignUpStudent()}  />
 </p>
   <br/>
   <div style={{color:'black'}}>{this.state.error.message}</div>
   <br/>
   
   </Paper>
 </div>
          </div>
    </div>
  </div>
  )};
  
 }
export default SignIn;
