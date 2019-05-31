import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { FirstPage, LastPage, ChevronRight, ChevronLeft, ArrowUpward, Search, Clear, FilterList } from "@material-ui/icons";
import styles from './styles'
import MaterialTable from 'material-table';

import gql from "graphql-tag";
import { Query } from "react-apollo";

const tableIcons = {
  //Add: AddBox,
  //Check: Check,
  //Clear: Clear,
  //Delete: DeleteOutline,
  //DetailPanel: ChevronRight,
  //Edit: Edit,
  //Export: SaveAlt,
  //Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search: Search,
  SortArrow: ArrowUpward,
  DetailPanel: ChevronRight,
  Filter: FilterList
  //ThirdStateCheck: Remove,
  //ViewColumn: ViewColumn
};


var query = gql`
   query allPeople($t: String!) {
      allPeople(token: $t){
         name
         nickname
         part
         email
         phone
         cellphone
         address
      }
   }`;

const People = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={

      };   
    }

    render(){
      const { classes } = this.props;

      if(!this.props.me)
        return <CircularProgress className={classes.progress} />;

      return (
        <Query query={ query } variables={{"t": this.props.me.token}}>
          { ({ loading, err, data}) => {
            if(loading)
               return <CircularProgress className={classes.progress} />;
            if(err)
               return `Error! ${err.message}`;
            if(!data.allPeople)
               return <div>請重新整理頁面</div>;

            return (
              <div className={classes.content}>
                <Grid container>
                  <Grid item xs={12}><Paper className={classes.tableroot}>
                    <MaterialTable
                      title="現任團員"
                      icons={tableIcons}
                      columns={[
                        { title: '姓名', field: 'name' },
                        { title: '暱稱', field: 'nickname' },
                        { title: '聲部', field: 'part' },
                        { title: '手機', field: 'cellphone' },
                        { title: '入團年份', field: 'inYear', type: 'numeric' },
                      ]}
                      data={ data.allPeople.map( (person, index) => {
                        return ({
                          name: person.name,
                          nickname: person.nickname,
                          part: person.part,
                          cellphone: person.cellphone,
                          inYear: person.inYear,
                          email: person.email,
                          phone: person.phone,
                          address: person.address
                        });
                      })}
                      options={{filtering: true, filterCellStyle: {padding: '0'}}}
                      detailPanel={rowData => {
                        console.log(rowData)
                        return (
                          <Paper className={classes.details}>
                            email: {rowData.email}<br/>
                            家電： {rowData.phone}<br/>
                            地址： {rowData.address}<br/>
                          </Paper>
                        )
                      }}

                    />
                  </Paper></Grid>
                  <Grid item xs={12} className={classes.hint}> 
                    小提示：<br/>
                    1. 搜尋欄可以搜尋任意欄位<br/>
                    2. 點按欄位名稱可以該欄值排序<br/>
                    3. 於欄位名稱下方輸入關鍵字可進行篩選（例如於聲部欄指定 Sop）<br/>
                  </Grid>
                </Grid>
              </div>
            );
          }}
         </Query>
      );
    }
  }
);
// components={{filterRow: }}
/*
const People = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state={

      };   
    }
  
    render() {
      const { classes } = this.props;

      if(!this.props.me)
        return <CircularProgress className={classes.progress} />;

      return (
         <Query query={ query } variables={{"t": this.props.me.token}}>
            { ({ loading, err, data}) => {
               if(loading)
                  return <CircularProgress className={classes.progress} />;
               if(err)
                  return `Error! ${err.message}`;
               if(!data.allPeople)
                  return <div>請重新整理頁面</div>

               return (
                <div className={classes.content}>
                 <Paper className={classes.tableroot}>
                    <Table className={classes.table}>

                       <TableHead>
                          <TableRow>
                             <TableCell>姓名</TableCell>
                             <TableCell>暱稱</TableCell>
                             <TableCell>聲部</TableCell>
                             <TableCell>手機</TableCell>
                             <TableCell>入團年份</TableCell>
                           </TableRow>
                     </TableHead>

                     <TableBody>
                        { data.allPeople.map( (person, index) => {
                           return (
                              <TableRow key={index}>
                                 <TableCell>{person.name}</TableCell>
                                 <TableCell>{person.nickname}</TableCell>
                                 <TableCell>{person.part}</TableCell>
                                 <TableCell>{person.cellphone}</TableCell>
                                 <TableCell>{person.inYear}</TableCell>
                              </TableRow>
                           );
                        })}
                     </TableBody>
                  </Table>
               </Paper>
               </div>
               );
            }}
         </Query>
      );
    }
  }
);
*/

export default People;
