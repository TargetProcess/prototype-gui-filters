var EventEmitter = require('events').EventEmitter;

class FilterStore extends EventEmitter {
    notifyFiltersChanged() {
        this.emit('filtersChanged');
    }
}

module.exports = FilterStore;
