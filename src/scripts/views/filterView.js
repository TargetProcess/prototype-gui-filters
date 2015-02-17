'use strict';

var React = require('react/addons');
var _ = require('underscore');
var FilterPart = require('./filterPartView');

var FieldFilter = React.createClass({
    render() {
        var parts = _.map(this.props.filterParts, part =>
            <FilterPart partModel={part}/>);

        return (
            <div className="filterList-field-filter">
                <div className="filterList-field-filter-value">{parts}</div>
                <div className="filterList-field-filter-remove" onClick={this.props.removeFilter}/>
            </div>
        );
    }
});

module.exports = FieldFilter;
