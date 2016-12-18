function AppView(ctrl) {
    return m('form.container', [
        m("input.u-full-width", {
            type: 'text',
            oninput: m.withAttr("value", ctrl.newFrame),
            value: ctrl.newFrame()
        }),
        m('.row', [
            m('.column.one-half', [
                m('button.u-full-width', {
                    type: 'button',
                    onclick: ctrl.handlePush
                }, 'push'),
            ]),
            m('.column.one-half', [
                m('button.button-primary.u-full-width', {
                    type: 'button',
                    onclick: ctrl.handlePop
                }, 'pop'),
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
