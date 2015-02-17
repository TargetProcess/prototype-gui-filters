'use strict';

var React = require('react/addons');

var FieldFilter = React.createClass({
    render() {
        return (
            <div className="filterList-field-filter">
                <div className="filterList-field-filter-value">{this.props.value}</div>
                <div className="filterList-field-filter-remove" onClick={this.props.removeFilter}/>
            </div>
        );
    }
});

module.exports = FieldFilter;
