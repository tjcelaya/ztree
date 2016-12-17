function AppController() {
    var staq = new Staq()
    var newFrame = m.prop('');

    return {
        staq: staq,
        newFrame: newFrame,
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
        }
    }
}