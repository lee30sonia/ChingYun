import { createMuiTheme } from '@material-ui/core/styles';
//import green from '@material-ui/core/colors/green';


export const theme = createMuiTheme({
  breakpoints:{
    values: {
      xs: 0,
      sm: 530,
      md: 670,
      lg: 960,
      xl: 1920
    }
  },
  palette: {
    primary: {main: '#095d79', light: '#2b9fc5', contrastText: '#b5e8eb'}, // '#408c8c' '#d9a99d'
  }, // '#b5e8eb' '#8adde2' '#71ced3' '#2b9fc5' '#095d79'
  status: {
    danger: 'orange',
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    //useNextVariants: true,
    fontFamily: [
      'Noto Sans TC',
      '微軟正黑體',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 16,
  },
});

export const Navtheme = outerTheme => ({
  ...outerTheme,
  palette: {
    ...outerTheme.palette,
    background: {
      ...outerTheme.palette.background,
      paper: outerTheme.palette.primary.main
    }
  },
  typography: {
    ...outerTheme.typography,
    subheading: {
      ...outerTheme.typography.subheading,
      color: outerTheme.palette.primary.contrastText
    },
  },
});

export const styles = theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]:{ minHeight: window.innerHeight - 200},
    [theme.breakpoints.up('sm')]:{ minHeight: window.innerHeight - 100},
  },

  Nav: {
    marginBottom: theme.spacing.unit*3,
    position: 'fixed'
  },

  MainPage: {
    [theme.breakpoints.down('sm')]:{marginTop: theme.spacing.unit*3+70},
    [theme.breakpoints.up('md')]:{marginTop: theme.spacing.unit*3+70},
    [theme.breakpoints.between('sm','md')]:{marginTop: theme.spacing.unit*3+120}
  },

  NavList: {
    display: 'flex', //'inline-block',
    flexDirection: 'row',
    padding: 0,
  },

  NavCollapseOn: {
    overflow: 'visible'
  },

  NavCollapseOff: {
    overflow: 'hidden'
  },

  SubNavMenu: {
    //[theme.breakpoints.down('xs')]:{width: '9%'},
    [theme.breakpoints.only('sm')]:{width: '15%',marginTop: '110px',},
    [theme.breakpoints.only('md')]:{width: '12%',marginTop: '110px',},
    [theme.breakpoints.only('lg')]:{width: '9%',marginTop: '50px',},
    [theme.breakpoints.only('xl')]:{width: '5%',marginTop: '50px',},
    //height: '100px',
    backgroundColor: theme.palette.primary.main,
  },

  MobileNav: {
    padding: theme.spacing.unit*3,
  },

  NavListItem: {
    paddingLeft: 0,//theme.spacing.unit*0.8,
    paddingRight: 0,//theme.spacing.unit*0.8,
    paddingTop: theme.spacing.unit*1.5,
    paddingBottom: theme.spacing.unit*1.5,
  },

  NavListText: {
    width: '80px',
    [theme.breakpoints.up('sm')]: {textAlign: 'center'},
    paddingRight: 0,
    color: theme.palette.primary.contrastText
  },

  menuIcon: {
    color: theme.palette.primary.contrastText,
  },

  alignLeft: {
    justifyContent: 'flex-start'
  },

  inset: {
    paddingLeft: theme.spacing.unit * 4,
  },

  logo: {
    height: '60px'
  },

  Paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },

  PaperTitle: {
    padding: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up('md')]:{
      marginLeft: window.innerWidth * 0.3,
      marginRight: window.innerWidth * 0.3,}
  },

  Card: {

    margin: theme.spacing.unit * 2,
  },

  photoDisplay: {
    margin: theme.spacing.unit * 2,
  },

  img: {
    width: '100%',
    margin: theme.spacing.unit * 2,
  },

  imgFitIn: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 5,
    [theme.breakpoints.only('xl')]:{width: '60%'},
    [theme.breakpoints.only('lg')]:{width: '80%'},
    [theme.breakpoints.only('md')]:{width: '80%'},
    [theme.breakpoints.only('sm')]:{width: '90%'},
    [theme.breakpoints.only('xs')]:{width: '70%', marginTop: '0'},
    
  },

  ListItemDense: {
    paddingTop: '0'
  },

  Footer: {
    padding: theme.spacing.unit * 2,
    fontSize: theme.typography.fontSize*0.9,
    textAlign: 'center'
    /*position: 'fixed',
    bottom: '0',
    width: '100%'*/
  },

  teacherImg: {
    height: '200px',
  },

  video: {
    [theme.breakpoints.down('xs')]: {
      width: '272px',
      height: '153px'},
    [theme.breakpoints.between('sm','md')]: {
      width: '400px',
      height: '225px'},
    [theme.breakpoints.up('md')]: {
      width: '528px',
      height: '297px' },
  },

  calendar: {
    height: '600px',
    width: '80%',
    border: '0',
    margin: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 5,
  },

  Chip: {
    margin: theme.spacing.unit,
  },

  BuyTextField: {
    width: '50%',
    [theme.breakpoints.between('sm','lg')]: {width: '100%',},
    margin: theme.spacing.unit
  },

  TextField: {
    [theme.breakpoints.only('lg')]: {width: '45%',},
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
});

export default styles;
