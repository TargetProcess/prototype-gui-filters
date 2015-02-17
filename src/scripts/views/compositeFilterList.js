'use strict';

var React = require('react/addons');
var _ = require('underscore');
var FieldFilter = require('./fieldFilter');
var AddNewField = require('./addNewField');

var CompositeFilterList = React.createClass({
    getInitialState() {
        return {
            focusedField: null
        }
    },

    render: function() {
        var model = this.props.model;

        var fieldFilters = _.map(model.filters, filter =>
            <FieldFilter filterModel={filter}/>);

        return (
            <div className="filterList">
                <div className="filterList-fields">
                    {fieldFilters}
                    <AddNewField
                        availableFields={model.newFieldSuggestions}
                        addNewField={model.addNewField.bind(model)}/>
                </div>
            </div>
        );
    }
});

module.exports = CompositeFilterList;
