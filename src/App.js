import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './SignIn'
import View from './user'
import  {BrowserRouter as Router ,  Route, Link} from 'react-router-dom';
import SignUp from './SignupPage'
import Admin  from './Admin'
class App extends Component {
  render() {
    return (
      <Router>
  <div>
<Route exact path="/" component={SignIn}/>
<Route  path="/signup" component={SignUp}/>
<Route  path="/admin" component={Admin}/>

<Route  path="/user" component={View}/>


</div>
</Router>
    );
  }
}

export default App;
