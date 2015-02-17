'use strict';

var React = require('react/addons');
var _ = require('underscore');
var FilterPart = require('./fieldFilterPart');
var SuggestionList = require('./shared/suggestionList');

var FieldNewPartEditor = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState() {
        return {
            text: ''
        }
    },

    _applyPart(partValue) {
        this.props.addPart(partValue);
        this.setState({text: ''});
    },

    _onKeyDown(evt) {
        if (evt.which === 13) {
            this._applyPart(this.state.text);
        }
    },

    _onSelectSuggestion(value) {
        this._applyPart(value);
    },

    render() {
        var input = this.props.suggestions.length ?
            <SuggestionList
                containerClassName="filterList-suggestionList"
                options={this.props.suggestions}
                onSelect={this._onSelectSuggestion}/> :
            <input
                type="text"
                valueLink={this.linkState('text')}
                onKeyDown={this._onKeyDown}/>;

        return (
            <div className="filterList-field-newPart">
                {input}
            </div>
        );
    }
});

var FieldFilter = React.createClass({
    render() {
        var model = this.props.filterModel;
        var suggestions = model.suggestions;

        var parts = _.map(model.filterParts, part =>
            <FilterPart
                value={part}
                removePart={model.removePart.bind(model, part)}/>);

        parts.push(<FieldNewPartEditor
            suggestions={suggestions}
            addPart={model.addPart.bind(model)}/>);

        return (
            <div className="filterList-field">
                <div className="filterList-field-name">{model.fieldName}</div>
                <div className="filterList-field-parts">
                    {parts}
                </div>
            </div>
        );
    }
});

module.exports = FieldFilter;
