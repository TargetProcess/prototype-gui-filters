var React = require('react/addons');
var SuggestionList = require('./shared/suggestionList');

var AddNewField = React.createClass({
    _onSelectNewField(newField) {
        if (!newField) {
            return;
        }

        this.props.addNewField(newField);
    },

    render() {
        var availableFields = this.props.availableFields;

        if (!availableFields.length) {
            return null;
        }

        return (
            <div className="filterList-field">
                <div className="filterList-field-name">
                    <SuggestionList
                        ref="fieldList"
                        containerClassName="filterList-addNewField-listContainer filterList-suggestionList"
                        placeholder="Add another filter"
                        options={availableFields}
                        onSelect={this._onSelectNewField} />
                </div>
            </div>
        );
    }
});

module.exports = AddNewField;
