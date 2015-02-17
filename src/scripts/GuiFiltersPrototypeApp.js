var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../styles/normalize.css');
require('../styles/main.css');

var _ = require('underscore');

// models
var FilterStore = require('./models/filterStore');
var FilterListModel = require('./models/filterListModel');

// views
var CompositeFilter = require('./views/compositeFilterListView');

var defaultFilterGroups = [
    {
        fieldName: 'Name',
        filters: []
    },
    {
        fieldName: 'Release',
        filters: ['3.5.3', '3.6.0']
    },
    {
        fieldName: 'Effort',
        filters: ['more than 3']
    }
];

var dateSuggestions = [
    'today',
    'last 3 days',
    'last 7 days',
    'last week',
    'last month'
];

var allFields = [
    {fieldName: 'Name'},
    {fieldName: 'Iteration', suggestions: _.range(1, 10).map(i => 'Sprint #' + i)},
    {fieldName: 'Team iteration', suggestions: _.range(1, 10).map(i => 'Team Sprint #' + i)},
    {fieldName: 'Release', suggestions: ['3.2', '3.2.1', '3.3', '3.4', '3.4.1', '3.4.2', '3.5', '3.5.1', '3.5.2', '3.6']},
    {fieldName: 'Assigned to', suggestions: [
        "Margret Becker",
        "Herring Humphrey",
        "Simone Dean",
        "Cathryn Sweeney",
        "Irene Barlow",
        "Annie Reed",
        "Garner Woodward",
        "Daphne Sharpe",
        "Yang Cook",
        "Crosby Browning",
        "Guerra Rojas",
        "Robles Franks",
        "Mcpherson Crane",
        "Julie Underwood",
        "Shauna Beach"
    ]},
    {fieldName: 'States', suggestions: ['Open', 'Planned', 'In progress', 'Done']},
    {fieldName: 'Tags', suggestions: [
        "Earthwax",
        "Omatom",
        "Kraggle",
        "Nixelt",
        "Undertap",
        "Medicroix",
        "Tersanki",
        "Tsunamia",
        "Kengen",
        "Capscreen"
    ]},
    {fieldName: 'CreateDate', suggestions: dateSuggestions},
    {fieldName: 'EndDate', suggestions: dateSuggestions},
    {fieldName: 'Effort', suggestions: ['more than 3', 'equal to 3', 'less than 3']},
    {fieldName: 'Project', suggestions: [
        "Ronelon",
        "Qimonk",
        "Apextri",
        "Emtrak",
        "Mobildata",
        "Makingway",
        "Snorus",
        "Locazone",
        "Oulu",
        "Comtours"
    ]},
    {fieldName: 'Team', suggestions: [
        "Fiberox",
        "Magnina",
        "Xplor",
        "Harmoney",
        "Quizmo",
        "Zidant",
        "Proflex",
        "Avit",
        "Koogle",
        "Verton"
    ]}
];

var store = new FilterStore();
var model = new FilterListModel(store, allFields, defaultFilterGroups);

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
