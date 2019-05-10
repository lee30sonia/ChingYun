import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

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
    useNextVariants: true,
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

export const styles = theme => ({
  root: {
    flexGrow: 1,
  },

  appBar: {
    position: 'fixed',
    textAlign: 'center',
    zIndex: theme.zIndex.drawer + 1,
    height: '65px',
    width: window.width
  },

  logo: {
    height: '50px'
  },

  menuIcon: {
    color: theme.palette.primary.contrastText,
    position: 'fixed',
    left: '10px',
    top: '10px'
  },

  Paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  drawerPaper: {
    paddingTop: '65px',
    position: 'fixed',
    [theme.breakpoints.up('md')]:{ width: '15%'},
    [theme.breakpoints.between('xs','md')]:{ width: '19%'},
    [theme.breakpoints.between('xs','sm')]:{ width: '23%'},
    [theme.breakpoints.down('xs')]:{ width: '0', left: '-10px'},
    backgroundColor: theme.palette.primary.main,
    marginRight: '0px',
  },

  mobileDrawer: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: '65px',
    padding: '10px',
  },

  drawerText: {
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    padding: 0,
  },

  MainPage: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    //position: 'relative',
    display: 'flex',
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    display: 'flex',
    position: 'relative',
    top: '65px',
    [theme.breakpoints.up('md')]:{ left: '18%', width: '75%'},
    [theme.breakpoints.between('xs','md')]:{ left: '22%', width: '75%'},
    [theme.breakpoints.between('xs','sm')]:{ left: '28%', width: '70%'},
    [theme.breakpoints.down('xs')]:{ left: '0%', width: '100%'},
    //minWidth: 0, // So the Typography noWrap works
  },

  Announcement: {
    marginBottom: '20px',
    padding: '20px',
    textAlign: 'left',
    width: '100%',
  },



  tableroot: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  
  /*
  list: {
    width: '75%',
    maxWidth: 360,
    backgroundColor: theme.palette.primary.main,
  },*/


  

  

  margin: {
    margin: theme.spacing.unit,
  },
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  addBtn: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  progress: {
    margin: theme.spacing.unit * 2,
   },
  table: {
    minWidth: 700,
   },
  article: {
    minWidth: 275,
    marginBottom: 30
  },

});

export default styles;
