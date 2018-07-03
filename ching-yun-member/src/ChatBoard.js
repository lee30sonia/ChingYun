import React, { Component } from 'react';
import  CKEditor from "react-ckeditor-component";

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
          <Card className={classes.card}>
            <CardContent>
              <div dangerouslySetInnerHTML={{__html: this.state.content}} className="chatArticle"/>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
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