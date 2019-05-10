import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const Contact = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.MainPage}>
          <Grid container>
            <Grid item xs={0} sm={1} md={1} lg={2} xl={3}></Grid>
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
              <Paper className={classes.Paper}>
                <Typography variant="h5" gutterBottom color="primary" align="center">
                  聯絡我們
                </Typography>             
                <p style={{textAlign:'center', textIndent:'0'}}> 團址：新北市新店區順安街4號B1 <br/>
                  E-mail: <a href="mailto:chingyunchoir@gmail.com">chingyunchoir@gmail.com</a> <br/>
                  聯絡電話：團長 李小姐 0961 336 170 <br/>
                </p>
              </Paper>
            </Grid>
            <Grid item xs={0} sm={1} md={1} lg={2} xl={3}></Grid>
          </Grid>

          <Grid container>
            <Grid item xs={0} sm={1} md={1} lg={1} xl={3}></Grid>
            <Grid item xs={12} sm={10} md={10} lg={10} xl={6}>
              <Paper className={classes.Paper}>
                <Typography variant="h5" gutterBottom color="primary" align="center">
                  加入青韵
                </Typography>             
                <p style={{textAlign:'center', textIndent:'0'}}>
                  每週空出一個週六下午，不少也不多，完美沈浸在音樂的懷抱裡。<br/>
                  在這裡，找到和你一樣對合唱有極大熱情的我們，<br/>
                  唱唱歌、聊聊彼此對音樂的喜歡，盡情享受音樂。<br/>
                  喚醒那，曾經最熱情最狂奔的合唱魂。<br/><br/>
                  青韵合唱團固定於每年寒暑假進行招生試音，敬請持續關注官網及<a href="https://www.facebook.com/Chinyunchorus/" target="_blank" rel='noreferrer noopener'>粉絲專頁</a>的最新公告！<br/>
               </p>
              </Paper>
            </Grid>
            <Grid item xs={0} sm={1} md={1} lg={1} xl={3}></Grid>
          </Grid>
        </div>
      );
    }
});

export default Contact;
