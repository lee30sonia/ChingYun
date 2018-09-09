import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import Grid from '@material-ui/core/Grid';
//import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const About = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.MainPage}>
          <Grid container>
            <Grid item xs={0} sm={1} md={1} lg={2} xl={3}></Grid>
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
              <Paper className={classes.Paper}>
                <h1> 關於青韵 </h1>
              
<p>青韵合唱團前身為台大之建中、北一女校友合唱團，至今已有四十三年歷史，於 1973 年擴大
吸收社會上愛好音樂之校友，並定名「青韵合唱團」，為台灣歷史悠久的合唱團之一。歷年
承蒙陳建中、饒韻華、陳樹熙、陸蘋、洪綺玲、李葭儀、翁佳芬、戴怡音、張成璞等老師指導，
音樂品質穩定成長。<br/></p>
<p>
目前青韵合唱團又分為大團、室內團及草莓團。大團由張成璞老師帶領，積極嘗試不同風格
的曲目，並固定舉辦年度音樂會，及與建中、北一女學弟妹交流。室內團於 2003 年成立，由
翁佳芬老師指揮，致力於小而精緻的合唱音樂，亦曾多次發表委託創作作品。草莓團則由創
團時期的資深團員組成，由李葭儀老師帶領，使團員能夠定期交流音樂與彼此間的情誼。<br/></p>
<p>
除了定期回饋母校，與建中、北一女學弟妹交流外；近年來青韵合唱團也致力發展更多元、
精緻的合唱音樂，在三位老師的指導之下，逐漸累積音樂實力，積極參與各項比賽與交流，
於 2014 年赴新加坡國際音樂節，獲民謠組金牌、混聲組銀牌的佳績。並透過演唱本土作曲家
的作品，期許透過歌者與聽眾間的對話，分享音樂的美好與感動。<br/></p>
<p>
走過台灣合唱四十多年，藉著歌唱，每位團員在各自的生命經歷裡，找到相同的感動與記憶。
青韵合唱團將持續結合青年愛樂者，傳播並推廣合唱音樂。期許我們能憑藉對合唱的熱情與
執著，繼續前行，喚醒並傳承社會對於藝術活動的關注，為這塊土地的音樂發聲。<br/></p>
              
              </Paper>
            </Grid>
            <Grid item xs={0} sm={1} md={1} lg={2} xl={3}></Grid>
          </Grid>
        </div>
      );
    }
});

export default About;
