import React from 'react';
import Select from 'react-select';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Countries = [
    { label: "New Delhi", value: "New Delhi" },
    { label: "Sydney", value: "Sydney" },
    { label: "New York", value: "New York" },
    { label: "London", value: "London" },
    { label: "Kuwait", value: "Kuwait" },
    { label: "Pune", value: "Pune" },
    { label: "Jaipur", value: "Jaipur" }
  ];
  // dropdown component made separately to be used if redux store is used to share the data across components 
  
  export default class SelectDropDownComponent extends React.Component {
    constructor(){
        super();
        this.state={
            city:""
        }
    }
    render() {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <Select options={Countries} defaultValue={{ label: "Select City", value: 0 }} onChange={e => {
              this.setState({
              city:e.value
              });
           }} />
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      );
    }
  
  }