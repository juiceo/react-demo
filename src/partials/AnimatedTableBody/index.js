import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './style.css';

class AnimatedTableBody extends Component {

    static propTypes = {
        className: PropTypes.string
    };

    static defaultProps = {
        className: 'animated-table-body'
    }

    constructor(props) {
        super(props);

        this.state = {
            mounted: false
        };
    }

    componentDidMount() {
        this.setState({
            mounted: true
        });
    }

    render() {

        return (
            <ReactCSSTransitionGroup
                className={this.props.className}
                transitionName="slide"
                transitionEnterTimeout={580}
                transitionLeaveTimeout={280}
                component="tbody"
            >
                {this.state.mounted ? this.props.children : null}
            </ReactCSSTransitionGroup>
        );
    }
}

export default AnimatedTableBody;
