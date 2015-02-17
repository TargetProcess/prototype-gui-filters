var _ = require('underscore');

class FilterModel {
    constructor(store, {fieldName, filterParts}) {
        this._store = store;
        this.fieldName = fieldName;
        this.filterParts = filterParts;

        this._isEditing = false;
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
        this.filters = _.map(filters, f => new FilterModel(this._store, f));
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
            .value();
    }

    addNewField(fieldName) {
        this.filters.push(new FilterModel(this._store, {fieldName: fieldName, filterParts: []}));
        this._store.notifyFiltersChanged();
    }
}

module.exports = FilterListModel;
