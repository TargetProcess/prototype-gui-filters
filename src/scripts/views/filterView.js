'use strict';

var React = require('react/addons');
var _ = require('underscore');

var FilterPart = React.createClass({
    render() {
        var className = React.addons.classSet({
            'filterList-field-filter-part--editable': this.props.isEditable
        });

        return (<span className={className}>{this.props.value}</span>);
    }
});

var FieldFilter = React.createClass({
    render() {
        var parts = _.map(this.props.filterParts, part => <FilterPart {...part} />);

        return (
            <div className="filterList-field-filter">
                <div className="filterList-field-filter-value">{parts}</div>
                <div className="filterList-field-filter-remove" onClick={this.props.removeFilter}/>
            </div>
        );
    }
});

module.exports = FieldFilter;
