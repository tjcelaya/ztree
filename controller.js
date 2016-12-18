function AppController() {
    var staq = new Staq()
    var newFrame = m.prop('');
    var showClosed = m.prop(false)

    return {
        staq: staq,
        newFrame: newFrame,
        showClosed: showClosed,
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
        handleShowCompletedToggle: function (e) {
            showClosed(!showClosed())
        }
    }
}