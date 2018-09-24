import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
//import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Chip from '@material-ui/core/Chip';

const Performances = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      const songs = [
      {
        key: 0,
        title: "Magnificat",
        info: "<div>詞/John Lingard 曲/Jonathan Willcocks<br/>指揮：馬韻珊  女高音：林慈音  演出：青韵合唱團、台北市民交響樂團</div>",
        link: "z0wasH4QhKQ",
        description: "<p>英國的作曲家喬納森.威爾克斯(Jonathan Willcocks, b. 1953)，作品以合唱與管弦樂為主。曾任倫敦皇家音樂學院指導，現任樸茨茅斯交響合唱團(Portsmonth Choral Union)、吉爾福德合唱團(Guildford Choral Society)、奇切斯特歌手(Chichester Singers)及職業室內樂南方音樂(Southern Pro Musica)的音樂總監。</p><p>這首作品共有五個樂章，歌詞取自拉丁文傳統頌歌《尊主頌》和《三一頌》，以及兩首十五世紀法國傳統頌歌的英文歌詞。整首曲子大量使用對位手法以及節奏的變化，使旋律清晰流暢卻又十分豐富。第一、三、五樂章都是以氣勢十足的方式開場，各聲部對位交錯，製造出歡騰的氣氛，表達馬利亞對神高唱讚頌的喜悅之情;並以鏗鏘有力的旋律和力度強度的變化，表現神在拯救人民時所展現的大能;再加上明亮的和聲呈現頌歌的榮耀與莊嚴。第二、四樂章舒緩而甜美，由女高音帶領旋律，描述馬利亞純潔而充滿恩典的形象，傳達對救主的感恩，以及對聖母的讚嘆與敬愛之情。本次演出版本為搭配室內樂團的編制演出。</p>",
        lyrics: "<p><strong>I. Magnificat<br/></strong>Magnificat anima mea Dominum:<br/>Et exultavit spiritus meus in Deo salutari meo.<br/>Quia respexit humilitatem ancillae suae: <br/>Ecce enim ex hoc beatam me dicent omnes generationes.<br/>Quia fecit mihi magna qui potens est: <br/>Et sanctum nomen ejus.<br/><br/>馬利亞說：我心尊主為大<br/>我靈以神，我的救主為樂<br/>因為他顧念他使女的卑微<br/>從今以後，萬代要稱我有福<br/>那有權能的，為我成就了大事<br/>他的名為聖<br/><br/><br/><strong>II. Et Misericordia<br/></strong>Et misericordia ejus a progenie in progenies timentibus eum.<br/>Hail Mary, full of grace,<br/>thou who didst bear the Savior of our race; <br/>Hail Mary, Queen of heaven,<br/>turn not from us thy face.<br/><br/>他憐憫敬畏他的人<br/>直到世世代代<br/>稱頌聖母，充滿恩慈<br/>生下我們的救主<br/>稱頌聖母，天國之后<br/>慈顏不離<br/><br/><br/><strong>III. Fecit potentiam<br/></strong>Fecit potentiam in brachio suo: <br/>Dispersit superbos mente cordis sui.<br/>Deposuit potentes de sede <br/>et exaltavit humiles, <br/>esurientes implevit bonis: <br/>et divites dimisit inanes.<br/>Suscepit Israel puerum suum, <br/>recordatus misericordiae suae,<br/>Sicut locutus est ad patres nostros, <br/>Abraham et semini ejus in saecula<br/><br/>他用膀臂施展大能：<br/>那狂傲的人正妄想，就被他趕散了<br/>他叫有權柄的失位<br/>叫卑賤的升高<br/>叫飢餓的得飽美食<br/>叫富足的空手回去<br/>他扶助了他的僕人以色列<br/>為要記念亞伯拉罕和他的後裔，<br/>施憐憫直到永遠，<br/>正如從前對我們列祖所說的話<br/><br/><br/><strong>IV. There Is No Rose of Such Virtue<br/></strong>There is no rose of such virtue<br/>as is the rose that bare Jesu;<br/>For in this rose<br/>contained was heaven and earth in little space. <br/>By that rose we may well see that<br/>he is God in persons three.<br/>The angels sungen the shepherds to: <br/>Gloria in excelsis Deo.<br/>Alleluia.<br/><br/>沒有一朵玫瑰有如此美德<br/>如孕育耶穌的那朵一般<br/>因為在它<br/>微小的空間裡蘊藏著天與地<br/>由這朵玫瑰我們可以看出<br/>他是三位一體的神<br/>天使對著牧羊人唱著：<br/>榮耀歸主<br/>哈雷路亞<br/><br/><br/><strong>V. Gloria Patri<br/></strong>Gloria Patri, et Filio, et Spiritui Sancto. <br/>Sicut erat in principio, et nunc, et semper, <br/>et in saecula seculorum.<br/>Amen<br/><br/>願光榮歸於父、及子、及聖神<br/>起初如何，今日亦然<br/>直到永遠<br/>阿門</p>"

      },
      {
        key: 1,
        title: "Magnificat",
        info: "<div>詞/John Lingard 曲/Jonathan Willcocks<br/>指揮：馬韻珊  女高音：林慈音  演出：青韵合唱團、台北市民交響樂團</div>",
        link: "z0wasH4QhKQ",
        description: "<p>英國的作曲家喬納森.威爾克斯(Jonathan Willcocks, b. 1953)，作品以合唱與管弦樂為主。曾任倫敦皇家音樂學院指導，現任樸茨茅斯交響合唱團(Portsmonth Choral Union)、吉爾福德合唱團(Guildford Choral Society)、奇切斯特歌手(Chichester Singers)及職業室內樂南方音樂(Southern Pro Musica)的音樂總監。</p><p>這首作品共有五個樂章，歌詞取自拉丁文傳統頌歌《尊主頌》和《三一頌》，以及兩首十五世紀法國傳統頌歌的英文歌詞。整首曲子大量使用對位手法以及節奏的變化，使旋律清晰流暢卻又十分豐富。第一、三、五樂章都是以氣勢十足的方式開場，各聲部對位交錯，製造出歡騰的氣氛，表達馬利亞對神高唱讚頌的喜悅之情;並以鏗鏘有力的旋律和力度強度的變化，表現神在拯救人民時所展現的大能;再加上明亮的和聲呈現頌歌的榮耀與莊嚴。第二、四樂章舒緩而甜美，由女高音帶領旋律，描述馬利亞純潔而充滿恩典的形象，傳達對救主的感恩，以及對聖母的讚嘆與敬愛之情。本次演出版本為搭配室內樂團的編制演出。</p>",
        lyrics: "<p><strong>I. Magnificat<br/></strong>Magnificat anima mea Dominum:<br/>Et exultavit spiritus meus in Deo salutari meo.<br/>Quia respexit humilitatem ancillae suae: <br/>Ecce enim ex hoc beatam me dicent omnes generationes.<br/>Quia fecit mihi magna qui potens est: <br/>Et sanctum nomen ejus.<br/><br/>馬利亞說：我心尊主為大<br/>我靈以神，我的救主為樂<br/>因為他顧念他使女的卑微<br/>從今以後，萬代要稱我有福<br/>那有權能的，為我成就了大事<br/>他的名為聖<br/><br/><br/><strong>II. Et Misericordia<br/></strong>Et misericordia ejus a progenie in progenies timentibus eum.<br/>Hail Mary, full of grace,<br/>thou who didst bear the Savior of our race; <br/>Hail Mary, Queen of heaven,<br/>turn not from us thy face.<br/><br/>他憐憫敬畏他的人<br/>直到世世代代<br/>稱頌聖母，充滿恩慈<br/>生下我們的救主<br/>稱頌聖母，天國之后<br/>慈顏不離<br/><br/><br/><strong>III. Fecit potentiam<br/></strong>Fecit potentiam in brachio suo: <br/>Dispersit superbos mente cordis sui.<br/>Deposuit potentes de sede <br/>et exaltavit humiles, <br/>esurientes implevit bonis: <br/>et divites dimisit inanes.<br/>Suscepit Israel puerum suum, <br/>recordatus misericordiae suae,<br/>Sicut locutus est ad patres nostros, <br/>Abraham et semini ejus in saecula<br/><br/>他用膀臂施展大能：<br/>那狂傲的人正妄想，就被他趕散了<br/>他叫有權柄的失位<br/>叫卑賤的升高<br/>叫飢餓的得飽美食<br/>叫富足的空手回去<br/>他扶助了他的僕人以色列<br/>為要記念亞伯拉罕和他的後裔，<br/>施憐憫直到永遠，<br/>正如從前對我們列祖所說的話<br/><br/><br/><strong>IV. There Is No Rose of Such Virtue<br/></strong>There is no rose of such virtue<br/>as is the rose that bare Jesu;<br/>For in this rose<br/>contained was heaven and earth in little space. <br/>By that rose we may well see that<br/>he is God in persons three.<br/>The angels sungen the shepherds to: <br/>Gloria in excelsis Deo.<br/>Alleluia.<br/><br/>沒有一朵玫瑰有如此美德<br/>如孕育耶穌的那朵一般<br/>因為在它<br/>微小的空間裡蘊藏著天與地<br/>由這朵玫瑰我們可以看出<br/>他是三位一體的神<br/>天使對著牧羊人唱著：<br/>榮耀歸主<br/>哈雷路亞<br/><br/><br/><strong>V. Gloria Patri<br/></strong>Gloria Patri, et Filio, et Spiritui Sancto. <br/>Sicut erat in principio, et nunc, et semper, <br/>et in saecula seculorum.<br/>Amen<br/><br/>願光榮歸於父、及子、及聖神<br/>起初如何，今日亦然<br/>直到永遠<br/>阿門</p>"

      },
      ];

      this.songs = songs;

      var tmp = [];
      for (let i=0; i<this.songs.length; i++) {
        tmp.push({title: songs[i].title, ref: React.createRef(), key: songs[i].key});
      }

      this.state={
        ref: tmp
      };
    }

    render() {
      const { classes } = this.props;

      return (
        <div className={classes.MainPage}>
          <Paper className={classes.PaperTitle}>
            <Typography variant="headline" component="h1" color="primary" align="center">
              青韵合唱團精彩演出
            </Typography>
          </Paper>
          <Chips refs={this.state.ref}/>
          <Grid container>
            <Grid item xs={false} xl={3}></Grid>
            <Grid item xs={12} xl={6}>
              
                

                <Grid container spacing={16}>
                {this.songs.map(obj=>(
                  <Grid item xs={12} key={obj.key}>
                  <Card className={classes.Card}>
                    <Content title={obj.title} info={obj.info} link={obj.link} des={obj.description} lyr={obj.lyrics} ref={this.state.ref[obj.key].ref}/>
                  </Card>
                  </Grid>
                ))}
                </Grid>
              
            </Grid>
            <Grid item xs={false} xl={3}></Grid>
          </Grid>
        </div>
      );
    }
});

const Content = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
        lyrics: false
      };
    }

    render() {
      const { classes } = this.props;
      return (

        <CardContent>
          <Grid container>
            <Grid item xs={12} lg={10} xl={10}>
              <Typography variant="title" gutterBottom color="primary">
                {this.props.title}
              </Typography>
            </Grid>
            <Hidden mdDown><Grid item lg={2} xl={2}>
              <Button variant='outlined' style={{margin: '5px'}} onClick={()=>{this.setState({lyrics: false})}}> 曲介 </Button>
              <Button variant='outlined' onClick={()=>{this.setState({lyrics: true})}}> 歌詞 </Button>
            </Grid></Hidden>
          </Grid>

          
          <Grid container>
            <Grid item xs={12} md={12} lg={8} xl={7}>
              <Typography variant="subheading" gutterBottom>
                <div dangerouslySetInnerHTML={{__html: this.props.info}} />
              </Typography>
              <iframe className={classes.video} src={"https://www.youtube.com/embed/"+this.props.link} title={this.props.title} frameBorder="0" allowFullScreen></iframe>
            </Grid>
            <Hidden lgUp>
              <Button variant='outlined' style={{margin: '5px', marginTop: '20px', marginBottom: '10px'}} onClick={()=>{this.setState({lyrics: false})}}> 曲介 </Button>
              <Button variant='outlined' style={{marginTop: '20px', marginBottom: '10px'}} onClick={()=>{this.setState({lyrics: true})}}> 歌詞 </Button>
            </Hidden>
            <Grid item xs={12} md={12} lg={4} xl={5}>
              <Card style={{height:'389.4px', overflow: 'scroll'}}>
                <CardContent>
                  {this.state.lyrics? <div dangerouslySetInnerHTML={{__html: this.props.lyr}} />:
                                      <div dangerouslySetInnerHTML={{__html: this.props.des}} />}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
        </CardContent>
      );
    }
});

const Chips = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return (
        <div>
          {this.props.refs.map(obj=>(
            <Chip
              label={obj.title} className={classes.Chip} key={obj.key}
              onClick={()=>{window.scrollTo(0, ReactDOM.findDOMNode(obj.ref.current).offsetTop-120);}}            
            />
          ))}
        </div>
      );
    }
});

export default Performances;
