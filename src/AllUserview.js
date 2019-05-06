import React, { Component } from 'react';


import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import fire, { database } from './Fire'
import * as firebase from 'firebase'
import RaisedButton from 'material-ui/RaisedButton';

import {Table,
TableBody,
TableHeader,
TableHeaderColumn,
TableRow,
TableRowColumn,
} from 'material-ui/Table';


 class AllUserview extends Component {
  
    constructor(props) {
        super(props);
        this.RemoveNote = this.RemoveNote.bind(this);
    
        this.state = {
   
          Students:'',
         
        };
    }
        componentDidMount(key) {
 
            const datajob = this.state.Viewjobs
            var user = firebase.auth().currentUser;
            // let keys = this.state.key
           
            console.log(user)
            if(AllUserview == null){}
            else{
            fire.auth().onAuthStateChanged(user=>{
                if(user){
                 
    
                    const data = this.state.Students
                    var Studentinfo = firebase.auth().currentUser;
                    let keys = this.state.key
                   
                 firebase.database().ref(`users/`).on('value', (Studentinfo) => {
                  let data = Studentinfo.val()
                  ;
                    this.setState({
                      Students: data
                  })
                //   for (let i in data) {
                //     console.log(i)
                //     console.log(data[i].about)
                //   }
                  })
                    
                   }
                 
                
                
                else{
                    console.log('user is  signed out');
                    
            
            };
        });
    }
            
        
           
        }
        RemoveNote(key){
            // console.log("from the parent: " + noteId);
            this.setState({key:key
})    
            // var user = firebase.auth().currentUser;
            firebase.database().ref(`users/${key}`).remove();
          }

          
      render(){
          return(
              <div>
                  <Table >
          <TableHeader displaySelectAll={false}>
            <TableRow>
            <TableHeaderColumn>Id</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Education</TableHeaderColumn>
        <TableHeaderColumn>Action</TableHeaderColumn>
           
      </TableRow>
    </TableHeader>

    
    
    <TableBody  displayRowCheckbox={false}>
        {this.state.Students ?
          Object.keys(this.state.Students).map((key,index) => {
            if('Customer' === this.state.Students[key].Category){
             return <TableRow style={{color:'black'}}>
                           <TableRowColumn>{(index+1)}</TableRowColumn>
               
                           <TableRowColumn>{this.state.Students[key].Name}</TableRowColumn>

           
             <TableRowColumn>{this.state.Students[key].email}</TableRowColumn>
             <TableRowColumn><RaisedButton label="Delete"  primary={true} onClick={this.RemoveNote.bind(this, key)}></RaisedButton></TableRowColumn>

          
      </TableRow>
        }
        else{
         
        }
      }
      
):
null
          }
        
       
    </TableBody>
  </Table>
              </div>
          )
      }
    }

    export default AllUserview;