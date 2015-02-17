// "less than %3% days"
// doesn't work for "%3%%4% days"
var editablePartRegex = /%([^%]+)%/;

class FilterPartModel {
    constructor(store, partValue, isEditable) {
        this._store = store;
        this.value = partValue;
        this.isEditable = isEditable;
    }

    hasValue() {
        return Boolean(this.value && this.value.length);
    }

    setNewPartValue(newValue) {
        this.value = newValue;
        this._store.notifyFiltersChanged();
    }
}

class FilterModel {
    constructor(store, filterValue) {
        var startsWithEscape = filterValue[0] === '%';
        this.filterParts = _
            .chain(filterValue.split(editablePartRegex))
            .map((part, index) => new FilterPartModel(store, part, index % 2 === (startsWithEscape ? 0 : 1)))
            .filter(p => p.hasValue())
            .value();
    }

    get compositeFilterText() {
        return _.map(this.filterParts, p => p.value).join(' ');
    }
}

module.exports = FilterModel;
