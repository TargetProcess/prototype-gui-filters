var React = require('react/addons');
var SuggestionList = require('./shared/suggestionList');

var AddNewField = React.createClass({
    getInitialState() {
        return {
            isSelectingField: false
        };
    },

    _onAddNewClicked() {
        this.setState({isSelectingField: true});
    },

    _onSelectNewField(newField) {
        if (!newField) {
            return;
        }

        this.props.addNewField(newField);
        this.setState({isSelectingField: false});
    },

    render() {
        var availableFields = this.props.availableFields;

        if (this.state.isSelectingField) {
            return (
                <div className="filterList-field">
                    <div className="filterList-field-name">
                        <SuggestionList
                            autoFocus={true}
                            containerClassName="filterList-addNewField-listContainer filterList-suggestionList"
                            options={availableFields}
                            onSelect={this._onSelectNewField} />
                    </div>
                </div>

            );
        }

        if (!availableFields.length) {
            return null;
        }

        return (
            <input
                type="button"
                value="+ Add new"
                onClick={this._onAddNewClicked}/>
        );
    }
});

module.exports = AddNewField;
