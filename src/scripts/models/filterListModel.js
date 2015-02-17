var _ = require('underscore');

class FilterModel {
    constructor(store, fieldMetaInfo, filters) {
        this._store = store;
        this._metaInfo = fieldMetaInfo;
        this.fieldName = fieldMetaInfo.fieldName;
        this.filters = filters;
    }

    get compiledFilterText() {
        if (!this.filters.length) {
            return '';
        }

        var result = _
            .chain(this.filters)
            .map(p => this.fieldName + ' is ' + p)
            .value()
            .join(' or ');

        return '(' + result + ')';
    }

    get suggestions() {
        var baseSuggestions = this._metaInfo.suggestions || [];
        return _
            .chain(baseSuggestions)
            .filter(sugg => !_.contains(this.filters, sugg))
            .sortBy(_.identity)
            .value();
    }

    addFilter(filterText) {
        this.filters.push(filterText);
        this.filters = _.sortBy(this.filters, _.identity);
        this._store.notifyFiltersChanged();
    }

    removeFilter(filter) {
        this.filters = _.without(this.filters, filter);
        this._store.notifyFiltersChanged();
    }
}

class FilterListModel {
    constructor(store, allFields, filterGroups) {
        this._store = store;
        this._allFields = allFields;
        this.filterGroups = _.map(filterGroups, f => this._createFilterGroupModel(f.fieldName, f.filters));
    }

    get compiledFilterText() {
        var result = _
            .chain(this.filterGroups)
            .map(f => f.compiledFilterText)
            .filter(_.identity)
            .value()
            .join(' and ');

        return '?' + result;
    }

    get newFieldSuggestions() {
        return _
            .chain(this._allFields)
            .map(f => f.fieldName)
            .difference(_.map(this.filterGroups, f => f.fieldName))
            .sortBy(_.identity)
            .value();
    }

    addNewField(fieldName) {
        this.filterGroups.push(this._createFilterGroupModel(fieldName, []));
        this._store.notifyFiltersChanged();
    }

    _createFilterGroupModel(fieldName, filters) {
        var field = _.findWhere(this._allFields, {fieldName: fieldName});
        return new FilterModel(this._store, field, filters);
    }
}

module.exports = FilterListModel;
