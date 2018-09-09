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
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

library.add(faMusic);

const Index = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
        imgStep: 0,
      };   
      this.handleNext = this.handleNext.bind(this);
      this.handleBack = this.handleBack.bind(this);
      this.handleStepChange = this.handleStepChange.bind(this);
    }

    handleNext = () => {
      this.setState(prevState => ({
        imgStep: prevState.imgStep + 1,
      }));
    };
  
    handleBack = () => {
      this.setState(prevState => ({
        imgStep: prevState.imgStep - 1,
      }));
    };
  
    handleStepChange = imgStep => {
      this.setState({ imgStep });
    };

    render() {
      const { classes } = this.props;

      var musicIcon = (<ListItemIcon><FontAwesomeIcon icon="music"/></ListItemIcon>);
      const imgDisplay = [
        {
          label: '1',
          imgPath: './img/photo_display1.jpg',
        },
        {
          label: '2',
          imgPath: './img/photo_display2.jpg',
        },
        {
          label: '3',
          imgPath: './img/photo_display3.jpg',
        },
      ];

      return (
        <div className={classes.MainPage}>
        <Grid container>
          <Grid item xs={1} sm={2} md={2} lg={3} xl={4}></Grid>
          <Grid item xs={10} sm={8} md={8} lg={6} xl={4}>
            <Paper className={classes.Paper}>
              <Typography variant="headline" component="h1" gutterBottom color="primary" align="center">
                關於青韵
              </Typography>
              <Typography component="p">
                青韵合唱團，1973年由台大之建北校友合唱團轉型而來，<br />
                團員年齡層橫跨大學生及社會人士。<br />
                近年在「客席指揮」、「出國比賽」、「台灣巡迴」三年一輪的固定規劃<br />
                及李葭儀、翁佳芬、戴怡音、張成璞等老師指導之下，音樂品質穩定成長。
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={1} sm={2} md={2} lg={3} xl={4}></Grid>
        </Grid>

        <Grid container>
          <Grid item xs={1} sm={2} md={2} lg={3} xl={4}></Grid>
          <Grid item xs={10} sm={8} md={8} lg={6} xl={4}>
            <Paper className={classes.Paper}>
              <Typography variant="headline" component="h1" gutterBottom color="primary" align="center">
                最新消息
              </Typography>
              
              <List>
                <ListItem>
                  {musicIcon}<ListItemText>馬德利加五十五週年音樂會 2018.10.26（五）19:30 @國家音樂廳</ListItemText>
                </ListItem>
                <ListItem>
                  {musicIcon}<ListItemText>新韻之聲 2018.11.18（日）14:30 @東吳大學松怡廳</ListItemText>
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={1} sm={2} md={2} lg={3} xl={4}></Grid>
        </Grid>

        <Grid container>
          <Grid item xs={1} sm={2} md={2} lg={3} xl={4}></Grid>
          <Grid item xs={10} sm={8} md={8} lg={6} xl={4} className={classes.photoDisplay}>
            <SwipeableViews
              axis='x'
              index={this.state.imgStep}
              onChangeIndex={this.handleStepChange}
              enableMouseEvents
            >
              {imgDisplay.map(step => (
                <img key={step.label} className={classes.img} src={step.imgPath} alt={step.label} />
              ))}
            </SwipeableViews>
            <MobileStepper
              steps={imgDisplay.length}
              position="static"
              activeStep={this.state.imgStep}
              className={classes.mobileStepper}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={this.state.imgStep === imgDisplay.length - 1}>
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={this.state.imgStep === 0}>
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </Grid>
          <Grid item xs={1} sm={2} md={2} lg={3} xl={4}></Grid>
        </Grid>

        </div>
      );
    }
});

export default Index;
