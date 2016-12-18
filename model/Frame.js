function Frame(id, label, start) {
    this.id = id
    this.opened_at = m.prop(start),
    this.closed_at = m.prop(null),
    this.label = m.prop(label),
    this.children = m.prop([]) // array of child Frames
}

// pushing a frame into a frame is simple, we add it to it's children
Frame.prototype.push = function (f) {
    var s = this.children()
    s.push(f)
    this.children(s)
    return this
}

// popping a frame means completing the latest child or self
Frame.prototype.pop = function () {
    var cA = this.children()
    if (cA.length && !this.childrenClosed()) {

    } else {
        this.closed_at(Util.ISONow())
    }
    return this
}

Frame.prototype.childrenClosed = function () {
    return this.children().every(function (c) {
        return c.isClosed()
    })
}

Frame.prototype.pendingChild = function () {
    return this.children().find(function () {
        return this.isClosed() === false
    })
}

Frame.prototype.isClosed = function () {
    return this.closed_at() && this.childrenClosed()
}

Frame.prototype.toMithril = function (showClosed) {
    var childArray = this.children()
    var mappedchildViews = []
    var reducedchildViews = []
    var els = [m('li', {
        class: this.closed_at() ? "closed" : "open"
    }, this.label())]

    if (childArray.length) {
        console.log('showClosed',showClosed)
        if (!showClosed) {
            childArray = childArray.filter(function (cF) {
                return !cF.closed_at()
            })
        }

        var childFrames = childArray.map(function (childFrame) {
            return childFrame.toMithril(showClosed)
        })
        els.push(m('ul', childFrames))
    }

    return els
}