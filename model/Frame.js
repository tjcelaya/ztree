function Frame(id, label, opened_at, closed_at, children) {
    this.id = id
    this.opened_at = m.prop(opened_at)
    this.closed_at = m.prop(closed_at || null)
    this.label = m.prop(label)
    this.children = m.prop(
        children
        && children.length
        && children.map(Frame.fromJSON)
        || []) // array of child Frames
}

Frame.fromJSON = function(primitive) {
    return new Frame(
        primitive.id,
        primitive.label,
        primitive.opened_at,
        primitive.closed_at,
        primitive.children)
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
        console.log('skipping something?')
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

Frame.prototype.isCurrent = function() {
    return !this.closed_at() && this.childrenClosed()
}

Frame.prototype.toMithril = function (showClosed) {
    var childArray = this.children()
    var mappedchildViews = []
    var reducedchildViews = []
    var pushIcon = popIcon = null
    var compareMoment = moment()

    if (this.closed_at()) {
        var compareMoment = moment(this.closed_at())
    } else if (this.isCurrent()) {
        pushIcon = m('.fa.fa-sign-in')
        popIcon = m('.fa.fa-sign-out')
    }

    var tStr = Util.formatDuration(compareMoment.diff(this.opened_at(), 'seconds'))

    var els = [
        m(
            'li',
            {
                class: this.closed_at() ? "closed" : "open"
            },
            [
                pushIcon,
                ' ',
                this.label(),
                ' ',
                m('i.rel-time', tStr),
                ' ',
                popIcon,
            ]
        )
    ]

    if (childArray.length) {
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