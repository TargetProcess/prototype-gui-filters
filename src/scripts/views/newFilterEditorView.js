var React = require('react/addons');
var SuggestionList = require('./shared/suggestionList');

var FieldNewFilterEditor = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState() {
        return {
            text: ''
        }
    },

    _applyFilter(filterValue) {
        this.props.addFilter(filterValue);
        this.setState({text: ''});
    },

    _onKeyDown(evt) {
        if (evt.which === 13) {
            this._applyFilter(this.state.text);
        }
    },

    _onSelectSuggestion(value) {
        this._applyFilter(value);
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

module.exports = FieldNewFilterEditor;
