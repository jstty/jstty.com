import React from 'react';
import Footer from './components/footer';
import AddTodo from './containers/addTodo';
import VisibleTodoList from './containers/visibleTodoList';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
//import MyRawTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
import MyRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

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
        <div>
          <AddTodo />
          <Footer />
          <VisibleTodoList />
        </div>
    )
  }
});

export default App;
