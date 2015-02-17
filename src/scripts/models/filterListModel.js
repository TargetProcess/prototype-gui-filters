var _ = require('underscore');
var FilterGroupModel = require('./filterGroupModel');

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
        return new FilterGroupModel(this._store, field, filters);
    }
}

module.exports = FilterListModel;
