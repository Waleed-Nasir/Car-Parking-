import React, { Component } from 'react';

import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDm0rNc11rI6lTNbnhAmS3R0r61NVXYXs4",
  authDomain: "online-carparking.firebaseapp.com",
  databaseURL: "https://online-carparking.firebaseio.com",
  projectId: "online-carparking",
  storageBucket: "online-carparking.appspot.com",
  messagingSenderId: "670987470261"
  };

  var fire = firebase.initializeApp(config);
  export const storage =firebase.storage().ref;
  export const auth =firebase.auth();
  export const database =firebase.database();
  
  
  export default fire