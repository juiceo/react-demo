import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import utils from './utils';

import ApplicantAddForm from './partials/ApplicantAddForm';
import ApplicantTable from './partials/ApplicantTable'

class App extends Component {

  constructor(props) {
      super(props);

      this.state = {
          applicants: []
      }
  }

  componentDidMount() {
    this.setState({
        applicants: utils.generateRandomApplicants()
    });
  }

  render() {
    return (
      <div className="app">
          <div className="main-wrapper">
             <ApplicantAddForm />
             <ApplicantTable applicants={this.state.applicants}/>
          </div>
      </div>
    );
  }
}

export default App;
