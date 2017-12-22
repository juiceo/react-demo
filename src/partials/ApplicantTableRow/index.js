import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class ApplicantTableRow extends Component {

    static propTypes = {
        applicant: PropTypes.object
    }

    render() {

        const { applicant } = this.props;

        return(
            <tr className="applicant-table-row__wrapper">
                <td colspan="1" className="applicant-table-row__item">{applicant.name}</td>
                <td colspan="1" className="applicant-table-row__item">{applicant.email}</td>
                <td colspan="1" className="applicant-table-row__item">{applicant.phone}</td>
            </tr>
        );
    }
}

export default ApplicantTableRow;
