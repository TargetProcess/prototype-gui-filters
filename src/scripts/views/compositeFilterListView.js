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
            <FieldGroup filterModel={filter}/>);

        return (
            <div className="filterList">
                <div className="filterList-fields">
                    {filterGroups}
                    <div className="filterList-controlRow-control">
                        <AddNewField
                            availableFields={model.newFieldSuggestions}
                            addNewField={model.addNewField.bind(model)}/>
                    </div>
                    <input
                        className="filterList-controlRow-control"
                        type="button"
                        value="Dismiss"
                        onClick={this.props.onDismiss}/>
                </div>
            </div>
        );
    }
});

module.exports = CompositeFilterList;
