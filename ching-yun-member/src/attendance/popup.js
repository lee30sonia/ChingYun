import React from 'react';
import Popup from 'react-popup';

class Prompt extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         value: this.props.defaultValue
      };
      this.onChange = (e) => this._onChange(e);
   }
   componentDidUpdate(prevProps, prevState) {
      if (prevState.value !== this.state.value) {
         this.props.onChange(this.state.value);
      }
   }
   _onChange(e) {
      let value = e.target.value;
      this.setState({value: value});
   }

   render() {
      return <input type="text" className="mm-popup__input" 
               value={this.state.value} onChange={this.onChange} />;
   }
}

Popup.registerPlugin('addDate', function (callback) {
   let year, month, day;
   let yearChange = function (value) {
      year = value;
   };
   let monthChange = function (value) {
      month = value;
   };
   let dayChange = function (value) {
      day = value;
   };

   this.create({
      title: '加入日期',
      content: <div>
               <p>年：</p>
               <Prompt onChange={yearChange} value=""/>
               <p>月：</p>
               <Prompt onChange={monthChange} value=""/>
               <p>日：</p>
               <Prompt onChange={dayChange} value=""/>
            </div>,
      buttons: {
         left: ['cancel'],
         right: [{
            text: 'Save',
            className: 'success',
            action: function () {
               if(year && month && day) {
                  callback(year + "-" + month + "-" + day);
                  Popup.close();
               }
            }
         }]
      }
   });
});
