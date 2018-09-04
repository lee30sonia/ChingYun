import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

export const theme = createMuiTheme({
  palette: {
    primary: {main: '#408c8c'}, //'#d9a99d'},
  },
  status: {
    danger: 'orange',
  },
  /*typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '標楷體',
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
  },*/
});

export const styles = theme => ({
  root: {
    flexGrow: 1,
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
  },
});

export default styles;
