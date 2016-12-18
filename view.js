function AppView(ctrl) {
    return m('form.container', [
        m('.row', [
            m('.column.one-quarter', [
                m('button.button-primary.u-full-width', {
                    type: 'button',
                    onclick: ctrl.handlePop
                }, 'pop'),
            ]),
            m('.column.one-half', [
                m("input.u-full-width", {
                    type: 'text',
                    oninput: m.withAttr("value", ctrl.newFrame),
                    value: ctrl.newFrame()
                }),
            ]),
            m('.column.one-quarter', [
                m('button.u-full-width', {
                    type: 'button',
                    onclick: ctrl.handlePush
                }, 'push'),
            ]),
        ]),
        m('.row', [
            m('.column.one-half', ctrl.staq.toMithril()),
            m('.column.one-half', [
                m('pre', JSON.stringify(ctrl.staq, null, 4))
            ]),
        ]),
    ]);
}
