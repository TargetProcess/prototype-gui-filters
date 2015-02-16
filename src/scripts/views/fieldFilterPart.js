'use strict';

var React = require('react/addons');

var FieldFilterPart = React.createClass({
    render() {
        return (
            <div className="filterList-field-fieldPart">
                <div className="filterList-field-fieldPart-value">{this.props.value}</div>
                <div className="filterList-field-fieldPart-remove" onClick={this.props.removePart}/>
            </div>
        );
    }
});

module.exports = FieldFilterPart;
