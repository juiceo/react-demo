import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './style.css';

class ApplicantTableRow extends Component {

    static propTypes = {
        applicant: PropTypes.object,
        onEdit: PropTypes.func,
        onDelete: PropTypes.func
    }

    render() {

        const { applicant } = this.props;

        return (
            <tr className="applicant-table-row__wrapper">
                <td className="applicant-table-row__item">{applicant.name}</td>
                <td className="applicant-table-row__item">{applicant.email}</td>
                <td className="applicant-table-row__item">{applicant.phone}</td>
                <td className="applicant-table-row__item align-right">
                    <div className="applicant-table-row__button-wrapper" onClick={this.props.onEditClick}>
                        <FontAwesome className="applicant-table-row__icon" name="pencil" />
                    </div>
                    <div className="applicant-table-row__button-wrapper" onClick={this.props.onDeleteClick}>
                        <FontAwesome className="applicant-table-row__icon" name="trash" />
                    </div>
                </td>
            </tr>
        );
    }
}

export default ApplicantTableRow;
