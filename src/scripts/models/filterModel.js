// "less than %3% days"
// doesn't work for "%3%%4% days"
var editablePartRegex = /%([^%]+)%/;

class FilterModel {
    constructor(store, filterValue) {
        var startsWithEscape = filterValue[0] === '%';
        this.filterParts = _
            .chain(filterValue.split(editablePartRegex))
            .map((part, index) => {
                return {
                    value: part,
                    isEditable: index % 2 === (startsWithEscape ? 0 : 1)
                }
            })
            .filter(_.identity)
            .value();
    }

    get compositeFilterText() {
        return _.map(this.filterParts, p => p.value).join(' ');
    }
}

module.exports = FilterModel;
