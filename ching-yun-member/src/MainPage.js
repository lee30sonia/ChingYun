import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  //Redirect,
  withRouter
} from 'react-router-dom'

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
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const MainPage = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
          
      }; 
    }
  
    render() {
      const { classes } = this.props;

      if (this.props.loggedIn)
      {
        return (
          <Router>
            <ScrollToTop>
              <Grid container spacing={24}>
                <Grid item xs={3}>
                  <List className={classes.list}> 
                    <NavItem to="/" text="公告"/>
                    <NavItem to="/schedule" text="練唱進度"/>
                    <NavItem to="/chatBoard" text="討論區"/>
                    <NavItem to="/people" text="通訊錄"/>
                    <NavItem to="/attendance" text="出席表"/>
                  </List>
                </Grid>
                <Grid item xs={8}>
              
                  <Switch>
                    <Route exact path="/" component={Announcement}/>
                    <Route path="/schedule" component={Schedule}/>
                    <Route path="/chatboard" component={ChatBoard}/>
                    <Route path="/people" component={People}/>
                    <Route path="/attendance" component={Attendance}/>
                    <Route component={NotFound}/>
                  </Switch>
                
                </Grid>
              </Grid>
            </ScrollToTop>
          </Router>
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

const NavItem = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      
      //var expand = (this.props.expand)? (this.props.open? <ExpandLess /> : <ExpandMore />): (<div></div>);
      return ( 
        <ListItem button component={NavLink} to={this.props.to} exact={!this.props.notExact}
          activeClassName="disabledButton" > 
          <ListItemText primary={this.props.text}/> 
        </ListItem>
      );
    }
});

const NotFound = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.MainPage}>
          <Grid container><Grid item xs={12}>
            <Paper className={classes.Paper}>
              <Typography variant="headline" component="h1" gutterBottom color="primary">
                404 Not Found
              </Typography>
              <p>
                您欲前往的頁面不存在，或正在施工中...
              </p>
            </Paper>
          </Grid></Grid>
        </div>
      );
    }
});

const ScrollToTop = withRouter(
  class extends Component {
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0);
      }
    }
  
    render() {
      return this.props.children;
    }
});
/*
                <ListItem button>
                   <ListItemText primary='練唱進度' onClick={() => {
                      this.setState({main: 'schedule'});
                   }}/>
                </ListItem>
*/

export default MainPage;
