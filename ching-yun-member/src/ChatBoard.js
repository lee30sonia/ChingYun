import React, { Component } from 'react';
import  CKEditor from "react-ckeditor-component";

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

//import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';

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
          <NewPost />

          <Card className={classes.card}>
            <Typography gutterBottom variant="headline" component="h2">
              title
            </Typography>
            <Typography color="textSecondary">
              July 4, 2018
            </Typography>
            <Typography color="textSecondary">
              author
            </Typography>
            <CardContent>
              <div dangerouslySetInnerHTML={{__html: this.state.content}} className="chatArticle"/>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      );
    }
  }
);

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const NewPost = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
        open: false,
        content: ''
      };
      this.onChange = this.onChange.bind(this);
      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }
    
    onChange(evt){
      //console.log("onChange fired with event info: ", evt);
      var newContent = evt.editor.getData();
      this.setState({
        content: newContent
      })
    }

    handleClickOpen(){
      this.setState({ open: true });
    }

    handleClose(){
      this.setState({ open: false });
    }
    
    render() {
      const { classes } = this.props;

      return (
        <div>
          <Button onClick={this.handleClickOpen}>發表新文章</Button>

          <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  Sound
                </Typography>
                <Button color="inherit" onClick={this.handleClose}>
                  save
                </Button>
              </Toolbar>
            </AppBar>

            <CKEditor 
              activeClass="p10" 
              content={this.state.content} 
              events={{
                "change": this.onChange
              }}
            />
          </Dialog>
        </div>
      );
    }
  }
);


export default ChatBoard;