import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './style.css';

import ApplicantTableHeader from '../ApplicantTableHeader';
import ApplicantTableRow from '../ApplicantTableRow';

class ApplicantTable extends Component {

    static propTypes = {
        people: PropTypes.array
    }

    renderRows() {
        return _.map(this.props.applicants, (applicant) => {
            return <ApplicantTableRow applicant={applicant}/>
        })
    }

    render() {
        return(
            <table className="applicant-table__wrapper">
                <ApplicantTableHeader />
                {this.renderRows()}
            </table>
        );
    }
}

export default ApplicantTable;
