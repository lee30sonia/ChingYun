import React, { Component } from 'react';

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

import Paper from '@material-ui/core/Paper';

const Schedule = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={

      };   
    }
  
    render() {
      //const { classes } = this.props;

      return (
        <Paper> 練唱進度 </Paper>
      );
    }
  }
);

export default Schedule;