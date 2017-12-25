import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './style.css';

import ApplicantTableHeaderItem from '../ApplicantTableHeaderItem';

class ApplicantTableHeader extends PureComponent {

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            field: PropTypes.string
        })),
        onSortChange: PropTypes.func.isRequired,
        sortField: PropTypes.string,
        sortOrder: PropTypes.number,
    }

    renderItems() {
        return _.map(this.props.items, (item, index) => {

            return (
                <ApplicantTableHeaderItem
                    key={'col_' + index}
                    activeSort={this.props.sortField}
                    activeOrder={this.props.sortOrder}
                    item={item}
                    onClick={(item) => this.props.onSortChange(item.field)} />
            );
        });
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
