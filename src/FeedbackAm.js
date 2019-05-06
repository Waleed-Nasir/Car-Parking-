import React, { Component } from 'react';

import './App.css';


import TextField from 'material-ui/TextField';
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

 class FeedbackAm extends Component {
constructor(){
  super()
  this.state={
    Feedback:'',
    Replay:'',
    ViewFeed:[],
    new:''
  }
}
componentDidMount() {
      
  // let keys = this.state.key
   if(FeedbackAm == null){}
   else{
   fire.auth().onAuthStateChanged(user=>{
       if(user){
           firebase.database().ref(`users/${user.uid}`).on('value', (usern) => {
            let name = usern.val() 
              name = Object.values(name)
             ;
            this.setState({
                 Viewcat: name,
             })
         }) 
           firebase.database().ref(`FeedBack/`).on('value', (usern) => {
            let Feed = usern.val() 
         this.setState({
                 ViewFeed: Feed,
             })
          
         }) 
       
      
          }
       
       
       else{
       
   };
});
   }

  
 }

delet(key){
  firebase.database().ref(`FeedBack/${key}`).remove();

}
sendre(key){
  this.setState({
    key:key
  })

  let user = firebase.auth().currentUser
  // alert('gon').
  if(this.state.Replay == ''){
    alert('Write Something')
  }
  else{
  fire.auth().onAuthStateChanged(user=>{
      if(user){

  firebase.database().ref('FeedBack/').child(key).update({
    Uid: this.state.ViewFeed[key].Uid,
Feedback :this.state.ViewFeed[key].Feedback,
Replay:this.state.Replay
  })
}
})
}
}   
addMessage(e){
  e.preventDefault(); // <- prevent form submit from reloading the page
  /* Send the message to Firebase */
  if(FeedbackAm == null){
    alert('Please Write Something')

  }
  else{
  fire.auth().onAuthStateChanged(user=>{
      if(user){

         }
       
      
      
      else{
          
  
  };
});
  }
  
}
  render() {
    return (

 
<div >
<div  className="Toview" id="yy">
<h1>Replay FeedBack</h1>

       
</div>
      

       <div    className="Toview1">
   
        {this.state.ViewFeed ? 
          Object.keys(this.state.ViewFeed).map((key)=>{
         

              return  <div className="FeedbackBiew">
              Name:<span s className="fSize1">{this.state.ViewFeed[key].Name}</span><br/>
FeedBack:   {this.state.ViewFeed[key].Feedback}<br/>
{this.state.ViewFeed[key].Replay ?
<div>
Replay:    {this.state.ViewFeed[key].Replay } <hr/>            
      <RaisedButton label="Delete" className="setRight" onClick={this.delet.bind(this,key)} primary={true} ></RaisedButton>
</div>
  :
  <form>
    <p>Replay Here
  <TextField 
  type='text'
  floatingLabelText="Write Some thing"
  onChange={event => this.setState({Replay: event.target.value})} /><RaisedButton label="Send" className="setRight" onClick={this.sendre.bind(this,key)} primary={true} ></RaisedButton>
  
  </p>  </form>
  
}

</div>
              
              
 }): <div  className="Toview" id="yy">
 <br/>
 <br/>
 <br/>
<h1 style={{textAlign:'center'}}> Feedback Empty</h1>
<br/>
<br/>
<br/>

 </div>
}
      </div>        



      </div>
  
  )};
  
 }
export default FeedbackAm;

