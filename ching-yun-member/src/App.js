import React, { Component } from 'react';
import logo from './img/logo_shallow.png';

import LoginDialog from './LoginDialog';
import MainPage from './MainPage';

import PropTypes from 'prop-types';
import { MuiThemeProvider, withTheme, withStyles } from '@material-ui/core/styles';
import { styles, theme } from './styles';

// material-ui
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { ApolloProvider } from 'react-apollo';
import client from './client';

const App = withTheme()(withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
          me: null, /* {name, username, auth, part} */
          loggedIn: false,
      };
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }

    login(person) {
      this.setState({loggedIn: true, me: person});
    }

    logout() {
      this.setState({loggedIn: false, me: null});
    }
    
    render() {
      const { classes } = this.props;

      return (
        <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <div className={classes.root+" root"}>
            <Grid container className="Nav">
              <Grid item xs={12}>
              <AppBar position="static">
                <Toolbar>
                  <img src={logo} alt="logo" className={classes.logo}/>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    團員專區
                  </Typography>
                  <LoginDialog 
                    login={(person)=>{this.login(person);}} 
                    logout={()=>{this.logout();}} 
                    loggedIn={this.state.loggedIn}
                    me={this.state.me} />
                </Toolbar>
              </AppBar>
              </Grid>
            </Grid>
            
            <MainPage loggedIn={this.state.loggedIn} me={this.state.me}/>
          </div>
        </MuiThemeProvider>
        </ApolloProvider>
      );
    }
  }
));

App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default App;
