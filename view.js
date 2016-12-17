function AppView(ctrl) {
    return m('div', [
        m("input", {oninput: m.withAttr("value", ctrl.newFrame), value: ctrl.newFrame()}),
        m('button', {onclick: ctrl.handlePush}, 'push'),
        m('button', {onclick: ctrl.handlePop}, 'pop'),
        m('br'),
        m('pre', {}, JSON.stringify(ctrl.staq, null, 4))
    ]);
}
