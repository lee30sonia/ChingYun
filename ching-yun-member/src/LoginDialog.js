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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faKey, faLock } from '@fortawesome/free-solid-svg-icons'

import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

library.add(faUserCircle, faKey, faLock)

function TransitionLeft(props) {
  return <Slide direction="left" {...props} />;
}

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
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
                  username
                  auth
                  part
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
        this.props.login(data.login.person);
        this.setState({snackBarOpen: true});
         this.handleClose();
      }
       else
      {
        alert('wrong username/password!');
        this.setState({username: '', password: ''});
      }
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
      var greet = this.props.loggedIn? (<PersonalPage me={this.props.me}/>): (<div></div>);
      //var greet = this.props.loggedIn? (<Button color="inherit">{this.props.me.name}</Button>): (<div></div>);
         
      return (
         <ApolloConsumer>
         { client => (
         
        <div>
          {greet}{button}
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
                    onKeyPress={ (event) => { 
                       if(event.key === 'Enter') 
                          this.login(this.state.username, this.state.password, client); }}
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

const PersonalPage = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
      };
      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen(){
      this.setState({ open: true });
    }

    handleClose(){
      this.setState({ open: false });
    }

    render() {
      const { classes } = this.props;

      return (
        <div className="personal">
          <Button color="inherit" onClick={this.handleClickOpen}>{this.props.me.name}</Button>
          <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={TransitionUp}
          >
            
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  個人資料
                </Typography>
                
              </Toolbar>
            </AppBar>
           
            <DialogContent>
              
            </DialogContent>
          </Dialog>
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
        password: '',
        checkPass: '',
        person_auth: '',
        person_part: '',
        name: ''
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

    async authCheck(auth, client)
    {
      if(!auth)
          return;
       const { data } = await client.query({
          query: gql`
            query getAuth($num: String!) {
             getAuth(number: $num) {
               auth
               part
            }
         }`,
         variables: {
            "num": auth
         }
       })
          .catch( err => {
             console.log(err);
          });

       if(data.getAuth) {
          this.setState({ 
             step: 2,
             person_auth: data.getAuth.auth,
             person_part: data.getAuth.part
          });
       }
       else {
          alert("Invalid Authorization code!");
       }
    }

        /*
    async checkUP(username, password, checkPass, client)
    {
       if(!username || !password)
          return;
       if(password!==checkPass)
          return;

      if(false) { //檢查username有沒有用過
         alert("This username has already been used.");
      }
      else {
         this.setState({step: 3});
      }
    }
    */

    async signup(username, password, name, client)
    {
       if(!username || !password)
          return;

       const { data } = await client.mutate({
          mutation: gql`
            mutation signup($n: String, $u: String!, $p: String!, $auth: String, $part: String) {
               signup(name: $n, username: $u, password: $p, auth: $auth, part: $part) 
         }`,
         variables: {
            "n": name,
            "u": username,
            "p": password,
            "auth": this.state.person_auth,
            "part": this.state.person_part
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
            { client => { 

              var checkPass = (this.state.password===this.state.checkPass)
                ? (<TextField required label="確認密碼" type="password"
                  onChange={(evt) => this.setState({checkPass: evt.target.value})} />)
                : (<TextField error required label="確認密碼" type="password"
                  onChange={(evt) => this.setState({checkPass: evt.target.value})} />);

        return(
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
                    <TextField required label="Authentication code" 
                    onChange={(evt) => this.setState({auth: evt.target.value})}
                    onKeyPress={ (event)=>{ 
                       if(event.key === 'Enter') this.authCheck(this.state.auth, client); 
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

              <Button onClick={() => {this.authCheck(this.state.auth, client);}} 
                color="primary">
                下一步
              </Button>              
            </DialogActions>
          </Dialog>


          <Dialog
            open={this.state.step==2}
            onClose={this.handleClose}
            TransitionComponent={TransitionLeft}
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
                    <TextField required label="帳號" 
                    onChange={(evt) => this.setState({username: evt.target.value})}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <FontAwesomeIcon icon="key" />
                  </Grid>
                  <Grid item>
                    <TextField required label="密碼" type="password"
                    onChange={(evt) => this.setState({password: evt.target.value})}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <FontAwesomeIcon icon="key" />
                  </Grid>
                  <Grid item>
                    {checkPass}
                  </Grid>
                </Grid>
              </div>

                <DialogContentText>
                <br />
                你的聲部是：{this.state.person_part} <br/>
                請輸入基本資料
                </DialogContentText>

              <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <TextField required label="姓名" 
                    onChange={(evt) => this.setState({name: evt.target.value})}
                    onKeyPress={ (event)=>{ 
                       if(event.key === 'Enter') this.signup(this.state.username, this.state.password, client);
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
                 this.signup(this.state.username, this.state.password, this.state.name, client);
              }} 
                color="primary">
                註冊
              </Button>
              
            </DialogActions>
          </Dialog>

          
          
        </div>
         );} }</ApolloConsumer>
      );
    }
  }

);


/*

              <Button onClick={() => {this.checkUP(this.state.username, this.state.password, this.state.checkPass, client);} } 
                color="primary">
                下一步
              </Button>


          <Dialog
            open={this.state.step==3}
            onClose={this.handleClose}
          >
            <DialogTitle>新團員註冊：Step {this.state.step}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                請輸入基本資料
              </DialogContentText>
  
              <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    聲部：{this.state.person_part}
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <TextField required label="姓名" 
                    onChange={(evt) => this.setState({name: evt.target.value})}
                    onKeyPress={ (event)=>{ 
                       if(event.key === 'Enter') this.signup(this.state.username, this.state.password, client);
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
*/

export default LoginDialog;
