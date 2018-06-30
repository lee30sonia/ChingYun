import React, { Component } from 'react';

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

import Paper from '@material-ui/core/Paper';


const ChatBoard = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={

      };   
    }
  
    render() {
      const { classes } = this.props;

      return (
        <Paper> 討論區 </Paper>
      );
    }
  }
);

export default ChatBoard;