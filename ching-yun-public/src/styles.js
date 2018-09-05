import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';


export const theme = createMuiTheme({
  palette: {
    primary: {main: '#095d79', light: '#2b9fc5', contrastText: '#b5e8eb'}, // '#408c8c' '#d9a99d'
  }, // '#b5e8eb' '#8adde2' '#71ced3' '#2b9fc5' '#095d79'
  status: {
    danger: 'orange',
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Noto Sans TC',
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
  },
});

export const Navtheme = outerTheme => ({
  ...outerTheme,
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
  },

  Nav: {
    marginBottom: theme.spacing.unit*3,
    height: '90px',
  },

  NavList: {
    display: 'flex', //'inline-block',
    flexDirection: 'row',
    padding: 0,
  },

  NavListItem: {
    padding: 0
  },

  NavListText: {
    width: '90px',
    textAlign: 'center',
    paddingRight: 0,
    color: theme.palette.primary.contrastText
  },

  NavListLogo: {
    width: '200px',
    marginRight: '100px'
  },

  logo: {
    height: '70px'
  },

  Paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    textAlign: 'center',
  },

  /*tableroot: {
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
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  list: {
    width: '75%',
    maxWidth: 360,
    backgroundColor: theme.palette.primary.light,
  },
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
  appBar: {
    position: 'relative',
    textAlign: 'center'
  },*/
});

export default styles;
