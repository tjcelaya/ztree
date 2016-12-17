function Frame(label, start) {
    if (!start instanceof Date) {
        throw new 'start must be a Date'
    }

    return {
        start: m.prop(null),
        end: m.prop(null),
        label: m.prop('')
    }
}

function Staq() {
    this.store = m.prop([])
    this.goal = m.prop('')
}

Staq.prototype.push = function(f) {
    if (!f) return
    var s = this.store()
    s.push(f)
    this.store(s)
}

Staq.prototype.pop = function() {
    var s = this.store()
    s.pop()
    this.store(s)
}

Staq.prototype.clear = function() {
    this.store([])
    this.goal('')
}

Staq.prototype.toArray = function () {
    return this.store()
}