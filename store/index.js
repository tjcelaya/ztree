const Store = {
    klass: {},
    managers: {}
}

Store.ready = function() {
    return Object.keys(Store.managers).length === Object.keys(Store.klass).length
}

Store.registerManagerBuilder = function(id, newFn) {
    Store.klass[id] = newFn
}

Store.getManagerBuilder = function(id) {
    if (!id || !typeof id === 'string') throw 'need builder id'
    return Store.klass[id]
}

Store.registerManager = function(id, manager) {
    if (!id || !typeof id === 'string' || Store.managers[id]) throw 'need new builder id, got "' + id + '"'
    console.log('registering store', id)
    if (!Store.klass[id]) Store.klass[id] = 'new'
    Store.managers[id] = manager
}

Store.getManager = function(id) {
    if (!id || !typeof id === 'string' || !Store.managers[id]) throw 'dont have that builder id' + id
    return Store.managers[id]
}

