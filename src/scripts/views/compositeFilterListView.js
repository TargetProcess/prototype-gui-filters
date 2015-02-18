'use strict';

var React = require('react/addons');
var _ = require('underscore');
var FieldGroup = require('./filterGroupView');
var AddNewField = require('./addNewFieldView');

var CompositeFilterList = React.createClass({
    getInitialState() {
        return {
            focusedField: null
        }
    },

    render: function() {
        var model = this.props.model;

        var filterGroups = _.map(model.filterGroups, filter =>
            <FieldGroup
                removeFilterGroup={model.removeField.bind(model, filter)}
                filterModel={filter}/>);

        return (
            <div className="filterList">
                <div className="filterList-fields">
                    {filterGroups}
                    <AddNewField
                        availableFields={model.newFieldSuggestions}
                        addNewField={model.addNewField.bind(model)}/>
                    <input
                        className="filterList-controlRow-control filterList-dismissControl"
                        type="button"
                        value="Cancel"
                        onClick={this.props.onDismiss}/>
                    <input
                        className="filterList-controlRow-control filterList-dismissControl"
                        type="button"
                        value="Apply"
                        onClick={this.props.onDismiss}/>
                </div>
            </div>
        );
    }
});

module.exports = CompositeFilterList;
