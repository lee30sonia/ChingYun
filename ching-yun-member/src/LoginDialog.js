import React, { Component } from 'react';

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

import AccountCircle from '@material-ui/icons/AccountCircle';
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
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faKey } from '@fortawesome/free-solid-svg-icons'

library.add(faUserCircle, faKey)


const LoginDialog = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
        open: false,
        snackBarOpen: false,
        username: null,
        password: null
      };   
      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.snackBarClose = this.snackBarClose.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    snackBarClose()
    {
      this.setState({snackBarOpen: false});
    }
  
    login(username, password)
    {
      this.props.login({name: 'Happy'});
      this.setState({snackBarOpen: true});
      /*
      if (success)
      {
        this.props.login(person);
        this.setState({snackBarOpen: true});
      }
      if (failed)
      {
        alert('wrong username/password!');
        this.setState({username: '', password: ''});
      }
      */
      this.handleClose();
    }

    logout()
    {
      this.props.logout();
    }
  
    render() {
      const { classes } = this.props;

      var login = (<Button color="inherit" onClick={this.handleClickOpen}>登入</Button>);
      var logout = (<Button color="inherit" onClick={this.logout}>登出</Button>);
      var button = this.props.loggedIn? logout: login;
      var greet = this.props.loggedIn? (<Button color="inherit">{this.props.me.name}</Button>): (<div></div>);
      return (
        <div>
          {greet}
          {button}
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">登入</DialogTitle>
            <DialogContent>
              <DialogContentText>
                輸入團員專區帳號密碼
              </DialogContentText>
  
              <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <FontAwesomeIcon icon="user-circle" />
                  </Grid>
                  <Grid item>
                    <TextField label="Username" 
                    onChange={(evt) => this.setState({username: evt.target.value})}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <FontAwesomeIcon icon="key" />
                  </Grid>
                  <Grid item>
                    <TextField label="Password" type="password"
                    onChange={(evt) => this.setState({password: evt.target.value})}
                    onKeyPress={ (event)=>{ if(event.key === 'Enter') this.login(this.state.username, this.state.password); }}
                    />
                  </Grid>
                </Grid>

                <br />
                
                <ForgetPass/>
                <NewMember/>

              </div>
  
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                取消
              </Button>
              <Button onClick={() => {this.login(this.state.username, this.state.password);}} 
                color="primary">
                登入
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snackBarOpen}
            autoHideDuration={4000}
            onClose={this.snackBarClose}
          >
            

            <SnackbarContent
              className={classes.success}
              aria-describedby="client-snackbar"
              message={
                <span className={classes.message}>
                  <CheckCircleIcon className="success" />
                  您已成功登入
                </span>
              }
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.snackBarClose}
                >
                  <CloseIcon className={classes.icon} />
                </IconButton>,
              ]}
            />

          </Snackbar>
        </div>
      );
    }
  }
);

const ForgetPass = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
        open: false
      };   
      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

  
    render() {
      const { classes } = this.props;
      return (
        <div>
          <Button onClick={this.handleClickOpen}> 忘記密碼 </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">忘記密碼</DialogTitle>
            <DialogContent>
              <DialogContentText>
                忘記密碼要怎麼辦咧XD
              </DialogContentText>
  
              <div className={classes.margin}>
                

              </div>
  
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                取消
              </Button>
              
            </DialogActions>
          </Dialog>

          
        </div>
      );
    }
  }
);

const NewMember = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
        open: false
      };   
      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

  
    render() {
      const { classes } = this.props;
      return (
        <div>
          <Button onClick={this.handleClickOpen}> 新團員註冊 </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">新團員註冊</DialogTitle>
            <DialogContent>
              <DialogContentText>
                歡迎加入青&#38901;合唱團！
              </DialogContentText>
  
              <div className={classes.margin}>
                請選擇一個帳號
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <TextField label="Username" 
                    onChange={(evt) => this.setState({username: evt.target.value})}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <i className="material-icons">lock</i>
                  </Grid>
                  <Grid item>
                    <TextField label="Password" type="password"
                    onChange={(evt) => this.setState({password: evt.target.value})}
                    onKeyPress={ (event)=>{ if(event.key === 'Enter') this.login(this.state.username, this.state.password); }}
                    />
                  </Grid>
                </Grid>
              </div>
  
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                取消
              </Button>
              
            </DialogActions>
          </Dialog>

          
        </div>
      );
    }
  }
);

export default LoginDialog;