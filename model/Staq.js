function Staq() {
    this.error = m.prop('')
    this.store = m.prop([])
    this.goal = m.prop('')
    var id = 0
    this.nextId = function () {
         return id++
    }
}

Staq.prototype.push = function(fName) {
    if (!fName || typeof fName !== 'string') throw "need a string to push"
    var s = this.store()
    var f = new Frame(this.nextId(), fName, Util.ISONow())

    if (s.length === 0) {
        s.push(f)
    } else {
        cF = Util.findCurrentFrame(s[s.length - 1])

        if (cF.closed_at()) {
            throw this.error("cant push into a closed frame")
        }

        cF.push(f)
    }

    this.store(s)
}

Staq.prototype.pop = function() {
    var s = this.store()

    if (s.length === 0) {
        return
    } else {
        Util.findCurrentFrame(s[s.length - 1]).pop()
    }

    this.store(s)
}

Staq.prototype.toJSON = function () {
    return {
        error: this.error(),
        goal: this.goal(),
        stack: this.store()
    }
}

Staq.prototype.toMithril = function() {
    var s = this.store()

    if (s.length === 0)
        return m('p', 'empty')

    return m('ul', s[s.length - 1].toMithril())
}