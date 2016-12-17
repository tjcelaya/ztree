
var app = {
    controller: function() {
        var staq = m.prop([]);
        window.s = staq
        var newFrame = m.prop('');

        return {
            staq: staq,
            newFrame: newFrame,
            push: function(e) {
                var f = newFrame()
                if (!f) return
                var s = staq()
                s.push(f)
                newFrame('')
                staq(s)
            },
            pop: function() {
                var s = staq()
                s.pop()
                staq(s)
            },
            clear: function() {
                staq([])
            }
        }
    },

    view: function(ctrl) {

        return m('div', [
            ctrl.staq().map(function(frame) {
                return m('li', {}, frame);
            }),
            m("input", {oninput: m.withAttr("value", ctrl.newFrame), value: ctrl.newFrame()}),
            m('button', {onclick: ctrl.push}, 'push'),
            m('button', {onclick: ctrl.pop}, 'pop'),
        ]);
    }
};


//initialize
m.mount(document.getElementById('app'), app);