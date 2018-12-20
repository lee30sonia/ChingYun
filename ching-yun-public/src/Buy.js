import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

import { Query, Mutation } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

library.add(faMusic);

const Buy = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
        num: [0,0,0,0,0,0,0,0,0,0],
        name: "",
        email: "",
        phone: "",
        address: "",
        account: "",
        title: "",
        tax: "",
        comments: ""
      };
      this.set = this.set.bind(this);
      this.send = this.send.bind(this);
      this.cancle = this.cancle.bind(this);
      this.sum=0;
    }

    set = (idx, num) => {
      if (num<0) return; 
      var tmp = this.state.num;
      tmp[idx] = num;
      this.setState({num: tmp});
    }

    cancle = () => {
      this.setState({
        num: [0,0,0,0,0,0,0,0,0,0],
        name: "",
        email: "",
        phone: "",
        address: "",
        account: "",
        title: "",
        tax: "",
        comments: ""
      });
    }

    async send(client) 
    {
      if (!this.state.name || !this.state.email || !this.state.phone || !this.state.address || !this.state.account)
      {
        alert("請填寫完整資料再送出！");
        return;
      }

      var sum = 0;
      var str = ("訂購人姓名："+this.state.name+
      "\nemail："+this.state.email+
      "\n聯絡電話："+this.state.phone+
      "\n郵寄地址："+this.state.address+
      "\n匯款帳號後五碼："+this.state.account+
      "\n應匯金額："+this.sum+
      "\n收據抬頭："+this.state.title+
      "\n收據統編："+this.state.tax+
      "\n其他疑問或意見："+this.state.comments+
      "\n\n購譜數量："+
      "\n夢田："+this.state.num[0]+
      "\n守著陽光守著你："+this.state.num[1]+
      "\n閃亮的日子："+this.state.num[2]+
      "\n我期待："+this.state.num[3]+
      "\n旅行的意義："+this.state.num[4]+
      "\n找自己："+this.state.num[5]+
      "\n青天的韵腳："+this.state.num[6]+
      "\nPairua Meyrang ki Reya 平安的主！請來！："+this.state.num[8]+
      "\nWagi ka'ta ki Bavatug-an 今天就是歡慶之日："+this.state.num[9]+
      "\n夢與追尋之旅組曲（七首含殼）："+this.state.num[7]);

      //alert(str);

      //await client.util.sendMail(str, this.state.email); //???
      const { data } = await client.query({
        query: gql`
          query sendMail($e: String!, $s: String!) {
            sendMail(email: $e, str: $s) 
          }`,
        variables: {
          "e": this.state.email,
          "s": str
        }
      })
      .catch( err => {
         console.log(err);
      });
      alert(data.sendMail);
      //if (data) alert("確認信已寄至您所提供的信箱（"+this.state.email+"）！");
      //else alert("確認信寄送失敗。若此情況持續發生，請聯繫網頁工程師");
      this.cancle();
    }

    render() {
      const { classes } = this.props;

      var sum = 0;
      for (let i=0; i<10; i++)
      {
        if (i===6)
          sum += this.state.num[i]*100;
        else if (i===7)
          sum += this.state.num[i]*442;
        else
          sum += this.state.num[i]*50;
      }
      var discount = false;
      for (let i=0; i<10; i++)
      {
        if (i===7 && this.state.num[i]>=5)
          discount = true;
        else if (this.state.num[i]>=30)
          discount = true;
      }
      if (discount) sum = Math.round(sum*0.9);
      this.sum = sum+80;

      return (
        <ApolloConsumer>
        { client => (

        <div className={classes.MainPage}>
          <Paper className={classes.PaperTitle}>
            <Typography variant="headline" component="h1" color="primary" align="center">
              委創樂譜線上訂購
            </Typography>
          </Paper>
          <Grid container>
            <Hidden only={['xs']}><Grid item xs={false} sm={1} md={2} lg={1} xl={2}></Grid></Hidden>
            <Grid item xs={12} sm={10} md={8} lg={5} xl={4}>
              <Paper className={classes.Paper}>
                <Typography variant="title" color="primary">夢與追尋之旅組曲</Typography>
                <Typography variant="subheading" gutterBottom color="primary">編曲/ 冉天豪</Typography>

                <List>
                  <SongItem txt="夢田" price={50} set={(num)=>{this.set(0,num);}} num={this.state.num[0]} />
                  <SongItem txt="守著陽光守著你" price={50} set={(num)=>{this.set(1,num);}} num={this.state.num[1]} />
                  <SongItem txt="閃亮的日子" price={50} set={(num)=>{this.set(2,num);}} num={this.state.num[2]} />
                  <SongItem txt="我期待" price={50} set={(num)=>{this.set(3,num);}} num={this.state.num[3]} />
                  <SongItem txt="旅行的意義" price={50} set={(num)=>{this.set(4,num);}} num={this.state.num[4]} />
                  <SongItem txt="找自己" price={50} set={(num)=>{this.set(5,num);}} num={this.state.num[5]} />
                  <SongItem txt="青天的韵腳" price={100} set={(num)=>{this.set(6,num);}} num={this.state.num[6]} />
                  <SongItem txt="夢與追尋之旅組曲紀念珍藏版（套譜全七首，附精美譜殼）" price={442} set={(num)=>{this.set(7,num);}} num={this.state.num[7]} />
                </List>
              </Paper>
            </Grid>
            <Hidden only={['xs','lg','xl']}><Grid item xs={false} sm={1} md={2} lg={false} xl={false}></Grid></Hidden>

            <Hidden only={['xs','lg','xl']}><Grid item xs={false} sm={1} md={2} lg={false} xl={false}></Grid></Hidden>
            <Grid item xs={12} sm={10} md={8} lg={5} xl={4}>
              <Paper className={classes.Paper}>
                <Typography variant="title" color="primary">西拉雅族原住民合唱曲</Typography>
                <Typography variant="subheading" gutterBottom color="primary">詞曲/ 萬益嘉</Typography>

                <List>
                  <SongItem txt="Pairua Meyrang ki Reya" txt2="平安的主！請來！" price={50} set={(num)=>{this.set(8,num);}} num={this.state.num[8]} />
                  <SongItem txt="Wagi ka'ta ki Bavatug-an" txt2="今天就是歡慶之日" price={50} set={(num)=>{this.set(9,num);}} num={this.state.num[9]} />
                </List>
              </Paper>

              <Paper className={classes.Paper}>
                ＊單曲訂購 30 本以上，或套譜 5 套以上，享 9 折優惠！<br/>
                目前選購譜費：{sum} 元 <span style={{color:"red"}}>{discount?"（九折優惠！）":""}</span><br/>
                運費：80 元<br/>
                總價：<span style={{color:"red"}}>{sum+80} 元</span><br/><br/>

                <p>請將總價匯款至青韵帳戶後，填妥以下表格，我們將在收到匯款後寄送 email 與您確認郵寄資訊。<br/></p>
                戶名：青韵合唱團<br/>帳號：020118090403<br/>開戶行：凱基銀行 松江分行<br/><br/>

                <TextField
                label="訂購人姓名"
                required
                value={this.state.name}
                onChange={(event)=>{this.setState({name:event.target.value});}}
                type="text"
                className={classes.TextField}
                />

                <TextField
                label="電子郵件"
                required
                value={this.state.email}
                onChange={(event)=>{this.setState({email:event.target.value});}}
                type="text"
                className={classes.TextField}
                />

                <TextField
                label="聯絡電話"
                required
                value={this.state.phone}
                onChange={(event)=>{this.setState({phone:event.target.value});}}
                type="text"
                className={classes.TextField}
                />

                <TextField
                label="匯款帳號後五碼"
                required
                value={this.state.account}
                onChange={(event)=>{this.setState({account:event.target.value});}}
                type="text"
                className={classes.TextField}
                />

                <TextField
                label="郵寄地址"
                required
                value={this.state.address}
                onChange={(event)=>{this.setState({address:event.target.value});}}
                type="text"
                className={classes.TextField}
                />

                <div style={{marginTop:'20px'}}>如需開立收據，請填寫抬頭及統編：</div>

                <TextField
                label="收據抬頭"
                value={this.state.title}
                onChange={(event)=>{this.setState({title:event.target.value});}}
                type="text"
                className={classes.TextField}
                />

                <TextField
                label="統一編號"
                value={this.state.tax}
                onChange={(event)=>{this.setState({tax:event.target.value});}}
                type="text"
                className={classes.TextField}
                />

                <br/><br/>

                <TextField
                label="其他疑問或意見"
                value={this.state.comments}
                onChange={(event)=>{this.setState({comments:event.target.value});}}
                type="text"
                multiline
                fullWidth
                />

                <br/><br/>

                <Button variant='outlined' style={{margin: '5px'}} onClick={this.cancle}> 清除重填 </Button>
                <Button variant='outlined' style={{margin: '5px'}} onClick={()=>{this.send(client);}}> 確認送出 </Button>
              </Paper>
            </Grid>

          </Grid>
        </div>
        
        )}
        </ApolloConsumer>
      );
    }
});

const SongItem = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      var txt2 = this.props.txt2? (<div>{this.props.txt2}</div>): <div />;
      return (
        <ListItem divider>
          <Grid container>
            <Grid item xs={2} sm={1}>
              <ListItemIcon><FontAwesomeIcon icon="music"/></ListItemIcon>
            </Grid>
            <Grid item xs={10} sm={7} md={7} lg={7} xl={7}>
              <ListItemText>{this.props.txt}{txt2}<div>${this.props.price}</div></ListItemText>
            </Grid>
            <Hidden smUp><Grid item xs={2} ></Grid></Hidden>
            <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
              <TextField
                label="訂購數量"
                value={this.props.num}
                onChange={(event)=>{this.props.set(event.target.value);}}
                type="number"
                className={classes.BuyTextField}
              />
            </Grid>
          </Grid>
        </ListItem>
      );
    }
});

export default Buy;
