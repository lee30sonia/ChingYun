import React, { Component } from 'react';

import LoginDialog from './LoginDialog';
import MainPage from './MainPage';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import styles from './styles'

import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#408c8c'},
  },
  status: {
    danger: 'orange',
  },


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
      );
    }
  }
));

App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default App;