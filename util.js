const Util = {}

Util.AuthHandler = function () {
    debugger
}

Util.ISONow = function () {
    return (new Date).toISOString()
}

Util.queryCurrentFrame = function (frame, depth) {
    depth = depth || 0

    if (!frame || !frame instanceof Frame) throw 'no frame given'
    let children = frame.children()
    let lastborn = children[children.length - 1]

    if (frame.isClosed()) {
        throw 'shouldn\'t arrive at a closed frame'
    }

    // frame is open and has no children OR last child is closed
    if (children.length === 0
        || lastborn.isClosed()
    ) {
        console.log('found current frame ' + frame.id)
        return {
            frame: frame,
            depth: depth
        }
    }

    return Util.queryCurrentFrame(lastborn, depth + 1)
}

Util.formatDuration = function (seconds) {
    return seconds < 60 ? (seconds + 's') : moment.duration(seconds).humanize()
}