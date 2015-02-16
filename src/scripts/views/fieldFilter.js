'use strict';

var React = require('react/addons');
var _ = require('underscore');
var FilterPart = require('./fieldFilterPart');

var FieldNewPartEditor = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState() {
        return {
            text: ''
        }
    },

    _onKeyDown(evt) {
        if (evt.which === 13) {
            this.props.addPart(this.state.text);
            this.setState({text: ''});
        }
    },

    render() {
        return (
            <div className="filterList-field-newPart">
                <input
                    ref="editor"
                    type="text"
                    valueLink={this.linkState('text')}
                    onKeyDown={this._onKeyDown}/>
            </div>
        );
    }
});

var FieldFilter = React.createClass({
    render() {
        var model = this.props.filterModel;

        var parts = _.map(model.filterParts, part =>
            <FilterPart value={part} removePart={model.removePart.bind(model, part)}/>);

        parts.push(<FieldNewPartEditor addPart={model.addPart.bind(model)}/>);

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
