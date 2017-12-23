import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';

import './style.css';

class ApplicantTableHeader extends Component {

    static propTypes = {
        sortField: PropTypes.string,
        sortOrder: PropTypes.number,
        onSortChange: PropTypes.func.isRequired,
        items: PropTypes.shape({
            label: PropTypes.string,
            field: PropTypes.string
        })
    }

    renderItems() {
        return _.map(this.props.items, (item) => {

            if (!item) {
                return (
                    <th className="applicant-table-header__item"></th>
                );
            }

            if (this.props.sortField === item.field) {
                return (
                    <th
                        className="applicant-table-header__item active"
                        onClick={() => this.props.onSortChange(item.field)}
                    >
                        <span className="applicant-table-header__item-inner">
                            <span>{item.label}</span>
                            <FontAwesome
                                className="sort-icon"
                                name={this.props.sortOrder === -1 ? 'long-arrow-down' : 'long-arrow-up'}
                            />
                        </span>
                    </th>
                );
            }
            else {
                return (
                    <th
                        className="applicant-table-header__item"
                        onClick={() => this.props.onSortChange(item.field)}
                    >
                        <span className="applicant-table-header__item-inner">
                            <span>{item.label}</span>
                        </span>
                    </th>
                );
            }
        })
    }

    render() {
        return (
            <thead>
                <tr className="applicant-table-header__wrapper">
                    {this.renderItems()}
                </tr>
            </thead>
        );
    }
}

export default ApplicantTableHeader;
