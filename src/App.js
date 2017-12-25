import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import logo from './logo.png';

import utils from './utils';

import ApplicantAddForm from './partials/ApplicantAddForm';
import ApplicantTable from './partials/ApplicantTable'

import GenericTable from './partials/GenericTable';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			applicants: [],
			editing: '',
		}

		this.onAdd = this.onAdd.bind(this);
		this.onEditStart = this.onEditStart.bind(this);
		this.onEditCancel = this.onEditCancel.bind(this);
		this.onEditComplete = this.onEditComplete.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	componentDidMount() {
		this.setState({
			applicants: utils.generateRandomApplicants()
		});
	}

	onAdd(applicant) {

		applicant = utils.generateApplicant(applicant.name, applicant.email, applicant.phone);

		this.setState({
			applicants: _.concat(this.state.applicants, [applicant])
		});
	}

	onEditStart(applicant) {
		this.setState({
			editing: applicant.id
		});
	}

	onEditCancel() {
		this.setState({
			editing: ''
		});
	}

	onEditComplete(applicant) {
		let applicants = _.map(this.state.applicants, (a) => {
			if (a.id === applicant.id) {
				return applicant;
			}
			return a;
		});

		this.setState({
			applicants,
			editing: ''
		});
	}

	onDelete(applicant) {

		this.setState({
			applicants: _.filter(this.state.applicants, (a) => a.id !== applicant.id)
		});
	}

	render() {
		return (
			<div className="app">
				<div className="page-header">
					<div className="page-header__inner">
						<img alt="logo" title="logo" src={logo} />
						<span>Nord Software</span>
					</div>
				</div>
				<div className="main-wrapper">
					<h1 className="main-title">List of participants</h1>
					<GenericTable colSizes={[20, 30, 22, 28]}>
						<tbody>
							<ApplicantAddForm onSubmit={this.onAdd} />
						</tbody>
					</GenericTable>
					<ApplicantTable
						applicants={this.state.applicants}
						onEditStart={this.onEditStart}
						onEditCancel={this.onEditCancel}
						onEditComplete={this.onEditComplete}
						onDelete={this.onDelete}
						editing={this.state.editing}
					/>
				</div>
			</div>
		);
	}
}

export default App;
