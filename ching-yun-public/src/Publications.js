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

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

library.add(faMusic);

const Publications = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.MainPage}>
          <Paper className={classes.PaperTitle}>
            <Typography variant="h5" component="h1" color="primary" align="center">
              委託創作合唱樂譜
            </Typography>
          </Paper>
          <Grid container>
            <Hidden only={['xs']}><Grid item xs={false} sm={1} md={2} lg={1} xl={2}></Grid></Hidden>
            <Grid item xs={12} sm={10} md={8} lg={5} xl={4}>
              <Paper className={classes.Paper}>
                <Typography variant="h6" color="primary">夢與追尋之旅組曲</Typography>
                <Typography variant="subtitle1" gutterBottom color="primary">編曲/ 冉天豪</Typography>

                <Button variant='outlined' style={{margin: '5px'}} href="/publications/buy"> 線上購譜 </Button>

                <List>
                  <SongItem txt="夢田" />
                  <SongItem txt="守著陽光守著你" />
                  <SongItem txt="閃亮的日子" />
                  <SongItem txt="我期待" />
                  <SongItem txt="旅行的意義" />
                  <SongItem txt="找自己" />
                  <SongItem txt="青天的韵腳" />
                </List>
              </Paper>
            </Grid>
            <Hidden only={['xs','lg','xl']}><Grid item xs={false} sm={1} md={2} lg={false} xl={false}></Grid></Hidden>

            <Hidden only={['xs','lg','xl']}><Grid item xs={false} sm={1} md={2} lg={false} xl={false}></Grid></Hidden>
            <Grid item xs={12} sm={10} md={8} lg={5} xl={4}>
              <Paper className={classes.Paper}>
                <Typography variant="h6" color="primary">西拉雅族原住民合唱曲</Typography>
                <Typography variant="subtitle1" gutterBottom color="primary">詞曲/ 萬益嘉</Typography>

                <Button variant='outlined' style={{margin: '5px'}} href="/publications/buy"> 線上購譜 </Button>

                <List>
                  <SongItem txt="Pairua Meyrang ki Reya" txt2="平安的主！請來！" />
                  <SongItem txt="Wagi ka'ta ki Bavatug-an" txt2="今天就是歡慶之日" />
                </List>
              </Paper>
            </Grid>

          </Grid>
        </div>
      );
    }
});

const SongItem = withStyles(styles)(
  class extends Component {
    render() {
      //const { classes } = this.props;
      var txt2 = this.props.txt2? (<div>{this.props.txt2}</div>): <div />;
      return (
        <ListItem component="a" divider button>
          <ListItemIcon><FontAwesomeIcon icon="music"/></ListItemIcon>
          <ListItemText>{this.props.txt}{txt2}</ListItemText>
        </ListItem>
      );
    }
});

export default Publications;
