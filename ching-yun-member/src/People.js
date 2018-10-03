import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles'

import gql from "graphql-tag";
import { Query } from "react-apollo";

var query = gql`{
   allPeople {
      name
      part
      job
      email
      phone
   }
}`;

const People = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={

      };   
    }
  
    render() {
      const { classes } = this.props;

      return (
         <Query query={ query } >
            { ({ loading, err, data}) => {
               if(loading)
                  return <CircularProgress className={classes.progress} />;
               if(err)
                  return `Error! ${err.message}`;
               if(!data)
                  return "Error: can not load data.";

               return (
                 <Paper className={classes.tableroot}>
                    <Table className={classes.table}>

                       <TableHead>
                          <TableRow>
                             <TableCell></TableCell>
                             <TableCell >姓名</TableCell>
                             <TableCell >聲部</TableCell>
                             <TableCell >職位</TableCell>
                             <TableCell >email</TableCell>
                             <TableCell >電話</TableCell>
                           </TableRow>
                     </TableHead>

                     <TableBody>
                        { data.allPeople.map( (person, index) => {
                           return (
                              <TableRow key={index}>
                                 <TableCell component="th" scope="row">{index+1}</TableCell>
                                 <TableCell>{person.name}</TableCell>
                                 <TableCell>{person.part}</TableCell>
                                 <TableCell>{person.job}</TableCell>
                                 <TableCell>{person.email}</TableCell>
                                 <TableCell>{person.phone}</TableCell>
                              </TableRow>
                           );
                        })}
                     </TableBody>
                  </Table>
               </Paper>
               );
            }}
         </Query>
      );
    }
  }
);



export default People;
