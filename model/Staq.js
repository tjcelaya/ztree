class Staq {
    constructor(goal, error, root) {
        this.goal = m.prop(goal || '')
        this.error = m.prop(error || '')
        this.root = m.prop(root || null)
        var id = 0
        this.nextId = function () {
            return id++
        }
    }

    static fromJSON(primitive) {
        if (!primitive && !primitive.root) throw "bad JSON for Staq"

        return new Staq(primitive.goal, primitive.error, Frame.fromJSON(primitive.root))
    }

    get opened_at() {
        return this.root().opened_at()
    }

    depth(fName) {
        var rootFrame = this.root()

        if (!rootFrame || rootFrame.isClosed())
            return 0

        return Util.queryCurrentFrame(rootFrame).depth
    }

    push(fName, fTime) {
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

    pop() {
        var rootFrame = this.root()

        if (!rootFrame) {
            throw 'nothing to pop'
        } else {
            // pop the latest frame
            Util.queryCurrentFrame(rootFrame).frame.pop()
        }

        this.root(rootFrame)
    }

    toJSON() {
        return {
            goal: this.goal(),
            error: this.error(),
            root: this.root()
        }
    }

    toMithril(showClosed) {
        var s = this.root()

        if (!s)
            return m('p', 'empty')

        return m('ul', s.toMithril(showClosed))
    }
}
