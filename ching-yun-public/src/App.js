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
import Index from './IndexPage'
import About from './About'

import PropTypes from 'prop-types';
import { MuiThemeProvider, withTheme, withStyles } from '@material-ui/core/styles';
import { styles, theme, Navtheme } from './styles';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CloseIcon from '@material-ui/icons/Close';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

var classNames = require('classnames');

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
              <Route exact path="/" component={Index}/>
              <Route exact path="/about" component={About}/>
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
    constructor(props) {
      super(props);
      this.state={
        expandOpen: null,
        MobileNavOpen: false
      };   
      this.handleExpandOpen = this.handleExpandOpen.bind(this);
      this.handleMobileNav = this.handleMobileNav.bind(this);
    }

    handleExpandOpen = (b) => {
      this.setState({expandOpen: b});
      //console.log(b)
    };

    handleMobileNav = (b) => {
      this.setState({MobileNavOpen: b});
      //console.log(b)
    };

    render() {
      const { classes } = this.props;
      return ( 
        <MuiThemeProvider theme={Navtheme}>
          <Grid container>
            <Grid item xs={12}>
              <AppBar position="static" className={classes.Nav}><Toolbar>
                <Grid container component={List} alignItems="center" className={classes.NavList}>

                  <Hidden smUp><Grid xs={3}>
                    <IconButton aria-label="Menu" className={classes.menuIcon}
                      onClick={()=>{this.handleMobileNav(true)}}>
                      <MenuIcon />
                    </IconButton>
                    <MobileNav open={this.state.MobileNavOpen} set={(b)=>{this.handleMobileNav(b)}}/>
                  </Grid></Hidden>

                  <Grid item xs={4} lg={3} xl={4}>
                    <ListItem component={NavLink} to="/"> 
                      <img src={logo} alt="logo" className={classes.logo}/> 
                    </ListItem>
                  </Grid>
                  
                  <Hidden xsDown>
                    <Grid item sm={12} md={10} lg={7} xl={4}><Grid container spacing={8}>
                      <NavItem to="/" text="首頁"/>
                      <NavItem to="/about" text="關於青韵" set={this.handleExpandOpen} notExact={true} onMouseLeave={()=>{this.handleExpandOpen(null)}}
                      sublist={(
                        <Menu open={Boolean(this.state.expandOpen)} anchorEl={this.state.expandOpen} 
                          disableAutoFocusItem classes={{paper:classes.SubNavMenu}}
                          onMouseLeave={()=>{this.handleExpandOpen(null)}} >
                          <MenuList onMouseLeave={()=>{this.handleExpandOpen(null)}}>
                            <Grid container onMouseLeave={()=>{this.handleExpandOpen(null)}}>
                              <NavItem to="/about" text="關於青韵" submenu={true} onClick={()=>{this.handleExpandOpen(null)}}/>
                              <NavItem to="/about/teachers" text="音樂指導" submenu={true} onClick={()=>{this.handleExpandOpen(null)}}/>
                              <NavItem to="/about/history" text="演出大事" submenu={true} onClick={()=>{this.handleExpandOpen(null)}}/>
                            </Grid>
                          </MenuList> 
                        </Menu> )}/>
                      <NavItem to="/performances" text="精彩演出"/>
                      <NavItem to="/rent" text="場地出租"/>
                      <NavItem to="/publications" text="委託創作"/>
                      <NavItem to="/contact" text="聯絡我們"/>
                    </Grid></Grid>
                  </Hidden>
                  
                  <Hidden smDown><Grid item md={2} lg={2} xl={4}>
                    <Grid container><Grid sm={6} xl={9}></Grid><Grid sm={6} xl={3}>
                    <Button>登入</Button>
                    </Grid></Grid>
                  </Grid></Hidden>

                </Grid> 
              </Toolbar></AppBar>
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
      
      //var expand = (this.props.expand)? (this.props.open? <ExpandLess /> : <ExpandMore />): (<div></div>);
      return ( 
        <Grid item xs={this.props.submenu? 12: 2}>
          <ListItem button component={NavLink} to={this.props.to} exact={!this.props.notExact}
            className={classes.NavListItem+(this.props.inset?(" "+classes.inset):"")} activeClassName="disabledButton"
            onMouseEnter={(e)=>{if(this.props.set) this.props.set(e.currentTarget);}} 
            onMouseLeave={()=>{if(this.props.set) this.props.set(null);}} > 
            <ListItemText className={classes.NavListText} primary={this.props.text}> 
            </ListItemText> 
            {this.props.sublist}
          </ListItem>
        </Grid>
      );
    }
});

const MobileNav = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
        open: false
      };
    }

    render() {
      const { classes } = this.props;

      return ( 
          <SwipeableDrawer
            open={this.props.open}
            onClose={()=>{this.props.set(false)}}
            onClick={()=>{this.props.set(false)}}
            onOpen={()=>{this.props.set(true)}}
          >
            <div
              tabIndex={0}
              role="button"
              onKeyDown={()=>{this.props.set(false)}}
              className={classes.MobileNav}
            >
              <IconButton color="inherit" onClick={()=>{this.props.set(false)}} aria-label="Close" className={classes.alignLeft}>
                <CloseIcon className={classes.menuIcon} />
              </IconButton>
              <div className={classes.list}>
                <List>
                  <NavItem to="/" text="首頁" submenu={true}/>
                  <NavItem to="/about" text="關於青韵" notExact={true} submenu={true} />
                      <NavItem to="/about" text="關於青韵" submenu={true} inset={true}/>
                      <NavItem to="/about/teachers" text="音樂指導" submenu={true} inset={true}/>
                      <NavItem to="/about/history" text="演出大事" submenu={true} inset={true}/>

                  <NavItem to="/performances" text="精彩演出" submenu={true}/>
                  <NavItem to="/rent" text="場地出租" submenu={true}/>
                  <NavItem to="/publications" text="委託創作" submenu={true}/>
                  <NavItem to="/contact" text="聯絡我們" submenu={true}/>
                </List>
              </div>
            </div>
          </SwipeableDrawer>
      );
    }
});

const NotFound = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return (
        <Paper className={classes.Paper}>
          <h1> 404 </h1>
          <p>
            您欲前往的頁面不存在，或正在施工中...
          </p>
        </Paper>
      );
    }
});

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default App;
