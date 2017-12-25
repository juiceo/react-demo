import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './style.css';

import ApplicantTableHeader from '../ApplicantTableHeader';
import ApplicantTableRow from '../ApplicantTableRow';
import ApplicantAddForm from '../ApplicantAddForm';

import AnimatedTableBody from '../AnimatedTableBody';
import GenericTable from '../GenericTable';

const DEFAULT_SORT_FIELD = 'created';

class ApplicantTable extends Component {

    static propTypes = {
        editing: PropTypes.string,
        onDelete: PropTypes.func.isRequired,
        onEditCancel: PropTypes.func.isRequired,
        onEditComplete: PropTypes.func.isRequired,
        onEditStart: PropTypes.func.isRequired,
        people: PropTypes.array,
    }

    constructor(props) {
        super(props);

        this.state = {
            sortField: DEFAULT_SORT_FIELD,
            sortOrder: -1
        }

        this.onSortChange = this.onSortChange.bind(this);
    }

    onEditComplete(applicant, edits) {
        this.props.onEditComplete({
            ...applicant,
            ...edits
        });
    }

    onSortChange(field) {
        if (field === this.state.sortField) {
            if (this.state.sortOrder === 1) {
                this.setState({
                    sortOrder: -1
                });
            }
            else {
                this.setState({
                    sortField: DEFAULT_SORT_FIELD,
                    sortOrder: -1
                });
            }
        }
        else {
            this.setState({
                sortField: field,
                sortOrder: 1
            });
        }
    }

    sort(applicants) {

        const { sortField, sortOrder } = this.state;
        const sorted = _.sortBy(applicants, (a) => {
            //ensure that strings are sorted correctly;
            return a[sortField].toString().toLowerCase();
        });

        if (sortOrder === -1) {
            return _.reverse(sorted);
        }
        return sorted;
    }

    renderRows(applicants) {
        return _.map(applicants, (applicant) => {

            if (applicant.id === this.props.editing) {
                return (
                    <ApplicantAddForm
                        key={applicant.id}
                        onCancel={this.props.onEditCancel}
                        onSubmit={(edits) => this.onEditComplete(applicant, edits)}
                        mode={'edit'}
                        applicant={applicant}
                    />
                );
            }

            return (
                <ApplicantTableRow
                    key={applicant.id}
                    applicant={applicant}
                    onEditClick={() => this.props.onEditStart(applicant)}
                    onDeleteClick={() => this.props.onDelete(applicant)}
                />
            );
        });
    }

    render() {

        const applicants = this.sort(this.props.applicants);

        return (
            <GenericTable
                colSizes={[20, 30, 22, 28]}
                className="applicant-table__wrapper"
            >
                <ApplicantTableHeader
                    sortField={this.state.sortField}
                    sortOrder={this.state.sortOrder}
                    onSortChange={this.onSortChange}
                    items={[
                        {
                            label: 'Name',
                            field: 'name'
                        },
                        {
                            label: 'E-mail Address',
                            field: 'email',
                        },
                        {
                            label: 'Phone Number',
                            field: 'phone'
                        },
                        null
                    ]}
                />
                <AnimatedTableBody>
                    {this.renderRows(applicants)}
                </AnimatedTableBody>
            </GenericTable>
        );
    }
}

export default ApplicantTable;
