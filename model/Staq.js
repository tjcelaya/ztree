function Staq(goal, error, root) {
    this.goal = m.prop(goal || '')
    this.error = m.prop(error || '')
    this.root = m.prop(root || null)
    var id = 0
    this.nextId = function () {
        return id++
    }
}

Staq.fromJSON = function(primitive) {
    return new Staq(
        primitive.goal,
        primitive.error,
        Frame.fromJSON(primitive.root)
        )
}

Staq.prototype.depth = function(fName) {
    var rootFrame = this.root()

    if (!rootFrame)
        return 0

    return Util.queryCurrentFrame(rootFrame).depth
}

Staq.prototype.push = function(fName, fTime) {
    if (!fName || typeof fName !== 'string') throw "need a string to push"
    var rootFrame = this.root()
    var f = new Frame(this.nextId(), fName, fTime || Util.ISONow())

    if (!rootFrame) {
        // store the root frame
        return this.root(f)
    }

    // grab the last frame or its newest child
    var frameFound = Util.queryCurrentFrame(rootFrame)

    // the newest frame shouldn't be closed
    if (frameFound.frame.closed_at()) {
        throw this.error("cant push into a closed frame")
    }

    frameFound.frame.push(f)
    return this.root(rootFrame)
}

Staq.prototype.pop = function() {
    var rootFrame = this.root()

    if (!rootFrame) {
        throw 'nothing to pop'
    } else {
        // pop the latest frame
        Util.queryCurrentFrame(rootFrame).frame.pop()
    }

    this.root(rootFrame)
}

Staq.prototype.toJSON = function () {
    return {
        goal: this.goal(),
        error: this.error(),
        root: this.root()
    }
}

Staq.prototype.toMithril = function(showClosed) {
    var s = this.root()

    if (!s)
        return m('p', 'empty')

    return m('ul', s.toMithril(showClosed))
}