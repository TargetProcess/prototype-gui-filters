'use strict';

var React = require('react/addons');
var _ = require('underscore');
var FieldGroup = require('./filterGroupView');
var AddNewField = require('./addNewFieldView');

var CompositeFilterList = React.createClass({
    getInitialState() {
        return {
            focusedField: null,
            newFilterGroupKey: null,
            addedCount: 0
        }
    },

    _onAddNewField(fieldName) {
        var newGroup = this.props.model.addNewField(fieldName);
        this.setState({
            // addedCount is a trick to always render "new field" dropdown from scratch when value is selected due to its buggy behavior
            addedCount: this.state.addedCount + 1,
            newFilterGroupKey: newGroup.filterGroupKey
        });
    },

    render: function() {
        var model = this.props.model;

        var filterGroups = _.map(model.filterGroups, filter =>
            <FieldGroup
                isNewFilterGroup={filter.filterGroupKey === this.state.newFilterGroupKey}
                removeFilterGroup={model.removeField.bind(model, filter)}
                filterModel={filter}/>);

        var suggestions = model.newFieldSuggestions;
        var addNew = suggestions.length ?
            <AddNewField
                key={'addnew_' + this.state.addedCount}
                availableFields={model.newFieldSuggestions}
                addNewField={this._onAddNewField}/> :
            null;

        return (
            <div className="filterList">
                <div className="filterList-fields">
                    {filterGroups}
                    {addNew}
                    <input
                        className="filterList-controlRow-control filterList-dismissControl"
                        type="button"
                        value="Apply"
                        onClick={this.props.onDismiss}/>
                    <input
                        className="filterList-controlRow-control filterList-dismissControl"
                        type="button"
                        value="Cancel"
                        onClick={this.props.onDismiss}/>
                </div>
            </div>
        );
    }
});

module.exports = CompositeFilterList;
