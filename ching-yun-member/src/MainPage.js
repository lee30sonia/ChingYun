import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'

import Announcement from './Announcement';
import Schedule from './Schedule';
import ChatBoard from './ChatBoard';
import People from './People';
import Attendance from './attendance/attendance';
import LoginDialog from './LoginDialog';

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'
//import injectTapEventPlugin from 'react-tap-event-plugin';
import Auth from './modules/Auth';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';


// remove tap delay, essential for MaterialUI to work properly
//injectTapEventPlugin();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props} {...rest} />
    )
  )}/>
)

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
            <ScrollToTop className={classes.MainPage}>

              <Hidden smUp><SwipeableDrawer
                open={this.props.NavOpen}
                onClose={()=>{this.props.set(false)}}
                onClick={()=>{this.props.set(false)}}
                onOpen={()=>{this.props.set(true)}}
                classes={{
                  paper: classes.mobileDrawer,
                }}
              >
                <NavList/>
              </SwipeableDrawer></Hidden>

              <Drawer
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <NavList/>
              </Drawer>
              
              <Switch>
                <PrivateRoute exact path="/" component={Announcement}/>
                <PrivateRoute path="/schedule" component={Schedule}/>
                <PrivateRoute path="/chatboard" component={ChatBoard}/>
                <PrivateRoute path="/people" component={People}/>
                <PrivateRoute path="/attendance" component={Attendance}/>
                
                <Route component={NotFound}/>
              </Switch>        
                
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

/*
<Switch>
                <PrivateRoute exact path="/" component={Announcement}/>
                <PrivateRoute path="/schedule" component={Schedule}/>
                <PrivateRoute path="/chatboard" component={ChatBoard}/>
                <PrivateRoute path="/people" component={People}/>
                <PrivateRoute path="/attendance" component={Attendance}/>
                <LoggedOutRoute path="/login" component={LoginDialog}/>

                <PrivateRoute component={LoginDialog} path="/login"
                login={(person)=>{this.props.login(person);}} 
                logout={()=>{this.props.logout();}} 
                loggedIn={this.props.loggedIn}
                me={this.props.me} />
                <Route component={NotFound}/>
              </Switch>
*/

/*
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
              */

const NavList = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return ( 
        <List> 
          <NavItem to="/" text="公告"/>
          <NavItem to="/schedule" text="練唱進度"/>
          <NavItem to="/chatBoard" text="討論區"/>
          <NavItem to="/people" text="通訊錄"/>
          <NavItem to="/attendance" text="出席表"/>
        </List>
      );
    }
});

const NavItem = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      
      //var expand = (this.props.expand)? (this.props.open? <ExpandLess /> : <ExpandMore />): (<div></div>);
      return ( 
        <ListItem button component={NavLink} to={this.props.to} exact={!this.props.notExact}
          activeClassName="disabledButton" > 
          <ListItemText primary={this.props.text} className={classes.drawerText} primaryTypographyProps={{color: 'inherit'}}/> 
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
