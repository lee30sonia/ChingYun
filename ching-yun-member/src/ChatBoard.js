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
//import DialogTitle from '@material-ui/core/DialogTitle';
//import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

var query = gql`
   query {
      allPost {
         title
         author{
            name
         }
         date
         content
      }
   }`;

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
         <Query query={query}>
            { ({ loading, err, data, refetch}) => {
               if(loading)
                  return <CircularProgress className={classes.progress} />;
               if(err)
                  return `Error! ${err.message}`;

               return (
                 <div>
                   <NewPost submit={ ()=>{this.render()} } me={this.props.me} />
                   { data.allPost.map( post => (
                      <Card className={classes.article}>
                        <Typography gutterBottom variant="headline" component="h2">
                           {post.title}
                        </Typography>
                        <Typography color="textSecondary">
                           { new Date(post.date).toDateString() }
                        </Typography>
                        <Typography color="textSecondary">
                           { post.author.name }
                        </Typography>
                        <CardContent>
                           <div dangerouslySetInnerHTML={{__html: post.content}} 
                              className="chatArticle"/>
                        </CardContent>
                        <CardActions>
                          
                        </CardActions>
                     </Card>
                   )) }
                 </div>
               );
            }}
         </Query>
      );
    }
  }
);

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

var mutation = gql`
   mutation addPost($t: String, $a: String, $d: String, $c: String) {
      addPost(title: $t, author: $a, date: $d, content: $c)
}`;

const NewPost = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={
        open: false,
        title: '',
        content: ''
      };
      this.onChange = this.onChange.bind(this);
      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.submit = this.submit.bind(this);
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

    async submit(addPost)
    {
       if(!this.state.content)
          return;

       addPost({
         variables: {
            "t": this.state.title,
            "a": this.props.me.username, 
               //應該存username，顯示時顯示name(nickname)，以處理更換暱稱的狀況
            "d": new Date(),
            "c": this.state.content
         },
         refetchQueries: [{ query: query }]
       })
          .catch( err => {
             console.log(err);
          });

      this.props.submit(this.state.content);
      this.handleClose();
    }
    
    render() {
      const { classes } = this.props;

      return (
        <div>
          <Tooltip title="發表新文章">
            <Button variant="fab" color="primary" className={classes.addBtn}
              onClick={this.handleClickOpen}
            >
              <AddIcon />
            </Button>
          </Tooltip>

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
                  發表新文章
                </Typography>
                <Mutation mutation={mutation}>
                   { addPost => (
                      <Button color="inherit" onClick={() => {this.submit(addPost)}} >
                        發布
                      </Button> )}
                </Mutation>
              </Toolbar>
            </AppBar>
           
            <DialogContent>
              <TextField
                autoFocus
                margin="normal"
                label="文章標題"
                fullWidth
                onChange={(evt) => this.setState({title: evt.target.value})}
              />
              <CKEditor 
                activeClass="p10 articleEditor" 
                content={this.state.content} 
                events={{
                  "change": this.onChange
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  }
);


export default ChatBoard;
