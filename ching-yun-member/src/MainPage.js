import React, { Component } from 'react';

import Announcement from './Announcement';
import Schedule from './Schedule';
import ChatBoard from './ChatBoard';
import People from './People';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import green from '@material-ui/core/colors/green';
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

const MainPage = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
          main: 'announcement'
      }; 
    }
  
    render() {
      const { classes } = this.props;

      if (this.props.loggedIn)
      {
        var main;
        switch(this.state.main)
        {
          case 'announcement': main = <Announcement />; break;
          case 'schedule': main = <Schedule />; break;
          case 'chatBoard': main = <ChatBoard />; break;
          case 'people': main = <People />; break;
          default: main = <div></div>;
        }

        return (
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <List className={classes.list}>
                <ListItem button>
                  <ListItemText primary='公告' onClick={() => {this.setState({main: 'announcement'})}}/>
                </ListItem>
                <ListItem button>
                  <ListItemText primary='練唱進度' onClick={() => {this.setState({main: 'schedule'})}}/>
                </ListItem>
                <ListItem button>
                  <ListItemText primary='討論區' onClick={() => {this.setState({main: 'chatBoard'})}}/>
                </ListItem>
                <ListItem button>
                  <ListItemText primary='通訊錄' onClick={() => {this.setState({main: 'people'})}}/>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs>
              {main}
            </Grid>
          </Grid>
        );
      }
      else 
      {
        return (
          <div> 請先登入 </div>
        );
      }
    }
  }
);

export default MainPage;