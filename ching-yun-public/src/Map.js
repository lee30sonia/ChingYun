import React, { Component } from 'react';
import {
  //BrowserRouter as Router,
  //Route,
  NavLink,
  //Switch
  //Redirect,
  //withRouter
} from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Map_ = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.MainPage}>
          <Grid container>
            <Grid item xs={0} sm={1} md={1} lg={1} xl={3}></Grid>
            <Grid item xs={12} sm={10} md={10} lg={10} xl={6}>
              <Paper className={classes.Paper}>
                <Typography variant="h5" gutterBottom color="primary" align="center">
                  網站地圖
                </Typography>
                <List>  
                  <ListItem button size="big" component={NavLink} to="/">
                    <ListItemText primary="首頁"/> 
                  </ListItem>    
                  本頁建置中...
                </List>
              </Paper>
            </Grid>
            <Grid item xs={0} sm={1} md={1} lg={1} xl={3}></Grid>
          </Grid>
        </div>
      );
    }
});

export default Map_;
