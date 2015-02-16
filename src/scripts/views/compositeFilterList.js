'use strict';

var React = require('react/addons');
var _ = require('underscore');
var FieldFilter = require('./fieldFilter');

var CompositeFilterList = React.createClass({
    getInitialState() {
        return {
            focusedField: null
        }
    },

    render: function() {
        var fieldFilters = _.map(this.props.model.filters, filter =>
            <FieldFilter filterModel={filter}/>);

        return (
            <div className="filterList">
                <div className="filterList-fields">
                    {fieldFilters}
                </div>
            </div>
        );
    }
});

module.exports = CompositeFilterList;
