import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey900,lightGreenA200, pink800, green500, green700} from 'material-ui/styles/colors';
import {cyan500, darkBlack, white} from 'material-ui/styles/colors';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
// #ff7804


const muiTheme = getMuiTheme({
    palette: {
      textColor: white,
      // primary1Color: '#89e81a',
      primary1Color: '#ff7804',
      // primary1Color:'#8eff0a'

    },
      
        
    appBar: {
      height: 50,
    },
  });

ReactDOM.render(

<MuiThemeProvider muiTheme={muiTheme}>


<App />

</MuiThemeProvider>

, document.getElementById('root'));
registerServiceWorker();
