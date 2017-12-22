import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class ApplicantTableHeader extends Component {

    static propTypes = {
        person: PropTypes.object
    }

    render() {
        return(
            <tr className="applicant-table-header__wrapper">
                <th colspan="1" className="applicant-table-header__item">Name</th>
                <th colspan="1" className="applicant-table-header__item">E-mail Address</th>
                <th colspan="1" className="applicant-table-header__item">Phone Number</th>
            </tr>
        );
    }
}

export default ApplicantTableHeader;
