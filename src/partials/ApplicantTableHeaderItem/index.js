import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './style.css';

class ApplicantTableHeaderItem extends PureComponent {

    static propTypes = {
        activeOrder: PropTypes.number,
        activeSort: PropTypes.string,
        item: PropTypes.shape({
            field: PropTypes.string,
            label: PropTypes.string,
        }),
        onClick: PropTypes.func
    }

    render() {

        const { item } = this.props;

        if (!item) {
            return (
                <th className="applicant-table-header-item placeholder" />
            );
        }

        if (this.props.activeSort === item.field) {
            return (
                <th
                    key={item.field}
                    className="applicant-table-header-item active"
                    onClick={() => this.props.onClick(item)}
                >
                    <span>
                        <span>{item.label}</span>
                        <FontAwesome
                            className="sort-icon"
                            name={this.props.activeOrder === -1 ? 'long-arrow-down' : 'long-arrow-up'}
                        />
                    </span>
                </th>
            );
        }
        else {
            return (
                <th
                    key={item.field}
                    className="applicant-table-header-item"
                    onClick={() => this.props.onClick(item)}
                >
                    <span>{item.label}</span>
                </th>
            );
        }
    }
}

export default ApplicantTableHeaderItem;
