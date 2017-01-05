function Staq() {
    this.error = m.prop('')
    this.store = m.prop(null)
    this.goal = m.prop('')
    var id = 0
    this.nextId = function () {
         return id++
    }
}

Staq.prototype.depth = function(fName) {
    var rootFrame = this.store()

    if (!rootFrame)
        return 0

    return Util.queryCurrentFrame(rootFrame).depth
}

Staq.prototype.push = function(fName) {
    if (!fName || typeof fName !== 'string') throw "need a string to push"
    var rootFrame = this.store()
    var f = new Frame(this.nextId(), fName, Util.ISONow())

    if (!rootFrame) {
        // store the root frame
        return this.store(f)
    }

    // grab the last frame or its newest child
    var frameFound = Util.queryCurrentFrame(rootFrame)

    // the newest frame shouldn't be closed
    if (frameFound.frame.closed_at()) {
        throw this.error("cant push into a closed frame")
    }

    frameFound.frame.push(f)
    return this.store(rootFrame)
}

Staq.prototype.pop = function() {
    var rootFrame = this.store()

    if (!rootFrame) {
        throw 'nothing to pop'
    } else {
        // pop the latest frame
        Util.queryCurrentFrame(rootFrame).frame.pop()
    }

    this.store(rootFrame)
}

Staq.prototype.toJSON = function () {
    return {
        error: this.error(),
        goal: this.goal(),
        stack: this.store()
    }
}

Staq.prototype.toMithril = function(showClosed) {
    var s = this.store()

    if (!s)
        return m('p', 'empty')

    return m('ul', s.toMithril(showClosed))
}