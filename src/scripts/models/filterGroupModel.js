var _ = require('underscore');

class FilterGroupModel {
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

module.exports = FilterGroupModel;
