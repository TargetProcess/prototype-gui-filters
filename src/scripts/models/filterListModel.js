var _ = require('underscore');

class FilterModel {
    constructor(store, {fieldName, filterParts}) {
        this._store = store;
        this.fieldName = fieldName;
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
    constructor(store, filters) {
        this._store = store;
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
}

module.exports = FilterListModel;
