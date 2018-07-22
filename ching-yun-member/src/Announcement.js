import React, { Component } from 'react';

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Announcement = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={

      };   
    }
  
    render() {
      //const { classes } = this.props;

      return (
        <Paper>  
          <Typography component="p" className="announce">
            新樂季練唱將於7/21開始！
          </Typography>
        </Paper>
      );
    }
  }
);

export default Announcement;