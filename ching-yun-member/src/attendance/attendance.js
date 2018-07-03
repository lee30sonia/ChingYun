import React, { Component } from 'react';
// import logo from './logo.svg';
import './attendance.css';
import './popup';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import Popup from 'react-popup';

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles'
import CircularProgress from '@material-ui/core/CircularProgress';

import gql from "graphql-tag";
import { Query } from "react-apollo";

function DateColumn(num, date) {
   return {
      dataField: "attend["+num+"]",
      text: date,
      sort: true,
      editor: {
         type: Type.CHECKBOX,
         value: "O:"
      },
      style: (cell, row, rowIndex, colIndex) => {
         if(cell === "") return { backgroundColor: "#FFE4E1" };
      }
   };
}

function sortPart(a, b, order) {
   let arr = ["Sop", "Alto", "Tenor", "Bass"];
   if(order === "asc")  return arr.indexOf(a) < arr.indexOf(b);
   else  return arr.indexOf(a) > arr.indexOf(b);
}

var columns = [{
   dataField: "id",
   text: "#",
   sort: true
},{
   dataField: "name",
   text: "姓名"
},{
   dataField: "part",
   text: "聲部",
   sort: true,
   sortFunc: sortPart
}  ,
   DateColumn(0, "6/9"),   // if you want to add dates here, remember to initial the state.dates
   DateColumn(1, "6/16"),  
   DateColumn(2, "6/23"),
{
   dataField: "absent",
   text: "缺席",
   sort: true,
   editable: false
},{
   dataField: "rate",
   text: "出席率",
   sort: true,
   editable: false
}];

function memberAdd(member) {
   member.attend.push("");
   memberUpdate(member);
}

function memberUpdate(it) {
   it.absent = it.attend.filter( a => a === "" ).length;
   it.rate = Math.round(100*(1 - (it.absent / it.attend.length))) + "%";
}

function Member(number, name, part, dates) {
   this.id = number;
   this.name = name;
   this.part = part;
   this.attend = [];
   for(let i=0; i<dates; i++)  this.attend.push("");
   this.absent = this.attend.filter( a => a === "" ).length;
   this.rate = Math.round(100*(1 - (this.absent / this.attend.length))) + "%";
}
   
var query = gql`{
   allPeople {
      name
      part
   }
}`;

const Attendance = withStyles(styles)(
  class extends Component {

   constructor(props) {
      super(props);
      this.state = {
         // members: [],
         columns: columns,
         dates: 3
      };
      // this.addPerson = this.addPerson.bind(this);
      // this.enterName = this.enterName.bind(this);
      this.enterDate = this.enterDate.bind(this);
   }
   // addPerson(name, part) {
   //    this.setState( prev => ({
   //       members: [...prev.members, new Member(prev.members.length+1, name, part, this.state.dates)]
   //    }));
   // }
   addDate(date) {
      /*
      this.setState(prev => {
         let col = prev.columns;
         let mem = prev.members;
         col.splice(-2, 0, DateColumn(prev.dates, date));
         for(let m of mem) memberAdd(m);
         return {
            columns: col,
            members: mem,
            dates: prev.dates + 1
         };
      });
      */
      alert("This feature is not yet done.");
   }

   // componentDidMount() {
   // }
   enterDate() {
      var it = this;
      Popup.plugins().addDate(function(date){ it.addDate(date); });
   }

   render() {
      const { classes } = this.props;

      return(
         <Query query={ query } >
            { ({ loading, err, data}) => {
               if(loading)
                  return <CircularProgress className={classes.progress} />;
               if(err)
                  return `Error! ${err.message}`;

               return (
                  <div className="Attendance">
                     <h3>點名表</h3>
                     <Button bsStyle="info" onClick={ this.enterDate } >加入日期</Button>
                     <BootstrapTable keyField="name" columns={ this.state.columns } 
                        data={ data.allPeople.map( (person, index) => (
                           new Member(index+1, person.name, person.part, this.state.dates) ))}
                        cellEdit={ cellEditFactory({ mode: "click", blurToSave: true, 
                           afterSaveCell: (o, n, row, c) => { memberUpdate(row); }
                           }) } />
                  </div>
               );
            }}
         </Query>
      );
  }
});

export default Attendance;
