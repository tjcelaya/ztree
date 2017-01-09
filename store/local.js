class LocalStore {

    constructor(prefix) {
        this.prefix = prefix
    }

    load(id) {
        var localSerialized = localStorage.getItem(this.prefix + ':' + id)
        if (!localSerialized) return null

        return JSON.parse(localSerialized)
    }

    sync(id, jsonStaq) {
        console.log('saving to local', id, jsonStaq)
        console.assert(jsonStaq instanceof Object)
        localStorage.setItem(this.prefix + ':' + id, JSON.stringify(jsonStaq))
    }
}
