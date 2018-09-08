import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import Grid from '@material-ui/core/Grid';
//import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const Index = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return (
        <Paper className={classes.Paper}>
          首頁
        </Paper>
      );
    }
});

const About = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return (
        <Paper className={classes.Paper}>
          關於
        </Paper>
      );
    }
});

const NotFound = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return (
        <Paper className={classes.Paper}>
          <h1> 404 </h1>
          <p>
            您欲前往的頁面不存在，或正在施工中...
          </p>
        </Paper>
      );
    }
});

export default Index;
