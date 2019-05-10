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
import Chip from '@material-ui/core/Chip';

const Teachers = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      const teachers = [
      {
        key: 0,
        title: "指揮　李葭儀老師",
        img: "/img/teacher1.jpg",
        html: "<p>台灣大學外文系畢業、國立藝術學院（今國立台北藝術大學）音樂系第一屆聲樂組畢業。美國伊利諾大學聲樂演唱碩士。先後師事洪綺玲、Eugene Fernandi、唐鎮、Ollie W. Davis、Eric Dalheim等教授。</p><p>1977年加入青韵合唱團，奠下日後專攻音樂的契機。1990年返國後，即積極參與國內外音樂會及歌劇、神劇演出活動，擔任女高音獨唱及合唱指導。並自1993年起擔任青韵合唱團指揮迄今。合作之音樂團體包括國立台北藝術大學交響樂團、合唱團、朱宗慶打擊樂團、漢聲合唱團、青韵合唱團、關渡室內樂團及新世界歌劇坊等。定期參加青韵合唱團及關渡藝術節演出，並屢次為國人作曲家發表作品。自2000年始，陸續以專題形式於國家演奏廳發表八場藝術歌曲演唱會，深受好評。目前為國立台北藝術大學音樂系所專任副教授。</p>"
      },
      {
        key: 1,
        title: "指揮　翁佳芬老師",
        img: "/img/teacher2.jpg",
        html: "<p>台灣省嘉義縣人。民國六十八年考取北一女中，並參加北一女合唱團。民國七十年第一次參加青&#38901;、建中、北一女三團聯合演唱會。民國七十一年考取師大音樂系，主修聲樂，師事辛永秀教授，之後以第一名考入師大音樂研究所，主修管弦樂指揮，師事張大勝教授。赴美國奧斯汀德州大學（U. T. Austin）取得合唱指揮博士，主修合唱指揮，師事Dr. M. Beachy。</p><p>1982年加入青&#38901;合唱團，結下與合唱的不解之緣，1996年返國任教，並積極投入合唱教育紮根工作，參加各縣市合唱教育研習活動，並擔任國內重要合唱比賽評審。</p><p>曾任台北仁愛國中、成功高中音樂教師，師大合唱團、台北市教師合唱團、高雄市教師合唱團、台北室內合唱團指揮，台北世紀合唱團、國立實驗合唱團客席指揮。現為國立中山大學音樂系教授與系主任，兼任於國立台灣師範大學音樂研究所指揮組，並擔任中山大學音樂系合唱團、高雄室內合唱團、青&#38901;室內合唱團及青&#38901;合唱團藝術總監；為美國合唱聯盟（ACDA）、世界合唱音樂聯盟（IFCM）會員。</p>"
      },
      {
        key: 2,
        title: "指揮　戴怡音老師",
        img: "/img/teacher3.jpg",
        html: "<p>自幼受母親啟蒙學習鋼琴，後隨陳承助、廖美英及曾素芝等老師學習大提琴。曾任北一女中管弦樂團及成功大學管弦樂團大提琴首席；於1996年三月指揮成大合唱團參加台灣區合唱比賽榮獲大專組優等；同年七月為慶祝成大合唱團成立40週年指揮成大合唱團及校友團做全省巡迴演出。成功大學資源工程系畢業後；於1998年9月考入美國羅徹斯特大學伊士曼音樂學院碩士班( University of Rochester, Eastman School of Music )，主修合唱指揮師事Dr. William Weinert，副修管弦樂指揮師事Maestro Mendi Rodan， 2000年5月獲合唱指揮碩士學位。於2000年(同年) 獲全額獎學金進入美國威斯康辛大學麥迪生分校博士班( University of Wisconsin – Madison )，主修合唱指揮師事Professor Beverly Taylor，管弦樂指揮師事Professor David Becker，聲樂師事Professor Paul Rowe，並擔任學校助教。於2004年5月取得合唱指揮藝術博士學位。現任榮星合唱團指揮暨藝術總監；任教於國立台中教育大學、台灣神學院、東吳大學和輔仁大學，並擔任青&#38901;合唱團、台北當代合唱團、成功大學台北校友團指揮。</p>"
      },
      {
        key: 3,
        title: "指揮　張成璞老師",
        img: "/img/teacher4.jpg",
        html: "<p>美國邁阿密大學合唱指揮博士，師事Dr. Jo-Michael Scheibe和Dr. Donald Oglesby。國立中山大學音樂研究所合唱指揮碩士，師事翁佳芬教授。國立台灣大學動物系、心理系雙學位畢業。</p><p>目前擔任青&#38901;合唱團、政大校友合唱團、高雄室內合唱團、高雄漢聲合唱團、青青合唱團指揮，並任教於國立高雄師範大學音樂學系、國立中山大學音樂學系及研究所、國立台中教育大學音樂學系、台南神學院教會音樂研究所，現為台灣合唱協會理事、世界合唱聯盟(IFCM)會員。曾任中國醫藥大學駐校藝術家，高雄醫學大學合唱團、直締友聲合唱團、邁阿密大學女聲合唱團、邁阿密大學室內合唱團指揮，成功大學校友合唱團、台中新世紀合唱團、福爾摩沙合唱團、木樓合唱團客席指揮。</p><p>在美國亦修習樂團指揮，並曾獲選參與巴爾的摩交響樂團音樂總監Marin Alsop大師班。合唱指揮方面，曾受教於巴哈音樂權威Helmut Rilling、克里夫蘭交響樂團合唱團指揮Robert Porco、南美合唱音樂大師Maria Guinand之大師班。</p>"
      },
      {
        key: 4,
        title: "聲樂指導　林中光老師",
        img: "/img/teacher5.jpg",
        html: "<p>國立台灣師範大學音樂學系藝術學博士、東海大學音樂研究所碩士，UCSB Vocal Institute結業並獲Excellence證書。主修聲樂曾師事陳思照、王凱蔚、E. Lanza、E. Mannion、W. Scheidt、R. Doling、李秀芬及陳榮貴等諸位教授，博士論文由陳漢金教授指導。現為國立台北藝術大學與國立台中教育大學音樂學系兼任助理教授、成大校友合唱團及青&#38901;合唱團之聲樂指導、並為聲樂家協會基本會員。</p><p>近年來多次與國內各大交響樂團合作，主演或演出歌劇角色超過二十部。林中光除了不間斷的演出邀約與定期獨唱會外，他也開始往歌劇導演方面發展，曾擔任莫札特《唐•喬凡尼》、《伊多美聶歐》之助理導演，亦曾執導莫札特《女人皆如此》選粹、普契尼《蝴蝶夫人》第二幕、《波希米亞人》精粹、全本《強尼．史基基》、梅諾第《電話》、伯恩斯坦《西城故事》選粹、威爾第《茶花女》、巴哈《咖啡清唱劇》、莫札特《魔笛》與勛伯格《悲慘世界》精選、小約翰•史特勞斯《蝙蝠》，另擔任董尼才第《愛情靈藥》之副導演；2016年執導莫札特《後宮誘逃》。</p>"
      },
      {
        key: 5,
        title: "聲樂指導　何欣蘋老師",
        img: "/img/teacher6.jpg",
        html: "<p>桃園縣人。自幼學習鋼琴，於國小三年級，以鋼琴主修進入桃園市立西門國小音樂資優班。1992年就讀於桃園市立中興國中音樂班時，開始習唱聲樂，啟蒙老師莊美麗老師。之後以聲樂為主修，1995年考取桃園縣立武陵高中音樂班，師事陸蘋老師，林美智老師。</p><p>1998年甄試進入國立藝術學院(現國立台北藝術大學)音樂學系就讀，師事李葭儀老師，Prof. Lorraine Nawa Jones。2000年6月進入台北愛樂合唱團，與指揮林望傑合作演出馬勒第二號交響曲”復活”。2000年11月，隨COSMOS新世紀歌劇團於國家音樂廳演出莫札特歌劇“魔笛”,飾三侍女之一。2001年4月，獲選前往日本橫須賀參加”NEW VOICE”國際聲樂大賽，為同屆參賽者中，年紀最小的參賽者之一。2001年10月，隨新世紀歌劇團於國家音樂廳演出威爾第歌劇“法斯塔夫”中的九重唱。2002年3月，再度隨新世紀歌劇團於國家音樂廳演出，演唱羅西尼歌劇“塞爾維亞的理髮師”之選曲，飾羅西娜一角。</p><p>2003年9月，進入國立台北藝術大學音樂學系碩士班聲樂組就讀，師事徐以琳教授。2003年11月，參加世界華人聲樂大賽，進入決賽。2005年5月，再度獲選前往日本橫須賀參加”NEW VOICE”國際聲樂大賽。2005年6月，取得碩士學位。2006年8月，與指揮李格悌（Andras Ligeti）及台北市立交響樂團合作，於城市舞台演出莫札特歌劇“唐喬凡尼”Don Giovanni，飾采莉娜Zerlina一角。2007年6月，與指揮邱君強及台北愛樂青年管絃樂團合作演唱威爾第歌劇”弄臣”中的詠嘆調”親愛的名字”。</p><p>現任教於桃園縣武陵高中音樂班，並為青&#38901;合唱團聲樂指導及台北愛樂合唱團駐團歌手。</p>"
      },
      {
        key: 6,
        title: "聲樂指導　楊磊老師",
        img: "/img/teacher7.jpg",
        html: "<p>自幼學習小提琴與鋼琴，1990年考入國立台灣藝術專科學校音樂科聲樂組；並加入行政院文建會所扶植的浦公英兒童劇團於1990-93年間全台巡迴演出，奠定了舞台表演與劇場行政的基礎，1995參加南非羅德寶國際聲樂大賽獲得銅牌，1997年以第一名優異成績畢業於國立台灣藝術學院。</p><p>現任懷恩堂歌詠詩班、學青詩班、節慶管弦樂團指揮、石牌信友堂和散那詩班指揮，成大校友合唱團、青&#38901;合唱團、海星高中合唱團、石牌信友堂詩班、靈糧堂雅音詩班聲樂指導。</p>"
      },
      {
        key: 7,
        title: "聲樂指導　劉欣怡老師",
        img: "/img/teacher8.jpg",
        html: "<p>臺灣新竹人，國立臺北藝術大學音樂系畢業，主修聲樂。由彭碧君老師啟蒙，先後師事於李寶鈺、Lorraine Nawa Jones，現隨李葭儀教授繼續鑽研。曾任台北愛樂室內合唱團團員，為2015台北國際合唱音樂節閉幕音樂會：卡爾•詹金斯《武裝之人：和平彌撒》擔任女低音獨唱。現為潔璐品歌手及「崇德雅集」團長。</p>"
      },
      {
        key: 8,
        title: "聲樂指導　蔡漢俞老師",
        img: "/img/teacher9.jpg",
        html: "<p>畢業於國立臺灣師範大學表演藝術研究所、國立臺灣師範大學音樂系。現為桃園市立南崁高中音樂班聲樂老師、基隆市立基隆高中音樂班聲樂老師、臺北市立中崙高中音樂劇課程特約唱歌老師、臺灣師範大學合唱團合唱指導。</p><p>2017 年 2 月於國家音樂廳參與長榮交響樂團製作之韋伯歌劇《魔彈射手》，飾演「祁里安」；9 月與薪橋國樂團及青韵合唱團合作演出「青聲薪語」音樂會，擔任男中音獨唱；10 月於國家音樂廳，與陽光交響樂團合作演出威爾第歌劇《茶花女》，飾演「杜佛伯爵」、於國家演奏廳參與「第一屆臺灣盃中文歌曲比賽優勝者」音樂會、並於國家演奏廳，參與「2017 臺北國際現代音樂節」系列之「現代聲樂作品音樂會」;11 月與日本東京藝術大學交流演出「2017 Opera Highlights」。</p>"
      },
      ];
      this.teachers = teachers;

      var tmp = [];
      for (let i=0; i<this.teachers.length; i++) {
        tmp.push({title: teachers[i].title, ref: React.createRef(), key: teachers[i].key});
      }

      this.state={
        refs: tmp
      };
    }
    render() {
      const { classes } = this.props;

      return (
        <div className={classes.MainPage}>
          <Grid container>
            <Grid item xs={false} sm={1} md={1} lg={1} xl={3}></Grid>
            <Grid item xs={12} sm={10} md={10} lg={10} xl={6}>
              <Paper className={classes.Paper}>
                <Typography variant="h5" gutterBottom color="primary">
                  音樂指導
                </Typography>

                {this.state.refs.map(obj=>(
                  <Chip
                    label={obj.title} className={classes.Chip} key={obj.key}
                    onClick={()=>{window.scrollTo(0, ReactDOM.findDOMNode(obj.ref.current).offsetTop-120);}}            
                  />
                ))}

                <Grid container spacing={16}>
                {this.teachers.map(obj=>(
                  <Grid item xs={12} lg={6} key={obj.key}>
                  <Card style={{height:'100%'}} ref={this.state.refs[obj.key].ref}>
                    <CardContent>
                      <Typography variant="subtitle1" component="h3" gutterBottom color="primary">
                        {obj.title}
                      </Typography>
                      <img src={obj.img} className={classes.teacherImg} alt={obj.title}/>
                      <div dangerouslySetInnerHTML={{__html: obj.html}} />
                    </CardContent>
                  </Card>
                  </Grid>
                ))}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={false} sm={1} md={1} lg={1} xl={3}></Grid>
          </Grid>
        </div>
      );
    }
});

export default Teachers;
