function AppView(ctrl) {
    return m('div', [
        ctrl.staq.toArray().map(function(frame) {
            return m('li', {}, frame);
        }),
        m("input", {oninput: m.withAttr("value", ctrl.newFrame), value: ctrl.newFrame()}),
        m('button', {onclick: ctrl.handlePush}, 'push'),
        m('button', {onclick: ctrl.handlePop}, 'pop'),
    ]);
}
