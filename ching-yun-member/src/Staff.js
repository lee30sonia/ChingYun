import React, { Component } from 'react';

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faKey, faMusic } from '@fortawesome/free-solid-svg-icons'
library.add(faUserCircle, faKey, faMusic)

const Staff = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
        name: '',
        part: '',
        number: ''
      };   
      this.addAdmit = this.addAdmit.bind(this);
      this.addAdmitCheck = this.addAdmitCheck.bind(this);
    }

    async addAdmitCheck(client)
    {
      if (!this.state.name || !this.state.part || !this.state.number)
      {
        alert("請完整填寫新生姓名、聲部及授權碼三個欄位");
        return false;
      }

      var { data } = await client.query({
          query: gql`
            query getAdmit($num: String!) {
             getAdmit(number: $num) {
               name
               part
            }
         }`,
         variables: {
            "num": this.state.number
         }
       })
       .catch( err => {
          console.log(err);
       })

      if (data.getAdmit)
      {
        alert("這個授權碼（"+this.state.number+"）已經發給"+data.getAdmit.part+"的"+data.getAdmit.name+"了，請換一個！");
        return false;
      }
      return true;
    }

    async addAdmit(client)
    {
      var check = await this.addAdmitCheck(client);
      if (!check) return;

      var { data } = await client.mutate({
        mutation: gql`
          mutation newAdmission($n: String!, $no: String!, $p: String!) {
            newAdmission(name: $n, number: $no, part: $p) {res}
          }`,
        variables: {
          "n": this.state.name,
          "no": this.state.number,
          "p": this.state.part
        }
      })
      .catch( err => {
         console.log(err);
      });

      if (data && data.newAdmission.res)
      {
        alert("已為"+this.state.part+"的"+this.state.name+"新增授權碼"+this.state.number+"，請將此授權碼附在錄取通知上！")
        //this.setState({name: '', number: '', part: ''});
        window.location.reload(); 
      }
      else
      {
        alert("出錯惹QQ")
      }
    }
  
    render() {
      const { classes } = this.props;

      return (
        <ApolloConsumer>
         { client => (

        <div className={classes.content}>
        <Paper className={classes.NewAdmit}>  
          <Typography variant="h6" align="center" color="primary">招生部：新增錄取通知</Typography>

          <div className={classes.margin}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item>
                <FontAwesomeIcon icon="smile" />
              </Grid>
              <Grid item>
                <TextField label="新生姓名" required autoComplete="one-time-code"
                onChange={(evt) => this.setState({name: evt.target.value})}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item>
                <FontAwesomeIcon icon="music" />
              </Grid>
              <Grid item>
                <TextField label="聲部" required autoComplete="one-time-code"
                onChange={(evt) => this.setState({part: evt.target.value})}
                />
              </Grid>
            </Grid>
            ＊聲部請以大寫SATB開頭，否則將分類為老師（ex: Sop1, Alto2, 老師）
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item>
                <FontAwesomeIcon icon="key" />
              </Grid>
              <Grid item>
                <TextField label="錄取授權碼" required autoComplete="one-time-code"
                onChange={(evt) => this.setState({number: evt.target.value})}
                onKeyPress={ (event) => { if(event.key === 'Enter') this.addAdmit(client); }} />
              </Grid>
            </Grid>
            ＊同期新生（所有尚未註冊者）授權碼不重複即可
          </div>

          <br/>
          <Button onClick={() => { this.addAdmit(client); }} 
            color="primary" variant="outlined" className={classes.btn_floatLeft}>
            新增
          </Button>

        </Paper>
        </div>
        )}</ApolloConsumer>
      );
    }
  }
);

export default Staff;