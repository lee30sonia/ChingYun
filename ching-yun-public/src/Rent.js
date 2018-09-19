import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Hidden from '@material-ui/core/Hidden';

import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Rent = withStyles(styles)(
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

      const imgDisplay = [
        {
          label: '1',
          imgPath: './img/rent1.jpg',
        },
        {
          label: '2',
          imgPath: './img/rent2.jpg',
        },
        {
          label: '3',
          imgPath: './img/rent3.jpg',
        },
        {
          label: '4',
          imgPath: './img/rent4.jpg',
        },
        {
          label: '5',
          imgPath: './img/rent5.jpg',
        },
      ];

      return (
        <div className={classes.MainPage}>
        <Grid container alignItems='center'>
          <Hidden only={['xs']}><Grid item xs={false} sm={1} md={2} lg={1} xl={3}></Grid></Hidden>
          <Grid item xs={12} sm={10} md={8} lg={5} xl={4}>
            <Paper className={classes.Paper}>
              <Typography variant="headline" component="h1" gutterBottom color="primary" align="center">
                大坪林團部場地出租
              </Typography>
              <Typography variant="title" gutterBottom color="primary">空間特色</Typography>
                場地明亮寬敞、隔音佳，備有K.KAWAI 平台鋼琴。<br/>
                適合合唱團、阿卡貝拉、小型室內樂團、戲劇、音樂劇等藝文活動排演，<br/>
                也可作為對外公開演出或展覽的獨立空間。<br/><br/>
              
              <Typography variant="title" gutterBottom color="primary">場地資訊</Typography>
                大小：約26坪，長方格局<br/>
                容納人數：最多 60 人<br/><br/>
            
              <Typography variant="title" gutterBottom color="primary">交通位置</Typography>
                新北市新店區順安街 4 號 B1 <br/>
                （捷運大坪林站 4 號出口步行三分鐘）<br/><br/>

              <Typography variant="title" gutterBottom color="primary">使用用途</Typography>
                合唱團排練、室內樂團排練、戲劇排演、音樂劇排練、<br/>
                社團課程與活動、研討會、演講、<br/>
                小型演奏會、發表會...等<br/><br/>

              <Typography variant="title" gutterBottom color="primary">計價方式</Typography>
                1200元／3小時（長期租借合作另有價格優惠）<br/>
                出租時段：08:00-22:00<br/>
                請注意：週六12:00-22:00 為固定不出租時段<br/><br/>    
            </Paper>
          </Grid>
          <Hidden only={['xs','lg','xl']}><Grid item xs={false} sm={1} md={2} lg={false} xl={false}></Grid></Hidden>
          <Hidden only={['xs','lg','xl']}><Grid item xs={false} sm={1} md={1} lg={false} xl={false}></Grid></Hidden>

          <Grid item xs={12} sm={10} md={10} lg={6} xl={3}>
            <Paper className={classes.Paper}>
              <Typography variant="title" gutterBottom color="primary">場地實景</Typography>
              <Typography component="p" style={{textIndent: '0'}}>實景擺設僅供參考，可自由調整<br/></Typography> 
              <AutoPlaySwipeableViews
                axis='x'
                index={this.state.imgStep}
                onChangeIndex={this.handleStepChange}
                enableMouseEvents
                className={classes.photoDisplay}
              >
                {imgDisplay.map(step => (
                  <img key={step.label} style={{width:'100%'}} src={step.imgPath} alt={step.label} />
                ))}
              </AutoPlaySwipeableViews>
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
            </Paper>
          </Grid>          
        </Grid>

        <Grid container alignItems='center'>
          <Hidden only={['xs']}><Grid item xs={false} sm={1} md={1} lg={1} xl={3}></Grid></Hidden>
          <Grid item xs={12} sm={10} md={10} lg={10} xl={7}>
            <Paper className={classes.Paper}>
              <Typography variant="title" gutterBottom color="primary" align="center">免費設備提供</Typography>  
              <Grid container style={{marginTop:'40px'}}>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>         
                  <Typography variant="subheading" gutterBottom color="primary">一般設備</Typography>
                  <List>
                    <ListItem className={classes.ListItemDense}>白板</ListItem>
                    <ListItem className={classes.ListItemDense}>椅子：約50 張</ListItem>
                    <ListItem className={classes.ListItemDense}>桌子：3大張</ListItem>
                    <ListItem className={classes.ListItemDense}>冷氣、電風扇</ListItem>
                    <ListItem className={classes.ListItemDense}>飲水機、洗手間</ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={4}>
                  <img className={classes.imgFitIn} src='./img/rent7.jpg'/>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3} xl={2}> 
                  <Typography variant="subheading" gutterBottom color="primary">專業設備</Typography>
                  <List>
                    <ListItem className={classes.ListItemDense}>K.KAWAI 平台鋼琴1架</ListItem>
                    <ListItem className={classes.ListItemDense}>譜架7支</ListItem>
                    <ListItem className={classes.ListItemDense}>指揮椅1張</ListItem>
                    <ListItem className={classes.ListItemDense}>音響</ListItem>
                    <ListItem className={classes.ListItemDense}>電視機</ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={4}>
                  <img className={classes.imgFitIn} src='./img/rent6.jpg'/>
                </Grid>
              </Grid>
             
            </Paper>
          </Grid>         
        </Grid>

        </div>
      );
    }
});


export default Rent;
