var _ = require('underscore');
var FilterModel = require('./filterModel');

class FilterGroupModel {
    constructor(store, fieldMetaInfo, filters) {
        this._store = store;
        this._metaInfo = fieldMetaInfo;
        this.fieldName = fieldMetaInfo.fieldName;
        this.filters = _.map(filters, this._createFilterModel, this);
    }

    get compiledFilterText() {
        if (!this.filters.length) {
            return '';
        }

        var result = _
            .chain(this.filters)
            .map(f => this.fieldName + ' is ' + f.compositeFilterText)
            .value()
            .join(' or ');

        return '(' + result + ')';
    }

    get suggestions() {
        var currentFilterValues = _.map(this.filters, f => f.compositeFilterText);
        var baseSuggestions = this._metaInfo.suggestions || [];
        return _
            .chain(baseSuggestions)
            .filter(sugg => !_.contains(currentFilterValues, sugg))
            .sortBy(_.identity)
            .value();
    }

    addFilter(filterText) {
        this.filters.push(this._createFilterModel(filterText));
        this._store.notifyFiltersChanged();
    }

    removeFilter(filter) {
        this.filters = _.without(this.filters, filter);
        this._store.notifyFiltersChanged();
    }

    _createFilterModel(filterText) {
        return new FilterModel(this._store, filterText);
    }
}

module.exports = FilterGroupModel;
