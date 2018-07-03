import React, { Component } from 'react';
import  CKEditor from "react-ckeditor-component";

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

import Paper from '@material-ui/core/Paper';


const ChatBoard = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
        content: ''
      };
      this.onChange = this.onChange.bind(this);
    }
    
    onChange(evt){
      //console.log("onChange fired with event info: ", evt);
      var newContent = evt.editor.getData();
      this.setState({
        content: newContent
      })
    }
    
    render() {
      const { classes } = this.props;

      return (
        <div>
          <Paper> 討論區 </Paper>
          <CKEditor 
            activeClass="p10" 
            content={this.state.content} 
            events={{
              "change": this.onChange
            }}
            />
        </div>
      );
    }
  }
);


export default ChatBoard;