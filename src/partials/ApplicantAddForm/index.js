import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './style.css';
import utils from '../../utils'
import constants from '../../constants';

class ApplicantAddForm extends Component {

    static propTypes = {
        person: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            phone: '',
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

        switch(fieldName) {
            case 'name': {
                return utils.validateName(value);
            }
            case 'email': {
                return utils.validateEmail(value);
            }
            case 'phone': {
                return utils.validatePhone(value);
            }
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
            if (value === false) {
                isPassing = false;
            }
        });

        console.log(errors);

        console.log('Passing', isPassing);

        this.setState({errors});
    }

    renderErrors() {
        let views = [];

        _.forOwn(this.state.errors, (value, key) => {
            if (value === true) {
                views.push(
                    <span className="applicant-add-form__error">{constants.ERROR_DESCRIPTIONS[key]}</span>
                );
            }
        });

        return views;
    }

    render() {

        return(
            <div className="applicant-add-form__wrapper">
                <form className="applicant-add-form__inner" onSubmit={this.onSubmit}>
                    <div className="applicant-add-form__left">
                        <input 
                            className={this.state.errors.name ? 'input-error' : ''}
                            value={this.state.name} 
                            onChange={(e) => this.setValue('name', e.target.value)} 
                            type="text" 
                            placeholder="Full Name"
                        />
                        <input 
                            className={this.state.errors.email ? 'input-error' : ''}
                            value={this.state.email} 
                            onChange={(e) => this.setValue('email', e.target.value)} 
                            type="email" 
                            placeholder="E-mail Address"
                        />
                        <input 
                            className={this.state.errors.phone ? 'input-error' : ''}
                            value={this.state.phone} 
                            onChange={(e) => this.setValue('phone', e.target.value)} 
                            type="text" 
                            placeholder="Phone Number"
                        />
                    </div>
                    <div className="applicant-add-form__right">
                        <input 
                            formNoValidate
                            className="applicant-add-form__submit" 
                            type="submit" 
                            placeholder="Phone Number"
                            />
                    </div>
                </form>
                {this.renderErrors()}
            </div>
        );
    }
}

export default ApplicantAddForm;
