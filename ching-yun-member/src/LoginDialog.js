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
import InputAdornment from '@material-ui/core/InputAdornment';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faKey, faLock, faEnvelope, faPhone, faSmile, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

import { Query, Mutation } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Auth from './Auth';
import PasswordHash from 'password-hash';

library.add(faUserCircle, faKey, faLock, faEnvelope, faPhone, faSmile, faMapMarkerAlt)

function TransitionLeft(props) {
  return <Slide direction="left" {...props} />;
}

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}

var mutation = gql`
   mutation update($t: String!, $n: String, $nic: String, $e: String, $p: String, $cell: String, $ad: String) {
      update(token: $t, name: $n, nickname: $nic, email: $e, phone: $p, cellphone: $cell, address: $ad)
   }`;

var mutationChangePass = gql`
  mutation changePassword($t: String, $opw: String, $npw: String!) {
      changePassword(token: $t, oldpass: $opw, newpass: $npw) {res}
   }`;

var query = gql`
  query getPerson($t: String!){
    getPerson(token: $t) {
      name
      nickname
      username
      password
      part
      email
      phone
      cellphone
      address
      inYear
      birthday
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
                  roles
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
        //console.log(data.login);
        Auth.authenticateUser(data.login.token);
        this.props.login({ name: data.login.person.name, username: data.login.person.username, roles: data.login.person.roles, token: data.login.token});
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

      if(this.props.loggedIn && !this.props.me)
        return <CircularProgress className={classes.progress} />;

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
            PaperProps={{className: classes.smallScreen}}
          >
            <DialogTitle id="form-dialog-title">登入</DialogTitle>
            <DialogContent>
              <DialogContentText>
                輸入團員專區帳號密碼
              </DialogContentText>
  
              <div className={classes.margin}>
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                    <FontAwesomeIcon icon="user-circle" />
                  </Grid>
                  <Grid item>
                    <TextField label="Username" 
                    onChange={(evt) => this.setState({username: evt.target.value})}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="flex-end">
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
        nickname: ' ',
        email: ' ',
        phone: ' ',
        cellphone: ' ',
        address: ' ',
        birthday: ' ',
        inYear: ' ',
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
            "t": this.props.me.token,
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
            "t": this.props.me.token,
            "n": this.state.name? this.state.name: data.getPerson.name, 
            "nic": this.state.nickname===' '? data.getPerson.nickname: this.state.nickname,
            "e": this.state.email===' '? data.getPerson.email: this.state.email,
            "p": this.state.phone===' '? data.getPerson.phone: this.state.phone,
            "cell": this.state.cellphone===' '? data.getPerson.cellphone: this.state.cellphone,
            "ad": this.state.address===' '? data.getPerson.address: this.state.address
         }
         ,refetchQueries: [{ query: query, variables: {"t": this.props.me.token} }]
       })
          .catch( err => {
             console.log(err);
          });

      this.handleClose();
      this.render();
      //window.location.reload();
    }

    render() {
      const { classes } = this.props;
      if(!this.props.me)
        return <CircularProgress className={classes.progress} />;
      
      return (
        <Query query={query} variables={{ "t": this.props.me.token }}>
          { ({ loading, err, data, refetch}) => {
            if(loading || !data.getPerson)
              return <CircularProgress className={classes.progress} />;
            if(err)
              return `Error! ${err.message}`;
            
            return(
              <div className="personal">
                <Button color="inherit" onClick={this.handleClickOpen}>{this.props.me.name}</Button>
                <Dialog
                  fullScreen
                  open={this.state.open}
                  onClose={this.handleClose}
                  TransitionComponent={TransitionUp}
                  PaperProps={{className: classes.smallScreen}}
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
                  <div className={classes.contentNoShift}>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}> <TextField
                      InputProps={{ startAdornment: ( <InputAdornment position="start"> <FontAwesomeIcon icon="smile" /> </InputAdornment> )}}
                      margin="dense" autoFocus label="姓名" required defaultValue={data.getPerson.name} autoComplete="name"
                      onChange={(evt) => this.setState({name: evt.target.value})} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}> <TextField
                      InputProps={{ startAdornment: ( <InputAdornment position="start"> <FontAwesomeIcon icon="smile" /> </InputAdornment> )}}
                      margin="dense" label="暱稱" defaultValue={data.getPerson.nickname} autoComplete="nickname"
                      onChange={(evt) => this.setState({nickname: evt.target.value})} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}> <TextField
                      InputProps={{ startAdornment: ( <InputAdornment position="start"> <FontAwesomeIcon icon="envelope" /> </InputAdornment> )}}
                      margin="dense" label="email" defaultValue={data.getPerson.email} autoComplete="email"
                      onChange={(evt) => this.setState({email: evt.target.value})} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}> <TextField
                      InputProps={{ startAdornment: ( <InputAdornment position="start"> <FontAwesomeIcon icon="phone" /> </InputAdornment> )}}
                      margin="dense" label="電話" defaultValue={data.getPerson.phone} autoComplete="tel"
                      onChange={(evt) => this.setState({phone: evt.target.value})} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}> <TextField
                      InputProps={{ startAdornment: ( <InputAdornment position="start"> <FontAwesomeIcon icon="phone" /> </InputAdornment> )}}
                      margin="dense" label="手機" defaultValue={data.getPerson.cellphone} autoComplete="tel"
                      onChange={(evt) => this.setState({cellphone: evt.target.value})} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}> <TextField
                      InputProps={{ startAdornment: ( <InputAdornment position="start"> <FontAwesomeIcon icon="map-marker-alt" /> </InputAdornment> )}}
                      margin="dense" label="地址" defaultValue={data.getPerson.address} autoComplete="street-address"
                      onChange={(evt) => this.setState({address: evt.target.value})} fullWidth/>
                    </Grid>
                  </Grid>
                  </div>
                    <br/> <br/> <br/> <br/>
                    <Mutation mutation={mutationChangePass} onCompleted={ function(d) { 
                      if (d.changePassword.res) alert("密碼已變更！"); else alert("密碼變更失敗！（舊密碼錯誤）") }} >
                      { (cp, data) => (
                        <ChangePass changePass={(o,n)=>{this.changePass(o,n,cp)}} state={(b)=>{this.setState({changingPass: b})}} me={this.props.me}/>
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
      var ori = this.state.open;
      this.props.state(!ori);
      this.setState({ open: !ori });
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
      this.props.changePass(this.state.pass, PasswordHash.generate(this.state.newpass, {algorithm: 'sha256'}));
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
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item> <FontAwesomeIcon icon="user-circle" /> </Grid>
          <Grid item> <TextField
              label="帳號" disabled defaultValue={this.props.me.username} autoComplete="username"/> </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <FontAwesomeIcon icon="key" />
          </Grid>
          <Grid item>
            <TextField
              autoFocus label="舊密碼" type="password" required autoComplete="current-password"
              onChange={(evt) => this.setState({pass: evt.target.value})}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <FontAwesomeIcon icon="key" />
          </Grid>
          <Grid item>
            <TextField
              label="新密碼" type="password" required autoComplete="new-password"
              onChange={(evt) => this.setState({newpass: evt.target.value})}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <FontAwesomeIcon icon="key" />
          </Grid>
          <Grid item>
            <TextField
              label="重新輸入新密碼" type="password" required autoComplete="new-password"
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
          mutation changePassword($uid: String, $npw: String!) {
            changePassword(username: $uid, newpass: $npw) { res, name }
          }`,
        variables: {
          "uid": this.state.username,
          "npw": PasswordHash.generate(newpass, {algorithm: 'sha256'})
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
            PaperProps={{className: classes.smallScreen}}
          >
            <DialogTitle id="form-dialog-title">忘記密碼</DialogTitle>
            <DialogContent>
              <DialogContentText>
                請輸入帳號（ID），系統將重設密碼並將新密碼寄至幹部信箱(chingyunchoir@gmail.com)，請聯繫幹部取得新密碼，並儘速登入修改密碼（登入後點選右上角自己的名字）。
              </DialogContentText>
  
              <div className={classes.margin}>
                <Grid container spacing={2} alignItems="flex-end">
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
            PaperProps={{className: classes.smallScreen}}
          >
            <DialogTitle id="form-dialog-title">忘記帳號</DialogTitle>
            <DialogContent>
              <DialogContentText>
                請輸入姓名
              </DialogContentText>
  
              <div className={classes.margin}>
                <Grid container spacing={2} alignItems="flex-end">
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
        person_name: '',
        person_part: ''
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
            query getAdmit($num: String!) {
             getAdmit(number: $num) {
               name
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

       if(data.getAdmit) {
          this.setState({ 
             step: 2,
             person_name: data.getAdmit.name,
             person_part: data.getAdmit.part
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

    async signup(client)
    {
       if(!this.state.username || !this.state.password)
          return;

       const { data } = await client.mutate({
          mutation: gql`
            mutation signup($u: String!, $p: String!, $auth: String!) {
               signup(username: $u, password: $p, auth: $auth) 
         }`,
         variables: {
            "u": this.state.username,
            "p": PasswordHash.generate(this.state.password, {algorithm: 'sha256'}),
            "auth": this.state.auth
         }
       })
          .catch( err => {
             console.log(err);
          });

      if(data.signup) {
         alert("You've registered successfully!");
         this.handleClose();
         window.location.reload(); 
      }
      else {
         alert("Something wrong.");
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
            PaperProps={{className: classes.smallScreen}}
          >
            <DialogTitle>新團員註冊：Step {this.state.step}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                請輸入錄取通知上的授權碼
              </DialogContentText>
  
              <div className={classes.margin}>
                <Grid container spacing={2} alignItems="flex-end">
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
            PaperProps={{className: classes.smallScreen}}
          >
            <DialogTitle>新團員註冊：Step {this.state.step}</DialogTitle>
            <DialogContent>

              <DialogContentText>
                Hi {this.state.person_name}，歡迎加入青韵！你的聲部是{this.state.person_part}喔！<br/>
                接下來，請選擇一組帳號密碼來註冊團員專區帳號
              </DialogContentText>
  
              <div className={classes.margin}>
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                    <FontAwesomeIcon icon="user-circle" />
                  </Grid>
                  <Grid item>
                    <TextField required label="帳號" 
                    onChange={(evt) => this.setState({username: evt.target.value})}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                    <FontAwesomeIcon icon="key" />
                  </Grid>
                  <Grid item>
                    <TextField required label="密碼" type="password"
                    onChange={(evt) => this.setState({password: evt.target.value})}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                    <FontAwesomeIcon icon="key" />
                  </Grid>
                  <Grid item>
                    {checkPass}
                  </Grid>
                </Grid>
              </div>
  
            </DialogContent>
            <DialogActions>
              <Button onClick={ () => {
                 this.signup(client);
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
