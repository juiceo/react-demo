import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';

import './style.css';
import utils from '../../utils'
import constants from '../../constants';

class ApplicantAddForm extends Component {

    static propTypes = {
        onSubmit: PropTypes.func,
        onCancel: PropTypes.func,
        mode: PropTypes.oneOf(['add', 'edit']),
        applicant: PropTypes.object
    };

    static defaultProps = {
        mode: 'add',
        applicant: {
            name: '',
            email: '',
            phone: ''
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.applicant.name,
            email: this.props.applicant.email,
            phone: this.props.applicant.phone,
            errors: {
                name: false,
                email: false,
                phone: false
            }

        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    setValue(fieldName, value) {


        // Only clear existing errors on input change, don't set them until submit
        let errors = this.state.errors;
        if (this.state.errors[fieldName]) {
            errors = {
                ...this.state.errors,
                [fieldName]: !this.validate(fieldName, value)
            }
        }

        this.setState({
            [fieldName]: value,
            errors
        });
    }

    validate(fieldName, value) {

        switch (fieldName) {
            case 'name': {
                return utils.validateName(value);
            }
            case 'email': {
                return utils.validateEmail(value);
            }
            case 'phone': {
                return utils.validatePhone(value);
            }
            default: return true;
        }
    }

    onSubmit(e) {
        e.preventDefault();

        let errors = {};

        _.each(['name', 'email', 'phone'], (field) => {
            errors[field] = !this.validate(field, this.state[field]);
        });

        let isPassing = true;

        _.forOwn(errors, (value, key) => {
            if (value === true) {
                isPassing = false;
            }
        });

        if (!isPassing) {
            this.setState({ errors });
        }
        else {
            this.props.onSubmit({
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone
            });

            this.setState({
                name: '',
                email: '',
                phone: ''
            });
        }
    }

    renderCancel() {
        if (this.props.mode === 'edit') {
            return (
                <form onSubmit={this.props.onCancel}>
                    <input
                        formNoValidate
                        type="submit"
                        className="button-cancel"
                        value={'Cancel'}
                    />
                </form>
            );
        }
    }

    renderSubmit() {

        const { name, email, phone } = this.state;

        //Lazy check fields here for visual ques, actual validation elsewhere
        let isActive = name !== '' && email !== '' && phone !== '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    formNoValidate
                    type="submit"
                    className={isActive ? 'button-submit active' : 'button-submit'}
                    value={this.props.mode === 'add' ? 'Add New' : 'Save'}
                />
            </form>
        );
    }

    renderError(field) {

        if (this.state.errors[field]) {
            return (
                <span className="applicant-add-form__error-wrapper">
                    <FontAwesome name="exclamation-circle" />
                    <span>
                        {constants.ERROR_DESCRIPTIONS[field]}
                    </span>
                </span>
            );
        }

        return null;
    }

    render() {

        return (
            <tr className="applicant-add-form__inner">
                <td>
                    <input
                        className={this.state.errors.name ? 'input-error' : ''}
                        value={this.state.name}
                        onChange={(e) => this.setValue('name', e.target.value)}
                        type="text"
                        placeholder="Full Name"
                    />
                    {this.renderError('name')}
                </td>
                <td>
                    <input
                        className={this.state.errors.email ? 'input-error' : ''}
                        value={this.state.email}
                        onChange={(e) => this.setValue('email', e.target.value)}
                        type="email"
                        placeholder="E-mail Address"
                    />
                    {this.renderError('email')}
                </td>
                <td>
                    <input
                        className={this.state.errors.phone ? 'input-error' : ''}
                        value={this.state.phone}
                        onChange={(e) => this.setValue('phone', e.target.value)}
                        type="text"
                        placeholder="Phone Number"
                    />
                    {this.renderError('phone')}
                </td>
                <td>
                    <div className="applicant-add-form__buttons-wrapper">
                        {this.renderCancel()}
                        {this.renderSubmit()}
                    </div>
                </td>
            </tr>
        );
    }
}

export default ApplicantAddForm;
