var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../styles/normalize.css');
require('../styles/main.css');

// models
var FilterStore = require('./models/filterStore');
var FilterListModel = require('./models/filterListModel');

// views
var CompositeFilter = require('./views/compositeFilterList');
var AddNewField = require('./views/addNewField');

var defaultFilters = [
    {
        fieldName: 'Name',
        filterParts: []
    },
    {
        fieldName: 'Release',
        filterParts: ['3.5.3', '3.6.0']
    },
    {
        fieldName: 'Effort',
        filterParts: ['more than 3']
    }
];

var allFields = [
    {fieldName: 'Name'},
    {fieldName: 'Iteration'},
    {fieldName: 'Team iteration'},
    {fieldName: 'Release'},
    {fieldName: 'Assigned to'},
    {fieldName: 'States'},
    {fieldName: 'Tags'},
    {fieldName: 'CreateDate'},
    {fieldName: 'EndDate'},
    {fieldName: 'Project'},
    {fieldName: 'Team'}
];

var store = new FilterStore();
var model = new FilterListModel(store, allFields, defaultFilters);

var GuiFiltersPrototypeApp = React.createClass({
    componentDidMount() {
        store.on('filtersChanged', function() {
            this.forceUpdate();
        }.bind(this))
    },

    render: function() {
        return (
            <div className="main">
                <div className="main-centered">
                    <div className="compiledFilterText">{model.compiledFilterText}</div>
                    <CompositeFilter model={model}/>

                </div>
            </div>
        );
    }
});

module.exports = GuiFiltersPrototypeApp;
