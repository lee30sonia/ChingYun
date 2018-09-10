import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const History = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.MainPage}>
          <Grid container>
            <Grid item xs={0} sm={1} md={1} lg={1} xl={3}></Grid>
            <Grid item xs={12} sm={10} md={10} lg={10} xl={6}>
              <Paper className={classes.Paper}>
                <Typography variant="headline" component="h1" gutterBottom color="primary">
                  演出大事
                </Typography>

                <List>
                  <ListItem>2018.06-07. 台南南神神學院、高雄文化中心至善廳，『光之韵－青韵合唱團四十五週年台南高雄巡演』</ListItem>
                  <ListItem>2018.04. 台北國家音樂廳，『光之韵－青韵合唱團四十五週年音樂會』</ListItem>
                  <ListItem>2017.09. 新北市多功能集會堂，薪橋國樂團『青聲薪語』音樂會（協演）</ListItem>
                  <ListItem>2017.07. 英國亨戈蘭國際音樂節Llangollen International Musical Eisteddfod表演及比賽</ListItem>
                  <ListItem>2017.05. 台北國家音樂廳，『彼岸－青韵2017音樂會』</ListItem>
                  <ListItem>2017.05. 『故宮週末夜』演出</ListItem>
                  <ListItem>2016.12. 東吳大學松怡廳，『新韻之聲─合唱作品發表會』（協演）</ListItem>
                  <ListItem>2016.07. 台北國家音樂廳，『好韻新聲-青韵合唱團與馬韻珊』</ListItem>
                  <ListItem>2015.12. 東吳大學松怡廳，『新韻之聲─合唱作品發表會』（協演）</ListItem>
                  <ListItem>2015.12. 蘆洲功學音樂廳，『人生•旅程─青韵、北一女、建中合唱團聯合音樂會』</ListItem>
                  <ListItem>2015.07. 台東文化中心、慈濟大學(花蓮)，『戀戀北迴線─青韵花東巡演』</ListItem>
                  <ListItem>2015.03. 台北國家音樂廳，『亞洲合唱音樂巡禮─2015青韵合唱團春季公演』</ListItem>
                  <ListItem>2015.02. 『故宮週末夜』演出</ListItem>
                  <ListItem>2014.12. 台北國家音樂廳，『NSO跨/新年音樂會─古勒之歌』（協演）</ListItem>
                  <ListItem>2014.08. 參加『新加坡國際合唱節(SICF)』，獲得民謠組金牌、混聲組銀牌</ListItem>
                  <ListItem>2014.03. 台北國家音樂廳，『青韵四十聲聲不息-唱響新聲』</ListItem>
                  <ListItem>2013.12. 參與全國社會組合唱比賽，榮獲冠軍金質獎</ListItem>
                  <ListItem>2013.07. 台北國家音樂廳，『青韵四十聲聲不息-與帥比有約』</ListItem>
                  <ListItem>2013.03. 台北中山堂，『合唱萬花筒─青韵合唱團春季公演』</ListItem>
                </List>
              
              </Paper>
            </Grid>
            <Grid item xs={0} sm={1} md={1} lg={1} xl={3}></Grid>
          </Grid>
        </div>
      );
    }
});

export default History;
