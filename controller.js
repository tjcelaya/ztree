function AppController() {
    var staq = new Staq()
    var newFrame = m.prop('');
    var showClosed = m.prop(false)
    var showDebug = m.prop(false)

    return {
        staq: staq,
        newFrame: newFrame,
        showClosed: showClosed,
        showDebug: showDebug,
        handlePush: function (e) {
            try {
                staq.push(newFrame())
                newFrame('')
            } catch (e) {
                staq.error(e)
            }
        },
        handlePop: function (e) {
            try {
                staq.pop()
            } catch (e) {
                staq.error(e)
            }
        },
        handleShowClosedToggle: function (e) {
            showClosed(!showClosed())
        },
        handleShowDebugToggle: function (e) {
            showDebug(!showDebug())
        }
    }
}