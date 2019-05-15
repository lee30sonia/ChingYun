import React, { Component } from 'react';

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

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
import CircularProgress from '@material-ui/core/CircularProgress';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faKey, faLock, faEnvelope, faPhone, faSmile } from '@fortawesome/free-solid-svg-icons'

import { Query, Mutation } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Auth from './modules/Auth';

library.add(faUserCircle, faKey, faLock, faEnvelope, faPhone, faSmile)

function TransitionLeft(props) {
  return <Slide direction="left" {...props} />;
}

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}

var mutation = gql`
   mutation update($uid: String!, $n: String, $e: String, $p: String) {
      update(username: $uid, name: $n, email: $e, phone: $p)
   }`; // should add more

var mutationChangePass = gql`
  mutation changePassword($uid: String!, $opw: String, $npw: String!) {
      changePassword(username: $uid, oldpass: $opw, newpass: $npw) {res}
   }`;

var query = gql`
  query getPerson($uid: String!){
    getPerson(username: $uid) {
      name
      username
      password
      auth
      part
      job
      email
      phone
    } 
  }`;



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
      console.log("login in LoginDialog")
       if(!username || !password)
       {
          alert("請輸入帳號密碼")
          return;
       }
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
               token
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
        console.log(data.login);
        Auth.authenticateUser(data.login.token);
        this.props.login(data.login.person);
        this.setState({snackBarOpen: true});
        this.handleClose();
      }
       else
      {
        alert("帳號或密碼錯誤");
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
                
                <ForgetPass client={client}/>
                <NewMember/>

              </div>
  
            </DialogContent>
            <DialogActions>
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
        open: false,
        name: '',
        email: ' ',
        phone: ' ',
        changingPass: false
      };
      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.changePass = this.changePass.bind(this);
    }

    handleClickOpen(){
      this.setState({ open: true });
    }

    handleClose(){
      this.setState({ open: false });
      if (this.state.changingPass) 
        alert("密碼未變更（請先按確認再關閉此視窗）")
    }

    async changePass(oldpass, newpass, ChangePass)
    {
      await ChangePass({
         variables: {
            "uid": this.props.me.username,
            "opw": oldpass,
            "npw": newpass
         }
       })
       .catch( err => {
          console.log(err);
       });
    }

    async save(Update, data)
    {
      // check for requirements
      await Update({
         variables: {
            "uid": this.props.me.username,
            "n": this.state.name? this.state.name: data.getPerson.name, 
            "e": this.state.email===' '? data.getPerson.email: this.state.email,
            "p": this.state.phone===' '? data.getPerson.phone: this.state.phone
         }
         ,refetchQueries: [{ query: query, variables: {"uid": this.props.me.username} }]
       })
          .catch( err => {
             console.log(err);
          });

      this.handleClose();
    }

    render() {
      const { classes } = this.props;

      return (
        <Query query={query} variables={{ "uid": this.props.me.username }}>
          { ({ loading, err, data, refetch}) => {
            if(loading)
              return <CircularProgress className={classes.progress} />;
            if(err)
              return `Error! ${err.message}`;

            return(
              <div className="personal">
                <Button color="inherit" onClick={this.handleClickOpen}>{data.getPerson.name}</Button>
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
                      <Typography variant="h6" color="inherit" className={classes.flex}>
                        個人資料
                      </Typography>
                      <Mutation mutation={mutation}>
                         { Update => (
                            <Button color="inherit" onClick={() => {this.save(Update, data)}} >
                              儲存
                            </Button> )}
                      </Mutation>
                    </Toolbar>
                  </AppBar>
                 
                  <DialogContent>
                    <Grid container spacing={8} alignItems="flex-end">
                      <Grid item>
                        <FontAwesomeIcon icon="smile" />
                      </Grid>
                      <Grid item>
                        <TextField
                          autoFocus margin="normal" label="姓名" required defaultValue={data.getPerson.name}
                          onChange={(evt) => this.setState({name: evt.target.value})}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                      <Grid item>
                        <FontAwesomeIcon icon="envelope" />
                      </Grid>
                      <Grid item>
                        <TextField
                          margin="normal" label="email" defaultValue={data.getPerson.email}
                          onChange={(evt) => this.setState({email: evt.target.value})}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                      <Grid item>
                        <FontAwesomeIcon icon="phone" />
                      </Grid>
                      <Grid item>
                        <TextField
                          margin="normal" label="電話" defaultValue={data.getPerson.phone}
                          onChange={(evt) => this.setState({phone: evt.target.value})}
                        />
                      </Grid>
                    </Grid>

                    <br/> <br/>
                    <Mutation mutation={mutationChangePass} onCompleted={ function(d) { 
                      if (d.changePassword.res) alert("密碼已變更！"); else alert("密碼變更失敗！（舊密碼錯誤）") }} >
                      { (cp, data) => (
                        <ChangePass changePass={(o,n)=>{this.changePass(o,n,cp)}} state={(b)=>{this.setState({changingPass: b})}}/>
                      )}
                    </Mutation>
                    
                    
                    
                  </DialogContent>
                </Dialog>
              </div>
            );
          }}
        </Query>
      );
    }
  }
);

const ChangePass = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
        open: false,
        pass: '',
        newpass: '',
        newpass2: ''
      };   
      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.changePass = this.changePass.bind(this);
    }
  
    handleClickOpen = () => {
      this.setState({ open: true });
      this.props.state(true);
    };

    changePass = () => {
      if (this.state.newpass!==this.state.newpass2)
      {
        alert("請輸入相同的新密碼");
        return;
      }
      if (this.state.newpass.length===0)
      {
        alert("密碼長度不可為零");
        return;
      }
      if (this.state.pass.length===0)
      {
        alert("請輸入舊密碼");
        return;
      }
      this.props.changePass(this.state.pass, this.state.newpass);
      this.setState({
        open: false,
        pass: '',
        newpass: '',
        newpass2: ''
      });
      this.props.state(false);
    };
  
    render() {
      const { classes } = this.props;
      
      var cont = this.state.open? (
        <div>
        <Button variant="outlined" className={classes.btn_floatLeft} onClick={this.changePass}>確認</Button>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <FontAwesomeIcon icon="key" />
          </Grid>
          <Grid item>
            <TextField
              margin="normal" label="舊密碼" type="password" required
              onChange={(evt) => this.setState({pass: evt.target.value})}
            />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <FontAwesomeIcon icon="key" />
          </Grid>
          <Grid item>
            <TextField
              margin="normal" label="新密碼" type="password" required
              onChange={(evt) => this.setState({newpass: evt.target.value})}
            />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <FontAwesomeIcon icon="key" />
          </Grid>
          <Grid item>
            <TextField
              margin="normal" label="重新輸入新密碼" type="password" required
              onChange={(evt) => this.setState({newpass2: evt.target.value})}
            />
          </Grid>
        </Grid>

        </div>
      ):(<div></div>);

      return (
        <div>
          <Button variant="outlined" className={classes.btn_floatLeft} onClick={this.handleClickOpen}>變更密碼</Button>
          {cont}
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
        open: false,
        username: ''
      };   
      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.forgetPass = this.forgetPass.bind(this);
      this.sendmail = this.sendmail.bind(this);
    }
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    async forgetPass(client) 
    {
      var newpass =  Math.random().toString(36).substring(2, 8) ;

      const { data } = await client.mutate({
        mutation: gql`
          mutation changePassword($uid: String!, $npw: String!) {
            changePassword(username: $uid, newpass: $npw) { res, name }
          }`,
        variables: {
          "uid": this.state.username,
          "npw": newpass
        }
      })
      .catch( err => {
         console.log(err);
      });

      if (data.changePassword.res)
      {
        await this.sendmail(client, data.changePassword.name, newpass);
        this.handleClose();
      }
      else
        alert("重設密碼失敗！（輸入的帳號不存在）")
    }

    async sendmail(client, name, newpass)
    {
      const { data } = await client.query({
        query: gql`
          query sendMailForgetPass($n: String!, $uid: String!, $npw: String!) {
            sendMailForgetPass(name: $n, username: $uid, newpass: $npw) 
          }`,
        variables: {
          "n": name,
          "uid": this.state.username,
          "npw": newpass
        }
      })
      .catch( err => {
         console.log(err);
      });
      alert(data.sendMailForgetPass);
    }
  
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
                請輸入帳號（ID），系統將重設密碼並將新密碼寄至幹部信箱(chingyunchoir@gmail.com)，請聯繫幹部取得新密碼，並儘速登入修改密碼（登入後點選右上角自己的名字）。
              </DialogContentText>
  
              <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <FontAwesomeIcon icon="user-circle" />
                  </Grid>
                  <Grid item>
                    <TextField label="Username" required
                    onChange={(evt) => this.setState({username: evt.target.value})}
                    />
                  </Grid>
                </Grid>

                <br />
                <ForgetID client={this.props.client}/>

              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={ ()=>{this.forgetPass(this.props.client)}} color="primary">
                確認
              </Button>

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


const ForgetID = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
        open: false,
        name: '',
        results: []
      };   
      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.search = this.search.bind(this);
    }
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    async search(client) 
    {
      const { data } = await client.query({
        query: gql`
          query getIDbyName($n: String!){
            getIDbyName(name: $n) {
              username
            }
          }`,
        variables: {
          "n": this.state.name
        }
      })
      .catch( err => {
         console.log(err);
      });
      
      this.setState({ results: data.getIDbyName.map( d => { return d.username }) });
      if (this.state.results.length===0)
        this.setState({ results: ["查無結果"] })
    }
  
    render() {
      const { classes } = this.props;

      var Results = (this.state.results.length!==0)? 
        (<div><br/>搜尋結果：<br/>{this.state.results.map(r => (<div>{r}<br/></div>))}</div>):
        (<div></div>);

      return (
        <div>
          <Button onClick={this.handleClickOpen} className={classes.btn_floatLeft}> 忘記帳號 </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DialogTitle id="form-dialog-title">忘記帳號</DialogTitle>
            <DialogContent>
              <DialogContentText>
                請輸入姓名
              </DialogContentText>
  
              <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <FontAwesomeIcon icon="smile" />
                  </Grid>
                  <Grid item>
                    <TextField label="姓名" required
                    onChange={(evt) => this.setState({name: evt.target.value})}
                    onKeyPress={ (event) => { if(event.key === 'Enter') this.search(this.props.client) }} />
                  </Grid>
                </Grid>                
                {Results}
              </div>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={()=>{this.search(this.props.client)}} color="primary">
                查詢
              </Button>

              <Button onClick={this.handleClose} color="primary">
                關閉
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
            open={this.state.step===1}
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
              <Button onClick={() => {this.authCheck(this.state.auth, client);}} 
                color="primary">
                下一步
              </Button>              
            </DialogActions>
          </Dialog>


          <Dialog
            open={this.state.step===2}
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
              <Button onClick={ () => {
                 this.signup(this.state.username, this.state.password, this.state.name, client);
              }} 
                color="primary">
                註冊
              </Button>
              <Button onClick={this.handleClose} color="primary">
                取消
              </Button>
            </DialogActions>
          </Dialog>

          
          
        </div>
         );} }</ApolloConsumer>
      );
    }
  }
);

export default LoginDialog;
