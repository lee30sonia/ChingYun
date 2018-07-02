import React, { Component } from 'react';

import Announcement from './Announcement';
import Schedule from './Schedule';
import ChatBoard from './ChatBoard';
import People from './People';
import Attendance from './attendance/attendance';

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'


import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
          case 'attendance': main = <Attendance />; break;
          default: main = <div></div>;
        }

        return (
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <List className={classes.list}>
                <ListItem button>
                   <ListItemText primary='公告' onClick={() => {
                      this.setState({main: 'announcement'});
                   }}/>
                </ListItem>
                <ListItem button>
                   <ListItemText primary='練唱進度' onClick={() => {
                      this.setState({main: 'schedule'});
                   }}/>
                </ListItem>
                <ListItem button>
                   <ListItemText primary='討論區' onClick={() => {
                      this.setState({main: 'chatBoard'});
                   }}/>
                </ListItem>
                <ListItem button>
                   <ListItemText primary='通訊錄' onClick={() => {
                      this.setState({main: 'people'});
                  }}/>
                </ListItem>
                <ListItem button>
                   <ListItemText primary='出席表' onClick={() => {
                      this.setState({main: 'attendance'});
                  }}/>
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
