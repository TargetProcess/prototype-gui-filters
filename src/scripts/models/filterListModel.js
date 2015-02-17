var _ = require('underscore');

class FilterModel {
    constructor(store, fieldMetaInfo, filterParts) {
        this._store = store;
        this._metaInfo = fieldMetaInfo;
        this.fieldName = fieldMetaInfo.fieldName;
        this.filterParts = filterParts;
    }

    get compiledFilterText() {
        if (!this.filterParts.length) {
            return '';
        }

        var result = _
            .chain(this.filterParts)
            .map(p => this.fieldName + ' is ' + p)
            .value()
            .join(' or ');

        return '(' + result + ')';
    }

    get suggestions() {
        var baseSuggestions = this._metaInfo.suggestions || [];
        return _
            .chain(baseSuggestions)
            .filter(sugg => !_.contains(this.filterParts, sugg))
            .sortBy(_.identity)
            .value();
    }

    addPart(partText) {
        this.filterParts.push(partText);
        this.filterParts = _.sortBy(this.filterParts, _.identity);
        this._store.notifyFiltersChanged();
    }

    removePart(part) {
        this.filterParts = _.without(this.filterParts, part);
        this._store.notifyFiltersChanged();
    }
}

class FilterListModel {
    constructor(store, allFields, filters) {
        this._store = store;
        this._allFields = allFields;
        this.filters = _.map(filters, f => this._createFilterModel(f.fieldName, f.filterParts));
    }

    get compiledFilterText() {
        var result = _
            .chain(this.filters)
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
            .difference(_.map(this.filters, f => f.fieldName))
            .sortBy(_.identity)
            .value();
    }

    addNewField(fieldName) {
        this.filters.push(this._createFilterModel(fieldName, []));
        this._store.notifyFiltersChanged();
    }

    _createFilterModel(fieldName, filterParts) {
        var field = _.findWhere(this._allFields, {fieldName: fieldName});
        return new FilterModel(this._store, field, filterParts);
    }
}

module.exports = FilterListModel;
