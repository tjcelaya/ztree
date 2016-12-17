
var app = {
    controller: function() {
        var staq = [];
        return {
            staq: staq,
            push: function(frame) {
                staq.push()
            },
            pop: function() {
                staq.pop()
            },
            clear: function() {
                staq = []
            }
        }
    },

    view: function(ctrl) {
        return m('div', [
            ctrl.staq.map(function(frame) {
                return m('li', {}, frame);
            }),
            m('input', {type: 'text'}),
            m('button', {onclick: ctrl.push}, 'push'),
            m('button', {onclick: ctrl.push}, 'pop'),
        ]);
    }
};


//initialize
m.mount(document.getElementById('app'), app);