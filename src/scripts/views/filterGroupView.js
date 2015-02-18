'use strict';

var React = require('react/addons');
var _ = require('underscore');
var FilterView = require('./filterView');
var FieldNewFilterEditor = require('./newFilterEditorView');

var FieldFilter = React.createClass({
    render() {
        var model = this.props.filterModel;
        var suggestions = model.suggestions;

        var filters = _.map(model.filters, filter =>
            <FilterView
                filterParts={filter.filterParts}
                removeFilter={model.removeFilter.bind(model, filter)}/>);

        filters.push(<FieldNewFilterEditor
            suggestions={suggestions}
            addFilter={model.addFilter.bind(model)}/>);

        return (
            <div className="filterList-field">
                <div className="filterList-field-name">
                    <span>{model.fieldName}</span>
                    <div className="filterList-field-remove" onClick={this.props.removeFilterGroup}/>
                </div>

                <div className="filterList-field-filters">
                    {filters}
                </div>
            </div>
        );
    }
});

module.exports = FieldFilter;
