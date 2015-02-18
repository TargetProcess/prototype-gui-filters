var React = require('react/addons');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../styles/normalize.css');
require('../styles/main.css');

// Images
require('../images/board_background.png');

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
        filters: []
        //filters: ['3.5.3', '3.6.0']
    },
    {
        fieldName: 'Effort',
        filters: []
        //filters: ['more than %3%']
    }
];

var dateSuggestions = [
    'today',
    'last %3% days',
    'last %7% days',
    'last week',
    'last month'
];

var allFields = [
    {fieldName: 'Name'},
    {fieldName: 'Iteration', suggestions: _.range(1, 10).map(i => 'Sprint #' + i).concat('current')},
    {fieldName: 'Team iteration', suggestions: _.range(1, 10).map(i => 'Team Sprint #' + i).concat('current')},
    {fieldName: 'Release', suggestions: ['3.2', '3.2.1', '3.3', '3.4', '3.4.1', '3.4.2', '3.5', '3.5.1', '3.5.2', '3.6', 'current']},
    {fieldName: 'Assigned to', suggestions: [
        "Me",
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
    {fieldName: 'Effort', suggestions: ['more than %3%', 'equal to %3%', 'less than %3%']},
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
    getInitialState() {
        return {
            isFieldListVisible: false
        };
    },

    componentDidMount() {
        store.on('filtersChanged', function() {
            this.forceUpdate();
        }.bind(this));

        document.querySelector('body').addEventListener('focus', function() {
            console.log('body focus');
            this.setState({isFieldListVisible: false});
        }.bind(this));
    },

    _onInputFocus() {
        console.log('input focus');
        this.setState({isFieldListVisible: true});
    },

    _onDismissClick() {
        this.setState({isFieldListVisible: false});
    },

    render: function() {
        var filterList = this.state.isFieldListVisible ?
            <CompositeFilter
                model={model}
                onDismiss={this._onDismissClick}/> :
            null;

        var placeholder = this.state.isFieldListVisible ? 'Choose the entity fields to filter' : 'Click to build a filter';

        return (
            <div className="main">
                <div className="main-centered">
                    <div
                        tabIndex="0"
                        className="filterControlsPrototype">
                        <input
                            className="compiledFilterText"
                            type="text"
                            placeholder={placeholder}
                            value={model.compiledFilterText}
                            onFocus={this._onInputFocus}/>
                        {filterList}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = GuiFiltersPrototypeApp;
