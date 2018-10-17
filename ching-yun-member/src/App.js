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
import Hidden from '@material-ui/core/Hidden';

import { ApolloProvider } from 'react-apollo';
import client from './client';

const App = withTheme()(withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
          me: null, /* {name, username, auth, part} */
          loggedIn: false,
          NavOpen: false,
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

    handleMobileNav = (b) => {
      this.setState({NavOpen: b});
      //console.log(b)
    };
    
    render() {
      const { classes } = this.props;

      return (
        <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <div className={classes.root+" root"}>
            <Grid container className="Nav">
              <Grid item xs={12}>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <Hidden smUp><Grid item xs={3}>
                    <IconButton aria-label="Menu" className={classes.menuIcon}
                      onClick={()=>{this.handleMobileNav(true)}}>
                      <MenuIcon />
                    </IconButton>
                  </Grid></Hidden>

                  <Hidden only={['xs']}> <img src={logo} alt="logo" className={classes.logo}/></Hidden>
                  
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
            
            <MainPage loggedIn={true} me={this.state.me} NavOpen={this.state.NavOpen} set={(b)=>{this.handleMobileNav(b)}}/>
          </div>
        </MuiThemeProvider>
        </ApolloProvider>
      );
    }
  }
)); //loggedIn={this.state.loggedIn}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default App;
