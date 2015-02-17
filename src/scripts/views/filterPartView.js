var React = require('react/addons');
var _ = require('underscore');

var FilterPart = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState() {
        return {
            isEditing: false,
            editValue: ''
        }
    },

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.isEditing && this.state.isEditing) {
            // auto-focus inline editor when user clicks the editable span
            this.refs.editor.getDOMNode().focus();
        }
    },

    _onEnableEdit() {
        if (!this.props.partModel.isEditable) {
            return;
        }

        this.setState({
            editValue: this.props.partModel.value,
            isEditing: true
        })
    },

    _onEditorKeyDown(evt) {
        console.log(evt.which);
        if (evt.which === 13) {
            this.props.partModel.setNewPartValue(this.state.editValue);
            this.setState({isEditing: false});
        } else if (evt.which === 27) {
            this.setState({isEditing: false});
        }
    },

    _renderEditor() {
        return (
            <input
                ref="editor"
                type="text"
                className="filterList-field-partEditor"
                valueLink={this.linkState('editValue')}
                onKeyDown={this._onEditorKeyDown}
            />
        )
    },

    _renderValue() {
        var className = React.addons.classSet({
            'filterList-field-filter-part--editable': this.props.partModel.isEditable
        });

        return (
            <span
                onClick={this._onEnableEdit}
                className={className}>
                {this.props.partModel.value}
            </span>
        );
    },

    render() {
        if (this.state.isEditing) {
            return this._renderEditor();
        }

        return this._renderValue();
    }
});

module.exports = FilterPart;
