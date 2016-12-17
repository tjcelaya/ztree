function AppController() {
    var staq = new Staq()
    var newFrame = m.prop('');

    return {
        staq: staq,
        newFrame: newFrame,
        handlePush: function (e) {
            staq.push(newFrame())
            newFrame('')
        },
        handlePop: function (e) {
            staq.pop()
        }
    }
}