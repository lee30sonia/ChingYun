import React, { Component } from 'react';

import LoginDialog from './LoginDialog';
import MainPage from './MainPage';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import styles from './styles'

// material-ui
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { ApolloProvider } from 'react-apollo';
import client from './client';


const theme = createMuiTheme({
  palette: {
    primary: {main: '#408c8c'},
  },
  status: {
    danger: 'orange',
  },
  /*typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '標楷體',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },*/
});

const App = withTheme()(withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
          me: null,
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
                  <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                  </IconButton>
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

            <MainPage loggedIn={this.state.loggedIn}/>

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
