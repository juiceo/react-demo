import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './style.css';

class GenericTable extends PureComponent {

    static propTypes = {
        className: PropTypes.string,
        colSizes: PropTypes.arrayOf(PropTypes.number),
    };

    static defaultProps = {
        className: 'generic-table__wrapper'
    }

    renderColGroup() {
        const cols = _.map(this.props.colSizes, (colSize, index) => {
            return (
                <col
                    key={'col_' + index}
                    style={{ width: colSize + '%' }}
                />
            );
        });

        return <colgroup>{cols}</colgroup>;
    }

    render() {

        return (
            <table className={this.props.className}>
                {this.renderColGroup()}
                {this.props.children}
            </table>
        );
    }
}

export default GenericTable;
