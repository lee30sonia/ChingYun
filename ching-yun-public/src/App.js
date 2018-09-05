import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
  //Redirect,
  //withRouter
} from 'react-router-dom'
import logo from './img/logo_shallow.png'

import PropTypes from 'prop-types';
import { MuiThemeProvider, withTheme, withStyles } from '@material-ui/core/styles';
import { styles, theme, Navtheme } from './styles';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';


const App = withTheme()(withStyles(styles)(
  class extends Component {    
    render() {
      const { classes } = this.props;

      return (
        <MuiThemeProvider theme={theme}>
          <Router>
          <div className={classes.root}>
            <Navigation />
            
            <Switch>
              <Route exact={true} path="/" component={Index}/>
              <Route path="/about" component={About}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
          </Router>
        </MuiThemeProvider>
      );
    }
  }
));

const Navigation = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return ( 
        <MuiThemeProvider theme={Navtheme}>
          <Grid container>
            <Grid item xs={12}>
              <AppBar position="static" className={classes.Nav}>
                <Toolbar>
                  <List className={classes.NavList}>
                    <ListItem className={classes.NavListLogo} component={NavLink} to="/"> <img src={logo} className={classes.logo}/> </ListItem>
                    <NavItem to="/" text="首頁"/>
                    <NavItem to="/about" text="關於"/>
                  </List>
                </Toolbar>
              </AppBar>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      );
    }
});

const NavItem = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return ( 
        <ListItem button component={NavLink} to={this.props.to} className={classes.NavListItem} > 
          <ListItemText className={classes.NavListText} primary={this.props.text}> 
          </ListItemText> 
        </ListItem>
      );
    }
});

const Index = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return (
        <Paper className={classes.Paper}>
          首頁
        </Paper>
      );
    }
});

class About extends Component {
  render() {
    return (
      <div>
        關於
      </div>
    );
  }
}

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1> 404 </h1>
        <p>
          您欲前往的頁面不存在，或正在施工中...
        </p>
      </div>
    );
  }
}


App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default App;
