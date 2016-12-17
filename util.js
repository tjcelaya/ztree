const Util = {}

Util.ISONow = function () {
    return (new Date).toISOString()
}

Util.findCurrentFrame = function (frame) {
    if (!frame || !frame instanceof Frame) throw 'no frame given'
    let children = frame.children()
    let lastborn = children[children.length - 1]

    if (frame.isClosed()) {
        throw 'should\'nt arrive at a closed frame'
    }

    // frame is open and has no children OR last child is closed
    if (children.length === 0
        || lastborn.isClosed()
    ) {
        console.log('found current frame ' + frame.id)
        return frame
    }

    return this.findCurrentFrame(lastborn)
}