import React from 'react';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
//import MyRawTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
//import MyRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import MyRawTheme from './theme';

import NavBar from './components/navBar';
import Body from './components/body';

import './app.scss';

const App = React.createClass({
  //the key passed through context must be called "muiTheme"
  childContextTypes : {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
    };
  },

  render() {
    return (
        <div className="app-root">
          <NavBar />
          <Body />
        </div>
    )
  }
});

export default App;
