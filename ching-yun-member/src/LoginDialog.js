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
import Slide from '@material-ui/core/Slide';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faKey, faLock } from '@fortawesome/free-solid-svg-icons'

import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

library.add(faUserCircle, faKey, faLock)

function Transition(props) {
  return <Slide direction="left" {...props} />;
}

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
  
    async login(username, password, client)
    {
       if(!username || !password)
          return;
       const { data } = await client.query({
          query: gql`
            query login($u: String!, $p: String!) {
             login(username: $u, password: $p) {
               match
               person {
                  name
               }
            }
         }`,
         variables: {
            "u": username,
            "p": password
         }
       })
          .catch( err => {
             console.log(err);
          });
       // this.props.login({name: 'Happy'});
       // this.setState({snackBarOpen: true});
      if (data.login.match)
      {
        this.props.login(data.login.person.name);
        this.setState({snackBarOpen: true});
      }
       else
      {
        alert('wrong username/password!');
        this.setState({username: '', password: ''});
      }
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
         <ApolloConsumer>
         { client => (
         
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
                    onKeyPress={ (event)=>{ if(event.key === 'Enter') this.login(this.state.username, this.state.password, client); }}
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
              <Button onClick={() => {
                 this.login(this.state.username, this.state.password, client);
              }} 
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

               )}
            </ApolloConsumer>
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
        step: 0,
        auth: '',
        username: '',
        password: ''
      };   
      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.authCheck = this.authCheck.bind(this);
      this.signup = this.signup.bind(this);
    }
  
    handleClickOpen = () => {
      this.setState({ step: 1 });
    };
  
    handleClose = () => {
      this.setState({ step: 0 });
    };

    authCheck(auth)
    {
      this.setState({ step: 2 });
    }
    async signup(username, password, client)
    {
       if(!username || !password)
          return;

       const { data } = await client.mutate({
          mutation: gql`
            mutation signup($u: String!, $p: String!) {
               signup(username: $u, password: $p) 
         }`,
         variables: {
            "u": username,
            "p": password
         }
       })
          .catch( err => {
             console.log(err);
          });

      if(data.signup) {
         alert("You've registered successfully!");
         this.handleClose();
      }
      else {
         alert("This username has already been used.");
      }
    }

  
    render() {
      const { classes } = this.props;
      return (
         <ApolloConsumer>
            { client => (

        <div>
          <Button onClick={this.handleClickOpen}> 新團員註冊 </Button>

          <Dialog
            open={this.state.step==1}
            onClose={this.handleClose}
          >
            <DialogTitle>新團員註冊：Step {this.state.step}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                請輸入錄取通知上的授權碼
              </DialogContentText>
  
              <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <FontAwesomeIcon icon="lock" />
                  </Grid>
                  <Grid item>
                    <TextField label="Authentication code" 
                    onChange={(evt) => this.setState({auth: evt.target.value})}
                    onKeyPress={ (event)=>{ if(event.key === 'Enter') this.authCheck(this.state.auth); }}
                    />
                  </Grid>
                </Grid>
              </div>
  
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                取消
              </Button>

              <Button onClick={() => {this.authCheck(this.state.auth);}} 
                color="primary">
                下一步
              </Button>              
            </DialogActions>
          </Dialog>


          <Dialog
            open={this.state.step==2}
            onClose={this.handleClose}
            TransitionComponent={Transition}
            keepMounted
          >
            <DialogTitle>新團員註冊：Step {this.state.step}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                請選擇一組帳號密碼
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
                    onKeyPress={ (event)=>{ 
                       if(event.key === 'Enter') 
                          this.signup(this.state.username, this.state.password, client);
                    }}
                    />
                  </Grid>
                </Grid>
              </div>
  
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                取消
              </Button>

              <Button onClick={ () => {
                 this.signup(this.state.username, this.state.password, client);
              }} 
                color="primary">
                註冊
              </Button>
            </DialogActions>
          </Dialog>

          
        </div>
         ) }</ApolloConsumer>
      );
    }
  }

);

export default LoginDialog;
